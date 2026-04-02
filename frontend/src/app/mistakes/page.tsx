import React from 'react';
import Link from 'next/link';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

const reviewQueue = [
  {
    subject: 'Polity',
    topic: 'Fundamental Rights',
    source: 'Generated from Constitutional Framework notes',
    dueCount: 5,
    icon: 'balance',
  },
  {
    subject: 'History',
    topic: 'Mughal Administration',
    source: 'Generated from Medieval India PDF',
    dueCount: 8,
    icon: 'history_edu',
  },
  {
    subject: 'Economy',
    topic: 'Monetary Policy',
    source: 'Generated from Economic Survey summary',
    dueCount: 4,
    icon: 'monitoring',
  },
];

const weakZones = [
  {
    title: 'Monetary Policy',
    mastery: '43%',
    note: 'Concept traps from your note-derived economy MCQs still need reinforcement.',
    offset: '71.6',
    nextStep: 'Regenerate a 5-question drill from the same source.',
  },
  {
    title: 'Syllogism',
    mastery: '52%',
    note: 'Recent reasoning sets show repeated option-elimination mistakes under time pressure.',
    offset: '60.3',
    nextStep: 'Use rapid-fire mode after one focused review round.',
  },
  {
    title: 'Parliamentary Committees',
    mastery: '61%',
    note: 'Recall is improving, but your generated sets still expose detail-level gaps.',
    offset: '49.0',
    nextStep: 'Run one more note-based set and compare retention.',
  },
];

const loopSteps = [
  'Generate questions from your own notes',
  'Spot the concepts you keep missing',
  'Feed those weak zones into your next revision cycle',
];

