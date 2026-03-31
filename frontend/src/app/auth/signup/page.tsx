"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
        setLoading(false);
        return;
      }

      if (data.session) {
        router.replace('/dashboard');
        router.refresh();
        return;
      }

      setMessage('Success! Check your email to confirm your account, then sign in to claim your first 30 MCQs free.');
    } catch {
      setMessage('Error: Unable to reach Supabase. Check your frontend environment variables and internet connection.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[100dvh] bg-surface text-on-surface">
      <header className="px-6 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-primary">ZahnPrep</span>
          </Link>
          <Link href="/auth/login">
            <Button variant="ghost" className="font-semibold text-secondary">Sign In</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <Typography variant="label" className="mb-4 block text-primary">Create Your Account</Typography>
          <Typography variant="display" as="h1" className="mb-6 text-5xl lg:text-6xl">
            Start with your notes. End with sharper exam recall.
          </Typography>
          <Typography variant="body" className="mb-8 max-w-xl text-lg leading-relaxed text-on-surface-variant">
            ZahnPrep is built around a simple flow: bring your study material, generate exam-style MCQs, then revise from the exact concepts you need to retain.
          </Typography>

          <div className="mb-8 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            New users get the first 30 MCQs free.
          </div>

          <Surface level="low" className="rounded-[2rem] p-8">
            <Typography variant="title" as="h2" className="mb-4 text-2xl font-bold tracking-tight">
              What you unlock
            </Typography>
            <div className="space-y-4">
              {[
                'Your first 30 MCQs free to test the workflow',
                'Upload files, screenshots, or pasted notes',
                'Generate MCQs tailored to your target exam',
                'Move straight into revision and simulator flows',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-surface-container-lowest p-4">
                  <Typography variant="body" className="font-semibold text-on-surface">{item}</Typography>
                </div>
              ))}
            </div>
          </Surface>
        </div>

        <div className="w-full max-w-md justify-self-center lg:justify-self-end">
          <Surface level="lowest" className="rounded-[2rem] p-8 md:p-10 shadow-sm">
            <Typography variant="headline" as="h2" className="mb-2 text-3xl font-bold tracking-tight">
              Create your account.
            </Typography>
            <Typography variant="body" className="mb-8 leading-relaxed text-on-surface-variant">
              Sign up to turn your notes into a reusable MCQ practice engine and try the first 30 MCQs free.
            </Typography>

            {message && (
              <div className={`mb-6 rounded-2xl px-4 py-4 text-sm ${message.startsWith('Error:') ? 'bg-error-container text-error' : 'bg-surface-container-low text-on-surface'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-6">
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
                <Typography variant="label" className="block text-on-surface-variant">Password</Typography>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl bg-surface-container-low px-4 py-3 text-on-surface outline-none ring-1 ring-outline-variant/20 transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20"
                  placeholder="Choose a strong password"
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="w-full py-4 text-base shadow-sm" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <Typography variant="body" className="mt-8 text-sm">
              Already have an account? <Link href="/auth/login" className="font-bold text-primary hover:underline">Sign in</Link>
            </Typography>
          </Surface>
        </div>
      </main>
    </div>
  );
}