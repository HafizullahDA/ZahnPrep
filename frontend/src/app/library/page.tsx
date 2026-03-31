"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';

const recentMaterials = [
  {
    title: 'Constitutional Framework',
    type: 'Sheet',
    updated: 'Modified 2 hours ago',
    icon: 'description',
    note: 'Primary source for polity-focused MCQ generation.',
    exam: 'UPSC CSE',
  },
  {
    title: 'Medieval Indian History',
    type: 'PDF',
    updated: 'Modified 5 hours ago',
    icon: 'picture_as_pdf',
    note: 'Used to create history revision sets and topic-wise drills.',
    exam: 'UPSC CSE',
  },
  {
    title: 'Jammu and Kashmir Regional Affairs',
    type: 'PDF',
    updated: 'Modified yesterday',
    icon: 'folder_managed',
    note: 'Regional source notes for JKPSC practice generation.',
    exam: 'JKPSC',
  },
];

const collections = [
  {
    name: 'UPSC CSE',
    summary: 'Most-used source bank for polity, history, economy, and revision sheets.',
    items: 12,
    badge: 'Core Prep',
  },
  {
    name: 'JKPSC',
    summary: 'Regional material grouped for local affairs and state-focused revision.',
    items: 5,
    badge: 'Regional Focus',
  },
  {
    name: 'SSC CGL',
    summary: 'Reasoning, quantitative aptitude, and quick drill documents for short sessions.',
    items: 7,
    badge: 'Speed Practice',
  },
];

const workflow = [
  'Keep all notes, PDFs, and snapshots in one reusable source bank',
  'Pick any item and turn it into an MCQ set from the dashboard',
  'Come back later to regenerate drills from the same material',
];

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-primary">school</span>
            <Typography variant="title" as="h1" className="text-lg font-bold tracking-tight text-primary">
              ZahnPrep
            </Typography>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/dashboard" className="text-on-surface-variant text-sm transition-colors hover:text-primary">
              Generate
            </Link>
            <Link href="/library" className="text-sm font-semibold text-primary">
              Library
            </Link>
            <Link href="/mistakes" className="text-on-surface-variant text-sm transition-colors hover:text-primary">
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
              Source Material Hub
            </Typography>
            <Typography variant="display" as="h2" className="mb-6 text-5xl lg:text-7xl">
              Keep the notes that power every MCQ set in one calm, reusable library.
            </Typography>
            <Typography variant="body" className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
              Your library is the starting point for the whole ZahnPrep workflow. It stores the exact notes, PDFs, and snapshots that later become generated questions, revision drills, and mistake review loops.
            </Typography>
          </div>

          <Surface level="low" className="rounded-[2rem] p-8">
            <Typography variant="label" className="mb-3 block text-primary">
              Library Workflow
            </Typography>
            <div className="space-y-4">
              {workflow.map((step, index) => (
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
                  Material ready for your next generation run
                </Typography>
                <Typography variant="body" className="text-on-surface-variant">
                  These sources are already organized and ready to be used in the dashboard.
                </Typography>
              </div>
              <Link href="/dashboard">
                <Button variant="primary" className="gap-2">
                  <span className="material-symbols-outlined text-sm">upload_file</span>
                  Generate from Notes
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {recentMaterials.map((item) => (
                <Surface key={item.title} level="lowest" className="rounded-[1.75rem] p-6 shadow-sm">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <span className="rounded-full bg-surface-container-high px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                      {item.type}
                    </span>
                  </div>
                  <Typography variant="title" as="h4" className="mb-2 text-xl font-bold tracking-tight">
                    {item.title}
                  </Typography>
                  <Typography variant="body" className="mb-3 text-sm text-on-surface-variant">
                    {item.note}
                  </Typography>
                  <Typography variant="label" className="mb-2 block text-outline">
                    {item.updated}
                  </Typography>
                  <Typography variant="label" className="mb-6 block text-tertiary">
                    Best matched to {item.exam}
                  </Typography>
                  <Button variant="secondary" className="w-full gap-2 text-sm">
                    Use as Question Source
                    <span className="material-symbols-outlined text-sm">quiz</span>
                  </Button>
                </Surface>
              ))}
            </div>
          </Surface>

          <div className="space-y-6">
            <Surface level="lowest" className="rounded-[2rem] p-8 shadow-sm">
              <Typography variant="label" className="mb-3 block text-primary">
                Why This Matters
              </Typography>
              <Typography variant="title" as="h3" className="mb-3 text-2xl font-bold tracking-tight">
                Your question bank becomes personal instead of generic.
              </Typography>
              <Typography variant="body" className="leading-relaxed text-on-surface-variant">
                The more organized your source material is, the easier it becomes to regenerate focused sets, compare performance, and revisit the exact notes behind each weak area.
              </Typography>
            </Surface>

            <Surface level="low" className="rounded-[2rem] p-8">
              <Typography variant="label" className="mb-3 block text-primary">
                Quick Links
              </Typography>
              <div className="space-y-4">
                <Link href="/dashboard" className="block rounded-2xl bg-surface-container-lowest p-4 transition hover:bg-surface-container-high">
                  <Typography variant="title" as="div" className="mb-1 text-lg font-bold">
                    Open Generation Dashboard
                  </Typography>
                  <Typography variant="body" className="text-sm text-on-surface-variant">
                    Upload a fresh file or paste notes to create another MCQ set.
                  </Typography>
                </Link>
                <Link href="/mistakes" className="block rounded-2xl bg-surface-container-lowest p-4 transition hover:bg-surface-container-high">
                  <Typography variant="title" as="div" className="mb-1 text-lg font-bold">
                    Review Mistakes
                  </Typography>
                  <Typography variant="body" className="text-sm text-on-surface-variant">
                    See which topics from these sources are still causing trouble.
                  </Typography>
                </Link>
              </div>
            </Surface>
          </div>
        </section>

        <section>
          <div className="mb-6 max-w-2xl">
            <Typography variant="headline" as="h3" className="mb-2 text-3xl font-bold tracking-tight">
              Exam collections
            </Typography>
            <Typography variant="body" className="text-on-surface-variant">
              Group source material by exam so generation stays focused and your revision loops stay easy to repeat.
            </Typography>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {collections.map((collection) => (
              <Surface key={collection.name} level="low" className="rounded-[2rem] p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <Typography variant="headline" as="h4" className="mb-2 text-2xl font-bold tracking-tight">
                      {collection.name}
                    </Typography>
                    <Typography variant="body" className="text-sm leading-relaxed text-on-surface-variant">
                      {collection.summary}
                    </Typography>
                  </div>
                  <span className="rounded-full bg-surface-container-high px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                    {collection.badge}
                  </span>
                </div>
                <div className="mb-6 rounded-[1.5rem] bg-surface-container-lowest p-5">
                  <Typography variant="label" className="mb-1 block text-outline">
                    Stored Sources
                  </Typography>
                  <Typography variant="title" as="div" className="text-3xl font-bold tracking-tight text-primary">
                    {collection.items}
                  </Typography>
                </div>
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-center font-semibold text-secondary">
                    Generate from this collection
                  </Button>
                </Link>
              </Surface>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
