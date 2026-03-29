"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useExamStore } from '@/lib/store';

export default function ResultsPage() {
  const router = useRouter();
  const { questions, userAnswers, timeTaken, config, reset } = useExamStore();

  // If no results data, redirect home
  useEffect(() => {
    if (questions.length === 0) {
      router.replace('/');
    }
  }, [questions, router]);

  if (questions.length === 0) return null;

  // ── Calculate real stats ─────────────────────────────────────────────────
  const total = questions.length;
  const correct = userAnswers.filter((ans, idx) => ans === questions[idx].correct_answer_index).length;
  const wrong = userAnswers.filter((ans, idx) => ans !== null && ans !== questions[idx].correct_answer_index && ans !== -1).length;
  const timedOut = userAnswers.filter(ans => ans === -1).length;
  const avgTime = timeTaken.length > 0
    ? Math.round(timeTaken.reduce((a, b) => a + b, 0) / timeTaken.length)
    : 0;
  const scorePercent = Math.round((correct / total) * 100);

  // Wrong questions — shown in mistake-book preview
  const wrongQuestions = questions.filter((q, idx) =>
    userAnswers[idx] !== q.correct_answer_index
  );

  const getScoreLabel = () => {
    if (scorePercent >= 80) return 'Excellent!';
    if (scorePercent >= 60) return 'Strong!';
    if (scorePercent >= 40) return 'Keep Going!';
    return 'More Practice Needed';
  };

  const handleNewSession = () => {
    reset(); // Clear store
    router.push('/');
  };

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/90 backdrop-blur-md border-b border-outline-variant/10">
        <Link href="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">menu_book</span>
          <Typography variant="title" as="h1" className="font-bold text-lg text-primary tracking-tight">ZahnPrep</Typography>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/simulator"><span className="text-secondary font-semibold text-sm hidden md:block mr-4 hover:underline">Exit to Portal</span></Link>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-4xl mx-auto pb-32">

        {/* Score Ring + Header */}
        <section className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">

          {/* Conic gradient score ring */}
          <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: `conic-gradient(from 0deg, #006067 0% ${scorePercent}%, #dfe3e3 ${scorePercent}% 100%)` }}
            />
            <div className="absolute inset-4 rounded-full bg-surface flex flex-col items-center justify-center shadow-inner">
              <span className="text-4xl font-bold text-primary leading-none">{correct}/{total}</span>
              <span className="text-[10px] font-bold tracking-widest text-outline uppercase mt-1">Score</span>
            </div>
          </div>

          {/* Performance info */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <Typography variant="label" className="text-tertiary font-bold tracking-[0.1em] uppercase block mb-1">
                {config?.examLabel} — Session Complete
              </Typography>
              <Typography variant="headline" as="h2" className="text-4xl font-extrabold tracking-tight">
                {getScoreLabel()}
              </Typography>
            </div>
            <Typography variant="body" className="text-on-surface-variant leading-relaxed max-w-md mx-auto md:mx-0">
              {scorePercent >= 60
                ? 'Solid performance. Review the questions you missed below and add them to your Mistake Book.'
                : 'Keep going — every wrong answer is a gap being identified. Review the explanations and drill again.'}
            </Typography>
            {scorePercent >= 70 && (
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="px-4 py-2 bg-primary/10 rounded-full flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  <span className="text-primary font-bold text-xs">Strong Session</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Surface level="low" className="p-6 rounded-xl hover:bg-surface-container-high transition-colors border-none">
            <span className="text-[11px] font-bold tracking-wider text-outline uppercase block mb-2">Correct</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold leading-none">{String(correct).padStart(2, '0')}</span>
              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
            </div>
          </Surface>

          <Surface level="low" className="p-6 rounded-xl hover:bg-surface-container-high transition-colors border-none">
            <span className="text-[11px] font-bold tracking-wider text-outline uppercase block mb-2">Wrong</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold leading-none">{String(wrong).padStart(2, '0')}</span>
              <span className="material-symbols-outlined text-error text-lg">cancel</span>
            </div>
          </Surface>

          <Surface level="low" className="p-6 rounded-xl hover:bg-surface-container-high transition-colors border-none">
            <span className="text-[11px] font-bold tracking-wider text-outline uppercase block mb-2">Avg Time</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold leading-none">{avgTime}s</span>
              <span className="material-symbols-outlined text-outline text-lg">timer</span>
            </div>
          </Surface>

          <Surface level="lowest" className="p-6 rounded-xl border-2 border-tertiary/20 shadow-sm bg-tertiary/5">
            <span className="text-[11px] font-bold tracking-wider text-tertiary uppercase block mb-2">Timed Out</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold leading-none text-tertiary">{timedOut}</span>
              <span className="material-symbols-outlined text-tertiary text-lg">hourglass_empty</span>
            </div>
          </Surface>
        </section>

        {/* Wrong Questions Preview — Mistake Book */}
        {wrongQuestions.length > 0 && (
          <Surface level="lowest" className="p-8 rounded-2xl border border-outline-variant/30 shadow-sm mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-tertiary/10 rounded-lg">
                <span className="material-symbols-outlined text-tertiary">psychology</span>
              </div>
              <Typography variant="title" as="h3" className="text-lg font-bold">
                Questions to Review ({wrongQuestions.length})
              </Typography>
            </div>

            <div className="space-y-3">
              {wrongQuestions.map((q, idx) => (
                <div key={idx} className="flex items-start justify-between p-4 bg-surface-container-low rounded-xl">
                  <div className="flex flex-col flex-1 mr-4">
                    <span className="font-semibold text-sm line-clamp-2">{q.question_text}</span>
                    <span className="text-xs text-on-surface-variant mt-1">
                      Correct answer: Option {String.fromCharCode(65 + q.correct_answer_index)} — {q.options[q.correct_answer_index]}
                    </span>
                  </div>
                  <span className="text-xs font-bold uppercase text-outline bg-surface-container-high px-2 py-1 rounded shrink-0">
                    {q.format_type?.replace(/_/g, ' ') || 'MCQ'}
                  </span>
                </div>
              ))}
            </div>
          </Surface>
        )}

        {/* Action Buttons */}
        <section className="flex flex-col sm:flex-row gap-4 max-w-md">
          <Button
            variant="primary"
            onClick={handleNewSession}
            className="flex-1 h-14 flex items-center justify-center gap-3 text-base shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
            New Session
          </Button>
          <Link href="/mistakes" className="flex-1">
            <Button variant="secondary" className="w-full h-14 border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5 flex items-center justify-center gap-3 text-base">
              <span className="material-symbols-outlined">menu_book</span>
              Mistake Book
            </Button>
          </Link>
        </section>
      </main>

      {/* BottomNavBar (Mobile) */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-surface/90 backdrop-blur-xl border-t border-outline-variant/20 shadow rounded-t-xl md:hidden z-50">
        <Link href="/library" className="flex flex-col items-center text-on-surface-variant hover:text-primary transition-all">
          <span className="material-symbols-outlined mb-1">auto_stories</span>
          <span className="text-[11px] font-medium uppercase tracking-wider">Library</span>
        </Link>
        <Link href="/simulator" className="flex flex-col items-center text-on-surface-variant hover:text-primary transition-all">
          <span className="material-symbols-outlined mb-1">bolt</span>
          <span className="text-[11px] font-medium uppercase tracking-wider">Drill</span>
        </Link>
        <Link href="/mistakes" className="flex flex-col items-center bg-primary text-white rounded-xl px-4 py-1.5 shadow-md">
          <span className="material-symbols-outlined mb-1">insights</span>
          <span className="text-[11px] font-medium uppercase tracking-wider">Review</span>
        </Link>
      </nav>
    </>
  );
}