export default function MistakeBookPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <Typography variant="title" as="h1" className="text-xl font-bold tracking-tight text-primary">
              ZahnPrep
            </Typography>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/dashboard" className="text-on-surface-variant text-sm transition-colors hover:text-primary">
              Generate
            </Link>
            <Link href="/library" className="text-on-surface-variant text-sm transition-colors hover:text-primary">
              Library
            </Link>
            <Link href="/mistakes" className="text-sm font-semibold text-primary">
              Mistakes
            </Link>
            <Link href="/simulator" className="text-on-surface-variant text-sm transition-colors hover:text-primary">
              Practice Modes
            </Link>
          </div>

          <Link href="/dashboard">
            <Button variant="ghost" className="font-semibold text-secondary">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-10">
        <section className="mb-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <Typography variant="label" className="mb-4 block text-primary">
              Mistake Review Loop
            </Typography>
            <Typography variant="display" as="h2" className="mb-6 text-5xl lg:text-7xl">
              Turn misses from your note-based MCQs into your smartest next study move.
            </Typography>
            <Typography variant="body" className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
              This page closes the ZahnPrep loop. After you generate practice from your own material, your weak topics surface here so revision stays tied to the exact notes that created the questions.
            </Typography>
          </div>

          <Surface level="low" className="rounded-[2rem] p-8">
            <Typography variant="label" className="mb-3 block text-primary">
              How Mistake Review Works
            </Typography>
            <div className="space-y-4">
              {loopSteps.map((step, index) => (
                <div key={step} className="rounded-2xl bg-surface-container-lowest p-4">
                  <Typography variant="label" className="mb-1 block text-outline">
                    Step {index + 1}
                  </Typography>
                  <Typography variant="body" className="font-semibold text-on-surface">
                    {step}
                  </Typography>
                </div>
              ))}
            </div>
          </Surface>
        </section>

        <section className="mb-16 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <Surface level="low" className="rounded-[2rem] p-6 md:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Typography variant="headline" as="h3" className="mb-2 text-3xl font-bold tracking-tight">
                  Review queue from recent practice
                </Typography>
                <Typography variant="body" className="text-on-surface-variant">
                  These question clusters came from your earlier note-to-MCQ sessions and are due for another pass now.
                </Typography>
              </div>
              <div className="rounded-full bg-surface-container-high px-4 py-2 text-sm font-semibold text-primary">
                17 questions due now
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {reviewQueue.map((item) => (
                <Surface key={item.topic} level="lowest" className="rounded-[1.75rem] p-6 shadow-sm">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <span className="rounded-full bg-surface-container-high px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                      {item.subject}
                    </span>
                  </div>
                  <Typography variant="title" as="h4" className="mb-2 text-xl font-bold tracking-tight">
                    {item.topic}
                  </Typography>
                  <Typography variant="body" className="mb-3 text-sm text-on-surface-variant">
                    {item.source}
                  </Typography>
                  <Typography variant="label" className="mb-6 block text-tertiary">
                    {item.dueCount} questions waiting for review
                  </Typography>
                  <Button variant="primary" className="w-full text-sm">
                    Review This Set
                  </Button>
                </Surface>
              ))}
            </div>
          </Surface>

          <div className="space-y-6">
            <Surface level="lowest" className="rounded-[2rem] p-8 shadow-sm">
              <Typography variant="label" className="mb-3 block text-primary">
                What This Improves
              </Typography>
              <Typography variant="title" as="h3" className="mb-3 text-2xl font-bold tracking-tight">
                Revision stays connected to your original source material.
              </Typography>
              <Typography variant="body" className="leading-relaxed text-on-surface-variant">
                Instead of just seeing wrong answers, you get a clearer picture of which topics from your notes still need another explanation, another MCQ round, or a timed drill.
              </Typography>
            </Surface>

            <Surface level="low" className="rounded-[2rem] p-8">
              <Typography variant="label" className="mb-3 block text-primary">
                Next Action
              </Typography>
              <Typography variant="title" as="h3" className="mb-3 text-2xl font-bold tracking-tight">
                Regenerate from the same notes after you review.
              </Typography>
              <Typography variant="body" className="mb-6 leading-relaxed text-on-surface-variant">
                Go back to the dashboard, reuse the same source material, and check whether your weak zones improve in the next practice set.
              </Typography>
              <Link href="/dashboard">
                <Button variant="primary" className="w-full">
                  Return to Generation Dashboard
                </Button>
              </Link>
            </Surface>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <Surface level="low" className="rounded-[2rem] p-8">
            <div className="mb-8 flex items-center gap-3">
              <Typography variant="headline" as="h3" className="text-3xl font-bold tracking-tight">
                Weak zones diagnosed from your generated sets
              </Typography>
              <div className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                Pattern View
              </div>
            </div>

            <div className="space-y-4">
              {weakZones.map((zone) => (
                <Surface key={zone.title} level="lowest" className="rounded-[1.5rem] p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-5">
                      <div className="relative flex h-12 w-12 items-center justify-center">
                        <svg className="h-full w-full -rotate-90 transform">
                          <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-outline-variant/30" />
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeDasharray="125.6"
                            strokeDashoffset={zone.offset}
                            className="text-tertiary"
                          />
                        </svg>
                        <span className="absolute text-[11px] font-bold text-on-surface">{zone.mastery}</span>
                      </div>
                      <div>
                        <Typography variant="title" as="h4" className="mb-1 text-lg font-bold tracking-tight">
                          {zone.title}
                        </Typography>
                        <Typography variant="body" className="mb-2 text-sm text-on-surface-variant">
                          {zone.note}
                        </Typography>
                        <Typography variant="label" className="block text-outline">
                          {zone.nextStep}
                        </Typography>
                      </div>
                    </div>
                    <Button variant="secondary" className="text-sm">
                      Rebuild Weakness
                    </Button>
                  </div>
                </Surface>
              ))}
            </div>
          </Surface>

          <Surface level="low" className="rounded-[2rem] p-8">
            <Typography variant="label" className="mb-3 block text-primary">
              Quick Links
            </Typography>
            <div className="space-y-4">
              <Link href="/library" className="block rounded-2xl bg-surface-container-lowest p-4 transition hover:bg-surface-container-high">
                <Typography variant="title" as="div" className="mb-1 text-lg font-bold">
                  Open Source Library
                </Typography>
                <Typography variant="body" className="text-sm text-on-surface-variant">
                  Return to the notes and PDFs that produced these weak zones.
                </Typography>
              </Link>
              <Link href="/simulator" className="block rounded-2xl bg-surface-container-lowest p-4 transition hover:bg-surface-container-high">
                <Typography variant="title" as="div" className="mb-1 text-lg font-bold">
                  Practice Modes
                </Typography>
                <Typography variant="body" className="text-sm text-on-surface-variant">
                  Move into rapid-fire or exam pressure mode once your weak areas are clearer.
                </Typography>
              </Link>
            </div>
          </Surface>
        </section>
      </main>
    </div>
  );
}
