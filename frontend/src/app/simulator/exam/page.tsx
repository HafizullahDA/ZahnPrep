"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Typography } from '@/components/ui/Typography';
import { Surface } from '@/components/ui/Surface';
import { Simulator } from '@/components/features/Exam/Simulator';
import { useExamStore } from '@/lib/store';

export default function ExamSimulatorPage() {
  const router = useRouter();
  const { questions, config, userAnswers, recordAnswer } = useExamStore();

  const [examStarted, setExamStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [waitingForNext, setWaitingForNext] = useState(false);

  // If someone lands here without questions (e.g. typed URL directly), send them back
  useEffect(() => {
    if (questions.length === 0) {
      router.replace('/');
    }
  }, [questions, router]);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  // Called by Simulator when user picks an answer
  const handleAnswer = (selectedIdx: number, secondsTaken: number) => {
    recordAnswer(currentIndex, selectedIdx, secondsTaken);
    setWaitingForNext(true);
  };

  // Called when "Next Question" button is clicked
  const handleNext = () => {
    setWaitingForNext(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All questions answered — go to results
      router.push('/simulator/results');
    }
  };

  // Pre-exam briefing screen
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <header className="px-6 py-6 border-b border-outline-variant/10 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-bold uppercase tracking-wider">Back to Dashboard</span>
          </Link>
          <div className="bg-error-container text-error px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">warning</span>
            Strict Mode
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto w-full">
          <div className="w-20 h-20 rounded-2xl bg-primary-container text-primary flex items-center justify-center shadow-lg shadow-primary/20 mb-10">
            <span className="material-symbols-outlined text-4xl">timer</span>
          </div>

          <Typography variant="headline" className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Ready to begin?
          </Typography>

          <Typography variant="body" className="text-lg text-on-surface-variant mb-4 leading-relaxed">
            You have <strong>{questions.length} questions</strong> from your notes, formatted for{' '}
            <strong>{config?.examLabel}</strong>.
          </Typography>

          <Typography variant="body" className="text-base text-on-surface-variant mb-12 leading-relaxed">
            72 seconds per question. Pick your answer to see the explanation instantly. Navigation is disabled once started.
          </Typography>

          <Surface level="low" className="w-full p-6 rounded-2xl mb-10 border border-outline-variant/20 flex justify-between items-center text-left">
            <div>
              <Typography variant="label" className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Exam</Typography>
              <Typography variant="body" className="font-bold">{config?.examLabel}</Typography>
            </div>
            <div className="text-right">
              <Typography variant="label" className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Questions</Typography>
              <Typography variant="body" className="font-bold">{questions.length}</Typography>
            </div>
          </Surface>

          <button
            onClick={() => setExamStarted(true)}
            className="bg-primary text-white w-full py-5 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95 group flex items-center justify-center gap-3"
          >
            Begin Exam
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </main>
      </div>
    );
  }

  // Active exam — show Simulator
  return (
    <div onClick={waitingForNext ? handleNext : undefined} className={waitingForNext ? 'cursor-pointer' : ''}>
      {/* Invisible "Next" trigger — clicking anywhere after answering also advances */}
      {waitingForNext && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none">
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-base shadow-2xl shadow-primary/30 flex items-center gap-3 pointer-events-auto hover:-translate-y-0.5 transition-all"
          >
            {currentIndex + 1 < questions.length ? (
              <>Next Question <span className="material-symbols-outlined text-sm">arrow_forward</span></>
            ) : (
              <>View My Results <span className="material-symbols-outlined text-sm">insights</span></>
            )}
          </button>
        </div>
      )}

      <Simulator
        question={currentQuestion.question_text}
        options={currentQuestion.options}
        correctAnswerIndex={currentQuestion.correct_answer_index}
        explanation={currentQuestion.explanation}
        onAnswer={handleAnswer}
        currentQuestionIndex={currentIndex}
        totalQuestions={questions.length}
      />
    </div>
  );
}
