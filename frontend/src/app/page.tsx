"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useExamStore } from '@/lib/store';

const EXAM_OPTIONS = [
  { value: 'UPSC_GS_PAPER_1', label: 'UPSC Civil Services (GS Paper 1)' },
  { value: 'SSC_CGL_TIER_2', label: 'SSC CGL (Tier 2)' },
  { value: 'JKPSC', label: 'JKPSC KAS' },
];

type LoadingStage = 'idle' | 'ocr' | 'generating' | 'error';

export default function DashboardPage() {
  const router = useRouter();
  const { setConfig, setQuestions } = useExamStore();

  // Form state
  const [examType, setExamType] = useState('UPSC_GS_PAPER_1');
  const [mcqCount, setMcqCount] = useState(10);
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [showPasteArea, setShowPasteArea] = useState(false);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedExamLabel = EXAM_OPTIONS.find(e => e.value === examType)?.label || '';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleSubmit = async () => {
    if (!file && !pastedText.trim()) {
      setErrorMessage('Please upload a file or paste your notes before generating.');
      return;
    }
    setErrorMessage('');
    setLoadingStage('ocr');

    // Move to stage 2 label after 7 seconds (OCR usually takes 5-10s)
    const stageTimer = setTimeout(() => setLoadingStage('generating'), 7000);

    try {
      const formData = new FormData();
      formData.append('exam_paper_type', examType);
      formData.append('mcq_count', String(mcqCount));
      if (file) formData.append('file', file);
      if (pastedText.trim()) formData.append('text_context', pastedText);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/v1/generate`, {
        method: 'POST',
        body: formData,
      });

      clearTimeout(stageTimer);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Generation failed. Please try again.');
      }

      const data = await response.json();

      // Save everything to Zustand (shared memory)
      setConfig({ examType, examLabel: selectedExamLabel, mcqCount });
      setQuestions(data.questions);

      // Navigate into the exam
      router.push('/simulator/exam');

    } catch (err: unknown) {
      clearTimeout(stageTimer);
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setErrorMessage(message);
      setLoadingStage('error');
    }
  };

  // ─── LOADING SCREEN (replaces full page while AI works) ───────────────────
  if (loadingStage === 'ocr' || loadingStage === 'generating') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full text-center">

          {/* Animated Icon */}
          <div className="w-20 h-20 rounded-2xl bg-primary-container flex items-center justify-center mx-auto mb-10 shadow-lg shadow-primary/20 animate-pulse">
            <span className="material-symbols-outlined text-4xl text-white">
              {loadingStage === 'ocr' ? 'document_scanner' : 'psychology'}
            </span>
          </div>

          {/* Stage label */}
          <Typography variant="label" className="text-xs uppercase tracking-widest text-primary font-bold mb-3 block">
            {loadingStage === 'ocr' ? 'Stage 1 of 2' : 'Stage 2 of 2'}
          </Typography>

          <Typography variant="headline" className="text-2xl font-bold mb-4 tracking-tight">
            {loadingStage === 'ocr' ? 'Reading your notes...' : 'Crafting your questions...'}
          </Typography>

          <Typography variant="body" className="text-on-surface-variant mb-10 leading-relaxed">
            {loadingStage === 'ocr'
              ? 'Gemini Flash is extracting every fact and structure from your uploaded material.'
              : `Gemini Pro is morphing your notes into ${mcqCount} grueling ${selectedExamLabel} questions.`}
          </Typography>

          {/* 2-stage progress bar */}
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-primary rounded-full transition-all duration-[7000ms] ease-linear"
              style={{ width: loadingStage === 'generating' ? '100%' : '50%' }}
            />
          </div>
          <Typography variant="label" className="text-xs text-outline block">
            This usually takes 15–30 seconds. Please don&apos;t close this tab.
          </Typography>
        </div>
      </div>
    );
  }

  // ─── MAIN DASHBOARD ────────────────────────────────────────────────────────
  return (
    <>
      {/* TopAppBar */}
      <header className="w-full top-0 sticky bg-background z-50 border-b md:border-none border-outline-variant/10">
        <div className="flex items-center justify-between px-5 md:px-8 py-4 max-w-[1440px] mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-on-surface tracking-tight">ZahnPrep</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-primary font-semibold text-sm transition-colors duration-200">Dashboard</Link>
            <Link href="/library" className="text-on-surface-variant text-sm hover:bg-surface-container-low px-3 py-1.5 rounded transition-colors duration-200">Library</Link>
            <Link href="/mistakes" className="text-on-surface-variant text-sm hover:bg-surface-container-low px-3 py-1.5 rounded transition-colors duration-200">Mistakes</Link>
            <Link href="/simulator" className="text-on-surface-variant text-sm hover:bg-surface-container-low px-3 py-1.5 rounded transition-colors duration-200">Mock Tests</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-tertiary to-tertiary-container text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
              Upgrade to Pro
            </Link>
            <Link href="/auth/login" className="text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200 px-4 py-2 rounded-lg text-sm font-medium active:opacity-80">
              Logout
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-[1440px] mx-auto w-full px-5 md:px-8 pt-8 md:pt-12 pb-24">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 pointer-events-auto">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Typography variant="display" className="mb-6 leading-none text-4xl lg:text-7xl">
              Welcome, <span className="text-primary">Alex Scholar</span>! 👋
            </Typography>
            <Typography variant="body" className="text-lg leading-relaxed mb-8 max-w-xl">
              Upload your notes below and our AI will generate exam-quality MCQs tailored exactly to your chosen exam&apos;s pattern and difficulty.
            </Typography>
          </div>

          <div className="lg:col-span-5 relative hidden md:block">
            <Surface level="low" className="aspect-square rounded-[2rem] overflow-hidden shadow-sm relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4Vv0iIQb2y_iaEFgNr8wyXTFnRGqBjAiniej29pXDk0KwLkgehpc7RDSh3rKyObTjI-LlS2PMOTjTS8c9osrqqsVgv3ztWk936QyvhOOFLuSF4M88bpkAvG7bNFEBkCVBuozeleSND2P9CYQSPKhvV_-qDgXtWtvQ8I6dY9oA8xbYSNEuavW5LqsYBvo8u0lRQov-M12WD2QdyBM-q6mAQXC6FiqgJejc1u0weY4Qj68DrJf9VF2GrwcdHsnz6sS5sVGulUeHGgE"
                alt="Academic Focus"
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
            </Surface>
            <Surface level="lowest" className="absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-xl border border-outline-variant/10 max-w-[200px] z-10">
              <Typography variant="label" className="text-primary mb-2">Next Milestone</Typography>
              <Typography variant="body" className="font-semibold text-sm">UPSC Mock Exam 04</Typography>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-tertiary w-3/4 h-full rounded-full"></div>
              </div>
            </Surface>
          </div>
        </section>

        {/* Quick Quiz Generator */}
        <section className="max-w-4xl relative z-0">
          <div className="mb-10 mt-10 md:mt-0">
            <Typography variant="headline" className="mb-2">Quick Quiz Generator</Typography>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
          </div>

          <Surface level="low" className="rounded-[1.5rem] p-6 md:p-10 shadow-sm border border-outline-variant/10">
            <div className="space-y-10">

              {/* Row 1: Exam Type */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                <div className="md:col-span-4">
                  <Typography variant="label" className="block mb-1">Target Assessment</Typography>
                  <Typography variant="body" className="text-xs">Select your current examination focus area.</Typography>
                </div>
                <div className="md:col-span-8">
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer shadow-sm outline-none"
                  >
                    {EXAM_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: MCQ Count */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                <div className="md:col-span-4">
                  <Typography variant="label" className="block mb-1">Question Volume</Typography>
                  <Typography variant="body" className="text-xs">Choose the number of MCQs for this session.</Typography>
                </div>
                <div className="md:col-span-8 flex flex-wrap gap-4">
                  {[5, 10, 15].map(num => (
                    <label key={num} className="relative flex-1 min-w-[80px] group cursor-pointer">
                      <input
                        type="radio"
                        name="mcq_count"
                        value={num}
                        checked={mcqCount === num}
                        onChange={() => setMcqCount(num)}
                        className="peer sr-only"
                      />
                      <div className="w-full text-center py-4 rounded-xl border-2 border-transparent bg-surface-container-lowest text-on-surface shadow-sm peer-checked:border-primary peer-checked:bg-primary/5 transition-all group-hover:bg-surface-container-high">
                        <span className="text-lg font-bold">{num}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 3: Upload or Paste Notes */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                <div className="md:col-span-4">
                  <Typography variant="label" className="block mb-1">Your Study Material</Typography>
                  <Typography variant="body" className="text-xs">Upload a PDF or image, or paste your notes directly.</Typography>
                </div>
                <div className="md:col-span-8 space-y-4">

                  {/* File Upload Area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-outline-variant/40 rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <span className="material-symbols-outlined text-3xl text-outline group-hover:text-primary transition-colors mb-2">upload_file</span>
                    {file ? (
                      <div>
                        <Typography variant="body" className="font-bold text-primary">{file.name}</Typography>
                        <Typography variant="body" className="text-xs text-outline mt-1">Click to change file</Typography>
                      </div>
                    ) : (
                      <div>
                        <Typography variant="body" className="font-semibold">Click to upload PDF or image</Typography>
                        <Typography variant="body" className="text-xs text-outline mt-1">PDF, JPG, PNG, WEBP supported</Typography>
                      </div>
                    )}
                  </div>

                  {/* OR separator */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-outline-variant/30"></div>
                    <Typography variant="label" className="text-xs text-outline uppercase tracking-widest">or</Typography>
                    <div className="flex-1 h-px bg-outline-variant/30"></div>
                  </div>

                  {/* Paste Notes Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPasteArea(!showPasteArea)}
                    className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                  >
                    <span className="material-symbols-outlined text-sm">content_paste</span>
                    {showPasteArea ? 'Hide paste area' : 'Paste notes as text instead'}
                  </button>

                  {showPasteArea && (
                    <textarea
                      value={pastedText}
                      onChange={(e) => setPastedText(e.target.value)}
                      rows={6}
                      placeholder="Paste your study notes here... The AI will generate questions from this text."
                      className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all resize-none outline-none text-sm leading-relaxed placeholder:text-outline/50"
                    />
                  )}
                </div>
              </div>

              {/* Error message */}
              {loadingStage === 'error' && errorMessage && (
                <div className="p-4 bg-error-container text-on-error-container rounded-xl flex items-start gap-3">
                  <span className="material-symbols-outlined text-error">error</span>
                  <Typography variant="body" className="text-sm">{errorMessage}</Typography>
                </div>
              )}
              {errorMessage && loadingStage === 'idle' && (
                <div className="p-4 bg-error-container text-on-error-container rounded-xl flex items-start gap-3">
                  <span className="material-symbols-outlined text-error">error</span>
                  <Typography variant="body" className="text-sm">{errorMessage}</Typography>
                </div>
              )}

              {/* Submit */}
              <div className="flex justify-end pt-2">
                <Button
                  variant="primary"
                  type="button"
                  onClick={handleSubmit}
                  className="w-full md:w-auto px-12 text-base md:text-lg gap-3"
                >
                  <span className="material-symbols-outlined">auto_awesome</span>
                  Start Generating
                </Button>
              </div>

            </div>
          </Surface>
        </section>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-background/90 backdrop-blur-md border-t border-outline-variant/20 h-16 flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center justify-center text-primary font-bold">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] uppercase tracking-widest mt-0.5">Dashboard</span>
        </Link>
        <Link href="/library" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-90">
          <span className="material-symbols-outlined">menu_book</span>
          <span className="text-[10px] uppercase tracking-widest mt-0.5">Library</span>
        </Link>
        <Link href="/mistakes" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-90">
          <span className="material-symbols-outlined">history</span>
          <span className="text-[10px] uppercase tracking-widest mt-0.5">Mistakes</span>
        </Link>
        <Link href="/simulator" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-90">
          <span className="material-symbols-outlined">assignment</span>
          <span className="text-[10px] uppercase tracking-widest mt-0.5">Simulate</span>
        </Link>
      </nav>
    </>
  );
}
