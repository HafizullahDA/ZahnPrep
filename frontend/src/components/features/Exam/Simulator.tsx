"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

interface SimulatorProps {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  onAnswer: (selectedOption: number, secondsTaken: number) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export const Simulator: React.FC<SimulatorProps> = ({
  question,
  options,
  correctAnswerIndex,
  explanation,
  onAnswer,
  currentQuestionIndex,
  totalQuestions,
}) => {
  const [timeLeft, setTimeLeft] = useState(72);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  // Reset everything when a new question loads
  useEffect(() => {
    setTimeLeft(72);
    setSelectedIndex(null);
    setAnswered(false);
    startTimeRef.current = Date.now();
  }, [currentQuestionIndex]);

  // Countdown timer — stops once answered
  useEffect(() => {
    if (answered) return;
    if (timeLeft <= 0) {
      handleAnswer(-1); // -1 = timed out
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, answered]);

  const handleAnswer = (idx: number) => {
    if (answered) return; // Prevent double-clicks
    const secondsTaken = Math.round((Date.now() - startTimeRef.current) / 1000);
    setSelectedIndex(idx);
    setAnswered(true);
    // We call onAnswer here to record the answer in the store,
    // but navigation to next question happens when user clicks "Next"
    onAnswer(idx, secondsTaken);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const isDangerZone = timeLeft <= 15;

  // Option button color logic
  const getOptionStyle = (idx: number) => {
    if (!answered) {
      return 'bg-surface-container-low hover:bg-surface-container border-transparent hover:border-outline-variant/30';
    }
    if (idx === correctAnswerIndex) {
      return 'bg-green-50 border-green-500 text-green-900';
    }
    if (idx === selectedIndex && idx !== correctAnswerIndex) {
      return 'bg-red-50 border-red-400 text-red-900';
    }
    return 'bg-surface-container-low border-transparent opacity-50';
  };

  const getOptionIcon = (idx: number) => {
    if (!answered) return null;
    if (idx === correctAnswerIndex) return <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>;
    if (idx === selectedIndex) return <span className="material-symbols-outlined text-red-500 text-xl">cancel</span>;
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col pt-safe overflow-y-auto">
      {/* Top Header */}
      <header className="flex items-center justify-between px-5 md:px-10 py-5 border-b border-outline-variant/10 shrink-0">
        <Typography variant="label" className="text-secondary tracking-[0.2em] text-xs uppercase">
          Pressure Mode
        </Typography>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${isDangerZone ? 'bg-error-container text-error' : 'bg-surface-container-high text-primary'} transition-colors`}>
          <span className="material-symbols-outlined text-sm">timer</span>
          {timeLeft}s
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-surface-container-high shrink-0">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Question + Answers */}
      <main className="flex-1 max-w-3xl mx-auto w-full flex flex-col px-5 md:px-10 py-8">
        <Surface level="lowest" className="p-6 md:p-10 rounded-[1.5rem] shadow-sm border border-outline-variant/20 mb-6">
          <Typography variant="label" className="mb-4 opacity-60 text-xs uppercase tracking-widest">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Typography>

          <Typography variant="headline" className="mb-8 leading-relaxed text-lg md:text-xl font-semibold whitespace-pre-line">
            {question}
          </Typography>

          <div className="space-y-3">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={answered}
                className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all flex items-start gap-4 ${getOptionStyle(idx)} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                  answered && idx === correctAnswerIndex ? 'bg-green-500 text-white'
                  : answered && idx === selectedIndex ? 'bg-red-400 text-white'
                  : 'bg-surface-container text-secondary'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <Typography variant="body" className="font-medium pt-1 flex-1">
                  {opt}
                </Typography>
                <div className="shrink-0 mt-0.5">
                  {getOptionIcon(idx)}
                </div>
              </button>
            ))}
          </div>
        </Surface>

        {/* Explanation — appears after answer is selected */}
        {answered && (
          <Surface level="low" className="p-6 md:p-8 rounded-[1.5rem] border border-outline-variant/20 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${selectedIndex === correctAnswerIndex ? 'bg-green-100' : 'bg-error-container'}`}>
                <span className={`material-symbols-outlined ${selectedIndex === correctAnswerIndex ? 'text-green-700' : 'text-error'}`}>
                  {selectedIndex === correctAnswerIndex ? 'verified' : 'lightbulb'}
                </span>
              </div>
              <Typography variant="label" className={`font-bold uppercase tracking-wider text-sm ${selectedIndex === correctAnswerIndex ? 'text-green-700' : 'text-error'}`}>
                {selectedIndex === -1 ? 'Time Up — Here\'s the answer' : selectedIndex === correctAnswerIndex ? 'Correct!' : 'Incorrect — Here\'s why'}
              </Typography>
            </div>
            <Typography variant="body" className="text-on-surface-variant leading-relaxed text-sm">
              {explanation}
            </Typography>
          </Surface>
        )}

        {/* Next Question Button — appears after answering */}
        {answered && (
          <div className="flex justify-end pb-8">
            <Button
              variant="primary"
              onClick={() => {
                /* Navigation is handled by the parent exam page which watches for answer */
              }}
              className="px-10 py-3 gap-3 shadow-lg shadow-primary/20"
              id="next-question-btn"
            >
              {currentQuestionIndex + 1 < totalQuestions ? (
                <>Next Question <span className="material-symbols-outlined text-sm">arrow_forward</span></>
              ) : (
                <>View Results <span className="material-symbols-outlined text-sm">insights</span></>
              )}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};
