"use client";

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { supabase } from '@/lib/supabase';

const featureCards = [
  {
    icon: 'upload_file',
    title: 'Upload notes, PDFs, or screenshots',
    description:
      'Bring your own study material instead of starting from generic question banks.',
  },
  {
    icon: 'quiz',
    title: 'Convert notes into exam-style MCQs',
    description:
      'ZahnPrep transforms your content into targeted questions matched to your exam pattern.',
  },
  {
    icon: 'psychology',
    title: 'Revise through active recall',
    description:
      'Practice from your own notes so revision feels sharper, faster, and more relevant.',
  },
];

const workflowSteps = [
  'Upload or paste your study notes',
  'Choose exam type and question count',
  'Get instant MCQs generated from your material',
];

export default function HomePage() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (session) {
        router.replace('/dashboard');
        return;
      }

      setCheckingSession(false);
    };

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/dashboard');
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-6 text-on-surface">
        <div className="text-center">
          <Typography variant="headline" as="h1" className="mb-3 text-2xl font-bold tracking-tight">
            Checking your session
          </Typography>
          <Typography variant="body" className="text-on-surface-variant">
            Taking you to the right place...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Typography variant="title" as="span" className="text-lg font-bold tracking-tight text-primary">
              ZahnPrep
            </Typography>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="font-semibold text-secondary">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="primary" className="px-5">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,96,103,0.14),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(131,71,24,0.12),_transparent_30%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
            <div className="max-w-3xl">
              <Typography variant="label" className="mb-4 block text-primary">
                Notes To MCQ Engine
              </Typography>
              <Typography variant="headline" as="h1" className="mb-6 text-5xl font-black tracking-tight md:text-6xl">
                Turn your notes into exam-style MCQs in minutes.
              </Typography>
              <Typography variant="body" className="mb-8 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
                ZahnPrep takes your notes, PDFs, and screenshots, then converts them into focused multiple-choice questions tailored to your target exam. Instead of passively rereading material, you practice active recall from the exact content you studied.
              </Typography>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/auth/signup">
                  <Button variant="primary" className="w-full px-8 py-4 text-base sm:w-auto">
                    Start Turning Notes Into MCQs
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="secondary" className="w-full px-8 py-4 text-base sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>

            <Surface level="lowest" className="relative overflow-hidden rounded-[2rem] p-8 shadow-sm">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-container to-tertiary" />
              <Typography variant="label" className="mb-3 block text-primary">
                Core Workflow
              </Typography>
              <Typography variant="title" as="h2" className="mb-6 text-2xl font-bold tracking-tight">
                From raw study material to instant practice.
              </Typography>

              <div className="space-y-4">
                {workflowSteps.map((step, index) => (
                  <div key={step} className="rounded-2xl bg-surface-container-low p-4">
                    <Typography variant="label" className="mb-1 block text-outline">
                      Step {index + 1}
                    </Typography>
                    <Typography variant="body" className="font-semibold text-on-surface">{step}</Typography>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-primary/5 p-4">
                <Typography variant="label" className="mb-2 block text-primary">
                  Why it matters
                </Typography>
                <Typography variant="body" className="leading-relaxed text-on-surface-variant">
                  The app&apos;s main value is not generic quizzes. It is generating high-quality MCQs directly from the learner&apos;s own notes.
                </Typography>
              </div>
            </Surface>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="mb-10 max-w-3xl">
            <Typography variant="label" className="mb-3 block text-primary">
              Why ZahnPrep Exists
            </Typography>
            <Typography variant="headline" as="h2" className="text-3xl font-black tracking-tight md:text-4xl">
              Built around one simple promise: your notes become your question bank.
            </Typography>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <Surface key={feature.title} level="lowest" className="rounded-[1.75rem] p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">{feature.icon}</span>
                </div>
                <Typography variant="title" as="h3" className="mb-3 text-xl font-bold tracking-tight">
                  {feature.title}
                </Typography>
                <Typography variant="body" className="leading-relaxed text-on-surface-variant">
                  {feature.description}
                </Typography>
              </Surface>
            ))}
          </div>
        </section>
      </main>
      {/* --- START OF FOOTER --- */}
        <footer className="w-full border-t border-gray-100 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} ZahnPrep. All rights reserved.</p>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <a href="mailto:founder@zahnprep.com" className="text-gray-500 hover:text-teal-700 transition-colors">
                founder@zahnprep.com
              </a>
              <span className="text-gray-300">|</span>
              <div className="flex items-center space-x-1">
                <span>Built by</span>
                <a href="https://www.linkedin.com/in/hafiz1991" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:text-teal-900 font-medium transition-colors">
                  Hafizullah Lone
                </a>
              </div>
            </div>
          </div>
        </footer>
        {/* --- END OF FOOTER --- */}
    </div>
  );
}
