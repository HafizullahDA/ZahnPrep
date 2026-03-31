"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { supabase } from '@/lib/supabase';

// Helper component for the Eye Icon
const EyeIcon = ({ isOpen }: { isOpen: boolean }) => {
  if (isOpen) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
};

export default function SignupPage() {
  const router = useRouter();
  
  // Added new state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State for password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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

    // Added UI Validation
    if (password !== confirmPassword) {
      setMessage('Error: Passwords do not match. Please try again.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('Error: Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name, // Saves the name to Supabase
          }
        }
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
              {/* New Name Field */}
              <div className="space-y-2">
                <Typography variant="label" className="block text-on-surface-variant">Your Name</Typography>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-2xl bg-surface-container-low px-4 py-3 text-on-surface outline-none ring-1 ring-outline-variant/20 transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email Field */}
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

              {/* Password Field with Eye Toggle */}
              <div className="space-y-2">
                <Typography variant="label" className="block text-on-surface-variant">Password</Typography>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl bg-surface-container-low pl-4 pr-12 py-3 text-on-surface outline-none ring-1 ring-outline-variant/20 transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20"
                    placeholder="Choose a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <EyeIcon isOpen={showPassword} />
                  </button>
                </div>
              </div>

              {/* Confirm Password Field with Eye Toggle */}
              <div className="space-y-2">
                <Typography variant="label" className="block text-on-surface-variant">Confirm Password</Typography>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full rounded-2xl bg-surface-container-low pl-4 pr-12 py-3 text-on-surface outline-none ring-1 ring-outline-variant/20 transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20"
                    placeholder="Repeat your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    <EyeIcon isOpen={showConfirmPassword} />
                  </button>
                </div>
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