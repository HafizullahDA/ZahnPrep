import React from 'react';
import Link from 'next/link';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';

export default function SimulatorHome() {
  return (
    <>
      {/* TopAppBar */}
      <header className="bg-surface/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">school</span>
            <Typography variant="title" as="h1" className="text-lg font-bold text-primary tracking-tight">ZahnPrep</Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-6 items-center mr-6">
              <Link href="/simulator"><span className="text-primary font-semibold text-sm cursor-pointer hover:bg-surface-container-low transition-all px-3 py-1 rounded-lg">Drills</span></Link>
              <Link href="/mistakes"><span className="text-secondary text-sm cursor-pointer hover:bg-surface-container-low transition-all px-3 py-1 rounded-lg">Mistakes</span></Link>
              <Link href="/library"><span className="text-secondary text-sm cursor-pointer hover:bg-surface-container-low transition-all px-3 py-1 rounded-lg">Library</span></Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32">
        {/* Hero Selection Intro */}
        <section className="mb-12">
          <Typography variant="label" className="text-[0.6875rem] font-medium uppercase tracking-widest text-tertiary mb-3 block">Simulator Portal</Typography>
          <Typography variant="headline" className="text-[3.5rem] leading-[1.1] font-bold tracking-tighter mb-6">Choose your discipline.</Typography>
          <Typography variant="body" className="text-on-surface-variant max-w-lg leading-relaxed text-lg">
            Select a training methodology to strengthen your neural pathways. Whether quick recall or sustained focus, every second counts.
          </Typography>
        </section>

        {/* Mode Selection: Asymmetric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Card 1: Rapid Fire */}
          <Link href="/simulator/rapid-fire" className="group relative flex flex-col items-start p-8 rounded-[2rem] bg-surface-container-low hover:bg-surface-container-lowest transition-all duration-300 text-left overflow-hidden ring-1 ring-outline-variant/10 hover:shadow-2xl hover:shadow-primary/5">
            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 group-hover:scale-125 transition-transform duration-500">
              <span className="material-symbols-outlined text-[120px]">bolt</span>
            </div>
            <div className="w-14 h-14 rounded-xl bg-primary-container flex items-center justify-center mb-10 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <Typography variant="title" as="h3" className="text-2xl font-bold mb-3 tracking-tight">30-Second Rapid Fire</Typography>
            <Typography variant="body" className="text-on-surface-variant leading-relaxed text-base mb-8">Quick recall drills designed to eliminate hesitation for key facts and formulas.</Typography>
            <div className="mt-auto flex items-center gap-2 text-primary font-bold text-sm">
              <span>START DRILL</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </div>
          </Link>

          {/* Card 2: Full Pressure */}
          <Link href="/simulator/exam" className="group relative flex flex-col items-start p-8 rounded-[2rem] bg-primary bg-gradient-to-br from-primary to-primary-container text-white transition-all duration-300 text-left overflow-hidden shadow-xl shadow-primary/20 hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-12 opacity-10 scale-150 group-hover:scale-125 transition-transform duration-500">
              <span className="material-symbols-outlined text-[120px]">timer</span>
            </div>
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-10">
              <span className="material-symbols-outlined text-white text-3xl">timer</span>
            </div>
            <Typography variant="title" as="h3" className="text-2xl font-bold text-white mb-3 tracking-tight">Full Exam Pressure</Typography>
            <Typography variant="body" className="text-on-primary-container leading-relaxed text-base mb-8">Simulate the strict timing and cognitive load of actual exam conditions.</Typography>
            <div className="mt-auto flex items-center gap-2 text-white font-bold text-sm">
              <span>ENTER SIMULATION</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </div>
          </Link>

        </div>

        {/* Recent Best Section */}
        <Surface level="low" className="rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <Typography variant="title" as="h4" className="text-xl font-bold tracking-tight mb-2">Recent Best</Typography>
              <Typography variant="body" className="text-on-surface-variant text-sm">Your peak performance across recent simulation cycles.</Typography>
            </div>
            <Link href="/simulator/results" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline underline-offset-4">
              VIEW ANALYTICS <span className="material-symbols-outlined text-sm">open_in_new</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stat Item 1 */}
            <Surface level="lowest" className="p-6 rounded-xl flex items-center gap-6 ring-1 ring-outline-variant/10 shadow-none">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container">bolt</span>
              </div>
              <div>
                <Typography variant="label" className="text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant mb-1">RAPID FIRE BEST</Typography>
                <div className="flex items-baseline gap-2">
                  <Typography variant="headline" className="text-2xl font-black">28</Typography>
                  <Typography variant="body" className="text-sm text-on-surface-variant">Correct / 30s</Typography>
                </div>
              </div>
            </Surface>

            {/* Stat Item 2 */}
            <Surface level="lowest" className="p-6 rounded-xl flex items-center gap-6 ring-1 ring-outline-variant/10 shadow-none">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container">timer</span>
              </div>
              <div>
                <Typography variant="label" className="text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant mb-1">EXAM PRESSURE BEST</Typography>
                <div className="flex items-baseline gap-2">
                  <Typography variant="headline" className="text-2xl font-black">94</Typography>
                  <Typography variant="body" className="text-sm text-on-surface-variant">Percentile Rank</Typography>
                </div>
              </div>
            </Surface>
          </div>
        </Surface>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/20 md:hidden">
        <Link href="/" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300">
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="text-[11px] font-medium uppercase tracking-wider font-inter">Home</span>
        </Link>
        <Link href="/simulator" className="flex flex-col items-center justify-center bg-primary text-white rounded-xl px-4 py-1.5 transition-all duration-300 shadow-md">
          <span className="material-symbols-outlined mb-1">bolt</span>
          <span className="text-[11px] font-medium uppercase tracking-wider font-inter">Drills</span>
        </Link>
        <Link href="/mistakes" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300">
          <span className="material-symbols-outlined mb-1">history</span>
          <span className="text-[11px] font-medium uppercase tracking-wider font-inter">Mistakes</span>
        </Link>
        <Link href="/library" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300">
          <span className="material-symbols-outlined mb-1">auto_stories</span>
          <span className="text-[11px] font-medium uppercase tracking-wider font-inter">Library</span>
        </Link>
      </nav>
    </>
  );
}
