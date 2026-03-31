"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (isMounted && session) {
        router.replace('/dashboard');
      }
    };

    void checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    router.replace('/dashboard');
    router.refresh();
  };

  return (
    <div className="min-h-[100dvh] bg-surface text-on-surface">
      <header className="px-6 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">school</span>
            <span className="text-2xl font-black tracking-tight text-primary">ZahnPrep</span>
          </Link>
          <Link href="/auth/signup">
            <Button variant="ghost" className="font-semibold text-secondary">Create Account</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <Typography variant="label" className="mb-4 block text-primary">Return To Your Workspace</Typography>
          <Typography variant="display" as="h1" className="mb-6 text-5xl lg:text-6xl">
            Sign in and keep building MCQs from your notes.
          </Typography>
          <Typography variant="body" className="mb-8 max-w-xl text-lg leading-relaxed text-on-surface-variant">
            Pick up exactly where you left off: upload fresh notes, generate a new question set, and continue your revision loop from your own material.
          </Typography>

          <Surface level="low" className="rounded-[2rem] p-8">
            <Typography variant="title" as="h2" className="mb-4 text-2xl font-bold tracking-tight">
              What happens after login
            </Typography>
            <div className="space-y-4">
              {['Open your generation dashboard', 'Upload notes or paste source text', 'Launch your next exam-style MCQ set'].map((item, index) => (
                <div key={item} className="rounded-2xl bg-surface-container-lowest p-4">
                  <Typography variant="label" className="mb-1 block text-outline">Step {index + 1}</Typography>
                  <Typography variant="body" className="font-semibold text-on-surface">{item}</Typography>
                </div>
              ))}
            </div>
          </Surface>
        </div>

        <div className="w-full max-w-md justify-self-center lg:justify-self-end">
          <Surface level="lowest" className="rounded-[2rem] p-8 md:p-10 shadow-sm">
            <Typography variant="headline" as="h2" className="mb-2 text-3xl font-bold tracking-tight">
              Welcome back.
            </Typography>
            <Typography variant="body" className="mb-8 leading-relaxed text-on-surface-variant">
              Sign in to continue generating questions from your notes.
            </Typography>

            {errorMessage && (
              <div className="mb-6 rounded-2xl bg-error-container px-4 py-4 text-sm text-error">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Typography variant="label" className="block text-on-surface-variant">Email Address</Typography>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl bg-surface-container-low px-4 py-3 text-on-surface outline-none ring-1 ring-outline-variant/20 transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20"
                  placeholder="name@university.edu"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Typography variant="label" className="block text-on-surface-variant">Password</Typography>
                  <Link href="/auth/forgot-password" className="text-[0.6875rem] font-bold uppercase tracking-widest text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl bg-surface-container-low px-4 py-3 text-on-surface outline-none ring-1 ring-outline-variant/20 transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="w-full py-4 text-base shadow-sm" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <Typography variant="body" className="mt-8 text-sm">
              Don&apos;t have an account? <Link href="/auth/signup" className="font-bold text-primary hover:underline">Create one now</Link>
            </Typography>
          </Surface>
        </div>
      </main>
    </div>
  );
}