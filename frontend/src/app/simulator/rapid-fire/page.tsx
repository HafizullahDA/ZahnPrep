"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export default function RapidFireDrill() {
  const [timeLeft, setTimeLeft] = useState(24);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-surface text-on-surface">
      <div className="pointer-events-none fixed left-0 top-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -left-[10%] -top-[20%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-tertiary/5 blur-[100px]" />
      </div>

      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between bg-surface/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <Typography variant="title" as="h1" className="text-xl font-bold tracking-tight text-primary">
              ZahnPrep
            </Typography>
          </div>
          <Link href="/simulator">
            <Button variant="ghost" className="text-sm font-semibold text-primary">
              Exit Drill
            </Button>
          </Link>
        </div>
      </header>

      <main className="z-10 mx-auto flex w-full max-w-3xl flex-grow flex-col items-center justify-center px-6 py-24 md:py-32">
        <div className="mb-12 flex w-full flex-col items-center">
          <div className="relative flex h-40 w-40 items-center justify-center md:h-56 md:w-56">
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle className="text-surface-container-high" cx="50%" cy="50%" fill="transparent" r="48%" stroke="currentColor" strokeWidth="6" />
              <circle
                className="text-primary transition-all duration-1000 ease-linear"
                cx="50%"
                cy="50%"
                fill="transparent"
                r="48%"
                stroke="currentColor"
                strokeDasharray="300"
                strokeDashoffset={300 - 300 * (timeLeft / 30)}
                strokeLinecap="round"
                strokeWidth="8"
              />
            </svg>
            <div className="text-center">
              <span className={`block text-6xl font-black leading-none tracking-tighter md:text-8xl ${timeLeft <= 5 ? 'text-error' : 'text-on-surface'}`}>
                {timeLeft}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline opacity-70">
                Seconds Left
              </span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 rounded-full border border-primary/10 bg-primary/5 px-4 py-2">
            <span className="material-symbols-outlined text-sm text-primary">bolt</span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">30-Second Rapid Fire</span>
          </div>
        </div>

        <Surface level="low" className="relative mb-10 w-full overflow-hidden rounded-[2.5rem] p-8 text-center shadow-sm md:p-12">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">
            <Typography variant="label" className="mb-4 text-[11px] font-bold uppercase tracking-widest text-outline">
              Question 5 of 20
            </Typography>
            <Typography variant="headline" as="h2" className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
              Article 32 of the Constitution guarantees which fundamental right?
            </Typography>

            <div className="mt-10 w-full max-w-md">
              <div className="group relative">
                <input
                  autoFocus
                  type="text"
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                  className="w-full rounded-xl bg-surface-container-lowest px-6 py-5 text-lg font-medium shadow-sm transition-all placeholder:text-outline/40 focus:ring-2 focus:ring-primary/20"
                  placeholder="Type your answer here..."
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <span className="material-symbols-outlined text-primary/30 transition-colors group-focus-within:text-primary">
                    keyboard_return
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs font-medium italic text-outline/60">Press Enter to submit and continue</p>
            </div>
          </div>
        </Surface>

        <div className="mb-12 w-full max-w-lg">
          <div className="mb-2 flex items-end justify-between">
            <Typography variant="label" className="text-[10px] font-bold uppercase tracking-wider text-outline">
              Progress
            </Typography>
            <Typography variant="label" className="text-[10px] font-bold text-primary">
              25% Complete
            </Typography>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div className="h-full w-1/4 rounded-full bg-primary transition-all duration-500" />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <Button variant="secondary" className="w-full border-none bg-surface-container-high px-10 md:w-auto">
            <span className="material-symbols-outlined mr-2 text-sm">pause_circle</span>
            Pause
          </Button>
          <Link href="/simulator">
            <Button variant="ghost" className="w-full px-10 text-error hover:bg-error-container/50 md:w-auto">
              <span className="material-symbols-outlined mr-2 text-sm">logout</span>
              Quit
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}