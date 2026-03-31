"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { supabase } from '@/lib/supabase';
import { useExamStore } from '@/lib/store';

const EXAM_OPTIONS = [
  { value: 'UPSC_GS_PAPER_1', label: 'UPSC Civil Services (GS Paper 1)' },
  { value: 'SSC_CGL_TIER_2', label: 'SSC CGL (Tier 2)' },
  { value: 'JKPSC', label: 'JKPSC KAS' },
];

type LoadingStage = 'idle' | 'checking' | 'ocr' | 'generating' | 'error';

export default function DashboardPage() {
  const router = useRouter();
  const { setConfig, setQuestions } = useExamStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [examType, setExamType] = useState('UPSC_GS_PAPER_1');
  const [mcqCount, setMcqCount] = useState(10);
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [showPasteArea, setShowPasteArea] = useState(false);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('checking');
  const [errorMessage, setErrorMessage] = useState('');
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (!session) {
        router.replace('/auth/login');
        return;
      }

      setLoadingStage('idle');
    };

    void checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const selectedExamLabel = EXAM_OPTIONS.find((option) => option.value === examType)?.label || '';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setErrorMessage('');
    }
  };

  const handleLogout = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.replace('/');
    router.refresh();
  };

  const handleSubmit = async () => {
    if (!file && !pastedText.trim()) {
      setErrorMessage('Upload a file or paste your notes before generating questions.');
      return;
    }

    setErrorMessage('');
    setLoadingStage('ocr');
    const stageTimer = setTimeout(() => setLoadingStage('generating'), 7000);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error('Your session expired. Please sign in again.');
      }

      const formData = new FormData();
      formData.append('exam_paper_type', examType);
      formData.append('mcq_count', String(mcqCount));
      if (file) {
        formData.append('file', file);
      }
      if (pastedText.trim()) {
        formData.append('text_context', pastedText.trim());
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/v1/generate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      clearTimeout(stageTimer);

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        throw new Error(errorPayload?.detail || 'Question generation failed. Please try again.');
      }

      const data = await response.json();
      setConfig({ examType, examLabel: selectedExamLabel, mcqCount });
      setQuestions(data.questions || []);
      router.push('/simulator/exam');
    } catch (error: unknown) {
      clearTimeout(stageTimer);
      const message = error instanceof Error ? error.message : 'Something went wrong.';
      setErrorMessage(message);
      setLoadingStage('error');
    }
  };

  if (loadingStage === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-6 text-on-surface">
        <div className="text-center">
          <Typography variant="headline" as="h1" className="mb-3 text-2xl font-bold tracking-tight">
            Preparing your workspace
          </Typography>
          <Typography variant="body" className="text-on-surface-variant">
            Checking your account and loading the notes-to-MCQ dashboard.
          </Typography>
        </div>
      </div>
    );
  }

  if (loadingStage === 'ocr' || loadingStage === 'generating') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-6 text-on-surface">
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-primary to-primary-container text-white shadow-[0_20px_40px_rgba(0,96,103,0.15)]">
            <span className="material-symbols-outlined text-4xl">
              {loadingStage === 'ocr' ? 'document_scanner' : 'quiz'}
            </span>
          </div>
          <Typography variant="label" className="mb-3 block text-primary">
            {loadingStage === 'ocr' ? 'Stage 1 of 2' : 'Stage 2 of 2'}
          </Typography>
          <Typography variant="headline" as="h1" className="mb-4 text-4xl font-bold tracking-tight">
            {loadingStage === 'ocr' ? 'Reading your notes' : 'Generating your MCQs'}
          </Typography>
          <Typography variant="body" className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            {loadingStage === 'ocr'
              ? 'We are extracting concepts, facts, and structure from your uploaded material.'
              : `We are shaping your material into ${mcqCount} exam-style questions for ${selectedExamLabel}.`}
          </Typography>
          <div className="h-3 overflow-hidden rounded-full bg-surface-container-high">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-container transition-all duration-[7000ms] ease-linear"
              style={{ width: loadingStage === 'generating' ? '100%' : '55%' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">school</span>
            <Typography variant="title" as="h1" className="text-lg font-bold tracking-tight text-primary">
              ZahnPrep
            </Typography>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/dashboard" className="text-primary text-sm font-semibold">Generate</Link>
            <Link href="/library" className="text-on-surface-variant text-sm hover:text-primary transition-colors">Library</Link>
            <Link href="/mistakes" className="text-on-surface-variant text-sm hover:text-primary transition-colors">Mistakes</Link>
            <Link href="/simulator" className="text-on-surface-variant text-sm hover:text-primary transition-colors">Practice Modes</Link>
          </div>

          <Button variant="ghost" onClick={handleLogout} disabled={signingOut} className="font-semibold text-secondary">
            {signingOut ? 'Signing Out...' : 'Sign Out'}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-10">
        <section className="mb-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl">
            <Typography variant="label" className="mb-4 block text-primary">
              Your Main Workspace
            </Typography>
            <Typography variant="display" as="h2" className="mb-6 text-5xl lg:text-7xl">
              Turn today&apos;s notes into a fresh MCQ set.
            </Typography>
            <Typography variant="body" className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
              Upload a PDF, image, or pasted notes, choose your target exam, and generate practice questions from the exact material you studied. This is the core ZahnPrep flow.
            </Typography>
          </div>

          <Surface level="low" className="rounded-[2rem] p-8">
            <Typography variant="label" className="mb-3 block text-primary">
              Notes To MCQ Workflow
            </Typography>
            <div className="space-y-4">
              {['Add your source material', 'Choose exam pattern and volume', 'Start practicing instantly'].map((step, index) => (
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

        <section className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <Surface level="low" className="rounded-[2rem] p-6 md:p-8">
            <div className="mb-8">
              <Typography variant="headline" as="h3" className="mb-2 text-3xl font-bold tracking-tight">
                Generate from your notes
              </Typography>
              <Typography variant="body" className="text-on-surface-variant">
                Build an exam-style quiz from your own material instead of generic question banks.
              </Typography>
            </div>

            <div className="space-y-8">
              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                <div>
                  <Typography variant="label" className="mb-2 block text-outline">Target Exam</Typography>
                  <Typography variant="body" className="text-sm text-on-surface-variant">Choose the exam pattern you want the AI to follow.</Typography>
                </div>
                <select
                  value={examType}
                  onChange={(event) => setExamType(event.target.value)}
                  className="w-full rounded-2xl bg-surface-container-lowest px-4 py-4 text-on-surface outline-none ring-1 ring-outline-variant/20 transition focus:ring-2 focus:ring-primary/20"
                >
                  {EXAM_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                <div>
                  <Typography variant="label" className="mb-2 block text-outline">Question Volume</Typography>
                  <Typography variant="body" className="text-sm text-on-surface-variant">Pick how many MCQs you want in this round.</Typography>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[5, 10, 15].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setMcqCount(count)}
                      className={`rounded-2xl px-4 py-4 text-center font-bold transition ${mcqCount === count ? 'bg-gradient-to-br from-primary to-primary-container text-white shadow-sm' : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'}`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                <div>
                  <Typography variant="label" className="mb-2 block text-outline">Study Material</Typography>
                  <Typography variant="body" className="text-sm text-on-surface-variant">Upload a document or paste your notes directly.</Typography>
                </div>
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full rounded-[1.5rem] bg-surface-container-lowest p-6 text-left transition hover:bg-surface-container-high"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined">upload_file</span>
                    </div>
                    <Typography variant="title" as="div" className="mb-1 text-lg font-bold">
                      {file ? file.name : 'Upload PDF, image, or notes snapshot'}
                    </Typography>
                    <Typography variant="body" className="text-sm text-on-surface-variant">
                      {file ? 'Tap to replace your selected file.' : 'Supported formats: PDF, JPG, PNG, WEBP.'}
                    </Typography>
                  </button>

                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm text-tertiary">warning</span>
                    <Typography variant="body" className="text-xs text-on-surface-variant">
                      Max file size 30 MB.
                    </Typography>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPasteArea((value) => !value)}
                    className="text-sm font-bold text-primary hover:underline"
                  >
                    {showPasteArea ? 'Hide pasted-notes area' : 'Paste notes instead'}
                  </button>

                  {showPasteArea && (
                    <textarea
                      value={pastedText}
                      onChange={(event) => setPastedText(event.target.value)}
                      rows={7}
                      placeholder="Paste your notes here. ZahnPrep will use this content to generate MCQs."
                      className="w-full rounded-[1.5rem] bg-surface-container-lowest px-4 py-4 text-sm text-on-surface outline-none ring-1 ring-outline-variant/20 transition focus:ring-2 focus:ring-primary/20"
                    />
                  )}
                </div>
              </div>

              {errorMessage && (
                <div className="rounded-2xl bg-error-container px-4 py-4 text-sm text-error">
                  {errorMessage}
                </div>
              )}

              <div className="flex justify-end">
                <Button variant="primary" type="button" onClick={handleSubmit} className="w-full px-8 py-4 text-base md:w-auto">
                  Generate MCQs From My Notes
                </Button>
              </div>
            </div>
          </Surface>

          <div className="space-y-6">
            <Surface level="lowest" className="rounded-[2rem] p-8 shadow-sm">
              <Typography variant="label" className="mb-3 block text-primary">
                Best For
              </Typography>
              <Typography variant="title" as="h3" className="mb-3 text-2xl font-bold tracking-tight">
                Revision that starts from what you already studied.
              </Typography>
              <Typography variant="body" className="leading-relaxed text-on-surface-variant">
                Instead of switching contexts, you stay inside your own notes and let ZahnPrep produce a practice set that feels relevant to your exam.
              </Typography>
            </Surface>

            <Surface level="low" className="rounded-[2rem] p-8">
              <Typography variant="label" className="mb-3 block text-primary">
                Quick Links
              </Typography>
              <div className="space-y-4">
                <Link href="/library" className="block rounded-2xl bg-surface-container-lowest p-4 transition hover:bg-surface-container-high">
                  <Typography variant="title" as="div" className="mb-1 text-lg font-bold">Open Library</Typography>
                  <Typography variant="body" className="text-sm text-on-surface-variant">Manage the files and notes you want to turn into practice sets.</Typography>
                </Link>
                <Link href="/mistakes" className="block rounded-2xl bg-surface-container-lowest p-4 transition hover:bg-surface-container-high">
                  <Typography variant="title" as="div" className="mb-1 text-lg font-bold">Review Mistakes</Typography>
                  <Typography variant="body" className="text-sm text-on-surface-variant">Revisit weak topics and turn missed concepts into another revision loop.</Typography>
                </Link>
                <Link href="/simulator" className="block rounded-2xl bg-surface-container-lowest p-4 transition hover:bg-surface-container-high">
                  <Typography variant="title" as="div" className="mb-1 text-lg font-bold">Practice Modes</Typography>
                  <Typography variant="body" className="text-sm text-on-surface-variant">Jump into rapid-fire or exam pressure modes after generation.</Typography>
                </Link>
              </div>
            </Surface>
          </div>
        </section>
      </main>
    </div>
  );
}