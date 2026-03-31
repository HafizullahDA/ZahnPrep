"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/auth/login` : undefined;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-[100dvh] bg-surface text-on-surface">
      <header className="px-6 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">school</span>
            <span className="text-2xl font-black tracking-tight text-primary">ZahnPrep</span>
          </Link>
          <Link href="/auth/login">
            <Button variant="ghost" className="font-semibold text-secondary">Back to Sign In</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <Typography variant="label" className="mb-4 block text-primary">Password Recovery</Typography>
          <Typography variant="display" as="h1" className="mb-6 text-5xl lg:text-6xl">
            Reset access and get back to your study flow.
          </Typography>
          <Typography variant="body" className="mb-8 max-w-xl text-lg leading-relaxed text-on-surface-variant">
            Enter the email attached to your account and we will send a reset link so you can return to your notes-to-MCQ workspace.
          </Typography>
        </div>

        <div className="w-full max-w-md justify-self-center lg:justify-self-end">
          <Surface level="lowest" className="rounded-[2rem] p-8 md:p-10 shadow-sm">
            <Typography variant="headline" as="h2" className="mb-2 text-3xl font-bold tracking-tight">
              Reset password.
            </Typography>
            <Typography variant="body" className="mb-8 leading-relaxed text-on-surface-variant">
              We will email you a secure link to recover your account.
            </Typography>

            {submitted ? (
              <div className="rounded-2xl bg-surface-container-low px-4 py-4 text-sm text-on-surface">
                Reset instructions were sent to {email}. Check your inbox and follow the secure link.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="rounded-2xl bg-error-container px-4 py-4 text-sm text-error">
                    {errorMessage}
                  </div>
                )}

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

                <Button type="submit" variant="primary" className="w-full py-4 text-base shadow-sm" disabled={loading}>
                  {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                </Button>
              </form>
            )}
          </Surface>
        </div>
      </main>
    </div>
  );
}