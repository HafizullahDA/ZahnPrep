"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function RapidFireDrill() {
  const [timeLeft, setTimeLeft] = useState(24);
  const [inputText, setInputText] = useState("");

  // Simple demo timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const progressPercentage = ((30 - timeLeft) / 30) * 100;

  return (
    <div className="bg-surface text-on-surface min-h-[100dvh] flex flex-col relative overflow-hidden">
      {/* High-Energy Aesthetic Gradient Overlays */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-tertiary/5 rounded-full blur-[100px]"></div>
      </div>

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50">
        <div className="flex items-center justify-between px-6 h-16 w-full max-w-7xl mx-auto backdrop-blur-md bg-surface/80">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">psychology</span>
            <Typography variant="title" as="h1" className="text-lg font-bold text-on-surface tracking-tight">ZahnPrep</Typography>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/simulator">
              <Button variant="ghost" className="text-sm font-semibold text-primary">Exit Drill</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-24 md:py-32 max-w-3xl mx-auto w-full z-10">
        
        {/* Timer Section */}
        <div className="w-full flex flex-col items-center mb-12">
          <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
            {/* Outer Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle className="text-surface-container-high" cx="50%" cy="50%" fill="transparent" r="48%" stroke="currentColor" strokeWidth="6"></circle>
              <circle 
                className="text-primary transition-all duration-1000 ease-linear" 
                cx="50%" cy="50%" fill="transparent" r="48%" stroke="currentColor" 
                strokeDasharray="300" strokeDashoffset={300 - (300 * (timeLeft / 30))} strokeLinecap="round" strokeWidth="8">
              </circle>
            </svg>
            <div className="text-center">
              <span className={`block text-6xl md:text-8xl font-black ${timeLeft <= 5 ? 'text-error' : 'text-on-surface'} tracking-tighter leading-none`}>
                {timeLeft}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline opacity-70">Seconds Left</span>
            </div>
          </div>
          
          <div className="mt-8 flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <span className="material-symbols-outlined text-primary text-sm">bolt</span>
            <span className="text-xs font-bold tracking-widest uppercase text-primary">30-Second Rapid Fire</span>
          </div>
        </div>

        {/* Question Canvas */}
        <Surface level="low" className="w-full rounded-[2.5rem] p-8 md:p-12 mb-10 shadow-sm relative overflow-hidden text-center">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <Typography variant="label" className="text-[11px] font-bold uppercase tracking-widest text-outline mb-4">Question 5 of 20</Typography>
            <Typography variant="headline" as="h2" className="text-2xl md:text-4xl font-semibold leading-tight max-w-2xl tracking-tight">
              Article 32 of the Constitution guarantees which fundamental right?
            </Typography>

            <div className="mt-10 w-full max-w-md">
              <div className="relative group">
                <input 
                  autoFocus
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-surface-container-lowest border-none rounded-xl px-6 py-5 text-lg font-medium shadow-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/40"
                  placeholder="Type your answer here..."
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <span className="material-symbols-outlined text-primary/30 group-focus-within:text-primary transition-colors">keyboard_return</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-outline/60 italic font-medium">Press Enter to submit and continue</p>
            </div>
          </div>
        </Surface>

        {/* Progress Track */}
        <div className="w-full max-w-lg mb-12">
          <div className="flex justify-between items-end mb-2">
            <Typography variant="label" className="text-[10px] font-bold uppercase tracking-wider text-outline">Progress</Typography>
            <Typography variant="label" className="text-[10px] font-bold text-primary">25% Complete</Typography>
          </div>
          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <Button variant="secondary" className="w-full md:w-auto px-10 border-none bg-surface-container-high">
            <span className="material-symbols-outlined text-sm mr-2">pause_circle</span>
            Pause
          </Button>
          <Link href="/simulator">
            <Button variant="ghost" className="w-full md:w-auto px-10 text-error hover:bg-error-container/50">
              <span className="material-symbols-outlined text-sm mr-2">logout</span>
              Quit
            </Button>
          </Link>
        </div>

      </main>
    </div>
  );
}
