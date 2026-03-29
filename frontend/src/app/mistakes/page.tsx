import React from 'react';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function MistakeBookPage() {
  return (
    <>
      {/* TopAppBar */}
      <header className="flex items-center justify-between w-full px-5 py-4 sticky top-0 z-50 bg-background/90 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">menu</span>
          <Typography variant="headline" as="h1" className="text-xl">Your Mistake Book</Typography>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-full">
          <Typography variant="body" className="text-sm font-semibold text-primary">12 Day Streak 🔥</Typography>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 pt-8 pb-32">
        {/* Section 1: Urgent - Due Today */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <Typography variant="headline">Urgent - Due Today</Typography>
            <Typography variant="label" className="opacity-80">3 SESSIONS PENDING</Typography>
          </div>
          
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 snap-x hide-scrollbar">
            {/* Card 1 */}
            <Surface level="lowest" className="min-w-[280px] md:min-w-[320px] snap-start p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="material-symbols-outlined text-primary p-2 bg-primary/5 rounded-lg">balance</span>
                  <Typography variant="label" className="px-2 py-1 bg-surface-container rounded">POLITY</Typography>
                </div>
                <Typography variant="title" as="h3" className="mb-1">Fundamental Rights</Typography>
                <Typography variant="body" className="text-sm mb-6">5 Questions Due</Typography>
              </div>
              <Button variant="primary" className="w-full text-sm">Review Now</Button>
            </Surface>
            
            {/* Card 2 */}
            <Surface level="lowest" className="min-w-[280px] md:min-w-[320px] snap-start p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="material-symbols-outlined text-primary p-2 bg-primary/5 rounded-lg">history_edu</span>
                  <Typography variant="label" className="px-2 py-1 bg-surface-container rounded">HISTORY</Typography>
                </div>
                <Typography variant="title" as="h3" className="mb-1">Mughal Empire</Typography>
                <Typography variant="body" className="text-sm mb-6">8 Questions Due</Typography>
              </div>
              <Button variant="primary" className="w-full text-sm">Review Now</Button>
            </Surface>
          </div>
        </section>

        {/* Section 2: Diagnosed Weak Zones */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Typography variant="headline">Diagnosed Weak Zones</Typography>
            <div className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">AI Analysis</div>
          </div>
          
          <div className="space-y-4">
            {/* Weak Zone 1 */}
            <Surface level="low" className="flex items-center justify-between p-5 rounded-xl group hover:bg-surface-container transition-colors duration-200">
              <div className="flex items-center gap-5">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-outline-variant/30" cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    <circle className="text-tertiary" cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125.6" strokeDashoffset="71.6" />
                  </svg>
                  <span className="absolute text-[11px] font-bold text-on-surface">43%</span>
                </div>
                <div>
                  <Typography variant="title" as="h4" className="text-base">Monetary Policy</Typography>
                  <Typography variant="body" className="text-xs">Last attempted 2 days ago</Typography>
                </div>
              </div>
              <Button variant="tertiary" className="text-xs md:text-sm">Rebuild Weakness</Button>
            </Surface>

            {/* Weak Zone 2 */}
            <Surface level="low" className="flex items-center justify-between p-5 rounded-xl group hover:bg-surface-container transition-colors duration-200">
              <div className="flex items-center gap-5">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-outline-variant/30" cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    <circle className="text-tertiary" cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125.6" strokeDashoffset="60.3" />
                  </svg>
                  <span className="absolute text-[11px] font-bold text-on-surface">52%</span>
                </div>
                <div>
                  <Typography variant="title" as="h4" className="text-base">Syllogism</Typography>
                  <Typography variant="body" className="text-xs">Logic structure needs practice</Typography>
                </div>
              </div>
              <Button variant="tertiary" className="text-xs md:text-sm">Rebuild Weakness</Button>
            </Surface>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-background/80 backdrop-blur-md z-50 border-t border-outline-variant/20 shadow-none">
        <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300" href="/">
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="text-[11px] font-medium uppercase tracking-wider font-inter">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300" href="#">
          <span className="material-symbols-outlined mb-1">psychology</span>
          <span className="text-[11px] font-medium uppercase tracking-wider font-inter">AI Quiz</span>
        </a>
        <a className="flex flex-col items-center justify-center bg-primary text-white rounded-xl px-4 py-1.5 transition-all duration-300 shadow-md" href="#">
          <span className="material-symbols-outlined mb-1">menu_book</span>
          <span className="text-[11px] font-medium uppercase tracking-wider font-inter">Mistake Book</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300" href="#">
          <span className="material-symbols-outlined mb-1">person</span>
          <span className="text-[11px] font-medium uppercase tracking-wider font-inter">Profile</span>
        </a>
      </nav>
    </>
  );
}
