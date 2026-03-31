"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useExamStore } from '@/lib/store';

export default function ResultsPage() {
  const router = useRouter();
  const { questions, userAnswers, timeTaken, config, reset } = useExamStore();

  useEffect(() => {
    if (questions.length === 0) {
      router.replace('/dashboard');
    }
  }, [questions, router]);

  if (questions.length === 0) {
    return null;
  }

  const total = questions.length;
  const correct = userAnswers.filter((answer, index) => answer === questions[index].correct_answer_index).length;
  const wrong = userAnswers.filter(
    (answer, index) => answer !== null && answer !== questions[index].correct_answer_index && answer !== -1,
  ).length;
  const timedOut = userAnswers.filter((answer) => answer === -1).length;
  const avgTime = timeTaken.length > 0
    ? Math.round(timeTaken.reduce((sum, value) => sum + value, 0) / timeTaken.length)
    : 0;
  const scorePercent = Math.round((correct / total) * 100);

  const wrongQuestions = questions.filter((question, index) => userAnswers[index] !== question.correct_answer_index);

  const getScoreLabel = () => {
    if (scorePercent >= 80) {
      return 'Excellent!';
    }
    if (scorePercent >= 60) {
      return 'Strong!';
    }
    if (scorePercent >= 40) {
      return 'Keep Going!';
    }
    return 'More Practice Needed';
  };

  const handleNewSession = () => {
    reset();
    router.push('/dashboard');
  };

  return (
    <>
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-outline-variant/10 bg-surface/90 px-6 backdrop-blur-md">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">menu_book</span>
          <Typography variant="title" as="h1" className="text-lg font-bold tracking-tight text-primary">
            ZahnPrep
          </Typography>
        </Link>
        <Link href="/simulator" className="hidden text-sm font-semibold text-secondary hover:underline md:block">
          Exit to Portal
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-32 pt-24">
        <section className="mb-12 flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative flex h-48 w-48 shrink-0 items-center justify-center">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: `conic-gradient(from 0deg, #006067 0% ${scorePercent}%, #dfe3e3 ${scorePercent}% 100%)` }}
            />
            <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-surface shadow-inner">
              <span className="text-4xl font-bold leading-none text-primary">{correct}/{total}</span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-outline">Score</span>
            </div>
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <Typography variant="label" className="mb-1 block font-bold uppercase tracking-[0.1em] text-tertiary">
                {config?.examLabel} - Session Complete
              </Typography>
              <Typography variant="headline" as="h2" className="text-4xl font-extrabold tracking-tight">
                {getScoreLabel()}
              </Typography>
            </div>
            <Typography variant="body" className="mx-auto max-w-md leading-relaxed text-on-surface-variant md:mx-0">
              {scorePercent >= 60
                ? 'Solid performance. Review the questions you missed below and add them to your mistake review flow.'
                : 'Keep going. Every wrong answer reveals a gap you can now target with another focused practice round.'}
            </Typography>
            {scorePercent >= 70 && (
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                  <span className="material-symbols-outlined text-sm text-primary">verified</span>
                  <span className="text-xs font-bold text-primary">Strong Session</span>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Surface level="low" className="rounded-xl p-6 transition-colors hover:bg-surface-container-high">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-outline">Correct</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold leading-none">{String(correct).padStart(2, '0')}</span>
              <span className="material-symbols-outlined text-lg text-primary">check_circle</span>
            </div>
          </Surface>

          <Surface level="low" className="rounded-xl p-6 transition-colors hover:bg-surface-container-high">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-outline">Wrong</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold leading-none">{String(wrong).padStart(2, '0')}</span>
              <span className="material-symbols-outlined text-lg text-error">cancel</span>
            </div>
          </Surface>

          <Surface level="low" className="rounded-xl p-6 transition-colors hover:bg-surface-container-high">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-outline">Avg Time</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold leading-none">{avgTime}s</span>
              <span className="material-symbols-outlined text-lg text-outline">timer</span>
            </div>
          </Surface>

          <Surface level="lowest" className="rounded-xl border-2 border-tertiary/20 bg-tertiary/5 p-6 shadow-sm">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-tertiary">Timed Out</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold leading-none text-tertiary">{timedOut}</span>
              <span className="material-symbols-outlined text-lg text-tertiary">hourglass_empty</span>
            </div>
          </Surface>
        </section>

        {wrongQuestions.length > 0 && (
          <Surface level="lowest" className="mb-12 rounded-2xl border border-outline-variant/30 p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-tertiary/10 p-2">
                <span className="material-symbols-outlined text-tertiary">psychology</span>
              </div>
              <Typography variant="title" as="h3" className="text-lg font-bold">
                Questions to Review ({wrongQuestions.length})
              </Typography>
            </div>

            <div className="space-y-3">
              {wrongQuestions.map((question, index) => (
                <div key={index} className="flex items-start justify-between rounded-xl bg-surface-container-low p-4">
                  <div className="mr-4 flex flex-1 flex-col">
                    <span className="line-clamp-2 text-sm font-semibold">{question.question_text}</span>
                    <span className="mt-1 text-xs text-on-surface-variant">
                      Correct answer: Option {String.fromCharCode(65 + question.correct_answer_index)} - {question.options[question.correct_answer_index]}
                    </span>
                  </div>
                  <span className="shrink-0 rounded bg-surface-container-high px-2 py-1 text-xs font-bold uppercase text-outline">
                    {question.format_type?.replace(/_/g, ' ') || 'MCQ'}
                  </span>
                </div>
              ))}
            </div>
          </Surface>
        )}

        <section className="flex max-w-md flex-col gap-4 sm:flex-row">
          <Button
            variant="primary"
            onClick={handleNewSession}
            className="flex h-14 flex-1 items-center justify-center gap-3 text-base shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              add_circle
            </span>
            New Session
          </Button>
          <Link href="/mistakes" className="flex-1">
            <Button
              variant="secondary"
              className="flex h-14 w-full items-center justify-center gap-3 border-2 border-primary/20 bg-transparent text-base text-primary hover:bg-primary/5"
            >
              <span className="material-symbols-outlined">menu_book</span>
              Mistake Book
            </Button>
          </Link>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-xl border-t border-outline-variant/20 bg-surface/90 px-4 pb-6 pt-3 shadow backdrop-blur-xl md:hidden">
        <Link href="/library" className="flex flex-col items-center text-on-surface-variant transition-all hover:text-primary">
          <span className="material-symbols-outlined mb-1">auto_stories</span>
          <span className="text-[11px] font-medium uppercase tracking-wider">Library</span>
        </Link>
        <Link href="/simulator" className="flex flex-col items-center text-on-surface-variant transition-all hover:text-primary">
          <span className="material-symbols-outlined mb-1">bolt</span>
          <span className="text-[11px] font-medium uppercase tracking-wider">Drill</span>
        </Link>
        <Link href="/mistakes" className="flex flex-col items-center rounded-xl bg-primary px-4 py-1.5 text-white shadow-md">
          <span className="material-symbols-outlined mb-1">insights</span>
          <span className="text-[11px] font-medium uppercase tracking-wider">Review</span>
        </Link>
      </nav>
    </>
  );
}