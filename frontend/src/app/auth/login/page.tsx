"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate loading and fake credential rejection
    setTimeout(() => {
      setLoading(false);
      if (email === "admin@zahnprep.com" && password === "admin") {
        window.location.href = "/";
      } else {
        setError(true);
      }
    }, 1500);
  };

  return (
    <div className="bg-surface text-on-surface font-body min-h-[100dvh] flex flex-col">
      <header className="w-full flex justify-center items-center px-8 py-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-primary text-3xl">school</span>
          <span className="text-2xl font-black text-primary tracking-tighter">ZahnPrep</span>
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Surface level="lowest" className="p-8 md:p-11 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="mb-10 text-left">
              <Typography variant="headline" as="h1" className="text-2xl font-bold tracking-tight mb-2">Welcome back.</Typography>
              <Typography variant="body" className="font-medium leading-relaxed">Continue your preparation.</Typography>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-lg flex items-start space-x-3 text-sm">
                <span className="material-symbols-outlined text-lg">error</span>
                <p>The credentials you entered do not match our records. Please check and try again.</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Typography variant="label" className="block text-[0.6875rem] font-bold tracking-widest uppercase text-on-surface-variant font-inter">Email Address</Typography>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 placeholder:text-outline" 
                  placeholder="name@university.edu" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Typography variant="label" className="block text-[0.6875rem] font-bold tracking-widest uppercase text-on-surface-variant font-inter">Password</Typography>
                  <Link href="/auth/forgot-password" className="text-[0.6875rem] font-bold tracking-widest uppercase text-primary hover:underline transition-all">Forgot password?</Link>
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 placeholder:text-outline" 
                    placeholder="••••••••" 
                    required 
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full py-4 tracking-wide flex justify-center items-center shadow-md">
                {loading ? (
                  <>
                    <span>Logging in...</span>
                    <span className="material-symbols-outlined animate-spin text-sm ml-2">sync</span>
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="relative my-10 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/30"></div></div>
              <div className="relative flex justify-center text-[0.6875rem] uppercase tracking-widest font-inter">
                <span className="bg-surface-container-lowest px-4 text-outline font-bold">or</span>
              </div>
            </div>

            <div className="text-center">
              <Typography variant="body" className="text-sm">
                Don't have an account? <Link href="/auth/signup" className="text-primary font-bold hover:underline ml-1">Create Account</Link>
              </Typography>
            </div>
          </Surface>

          <div className="mt-12 text-center flex flex-col items-center">
            <div className="p-3 bg-surface-container-high rounded-full overflow-hidden mb-4 shadow-sm">
              <span className="material-symbols-outlined text-primary text-2xl">insights</span>
            </div>
            <Typography variant="label" className="text-[0.6875rem] tracking-widest uppercase text-outline font-inter">Achieve academic excellence with AI-powered insights.</Typography>
          </div>
        </div>
      </main>

      <footer className="border-t border-outline-variant/20 py-12 flex flex-col items-center justify-center space-y-4 w-full mt-auto">
        <Typography variant="label" className="text-[0.6875rem] tracking-widest uppercase text-outline font-inter">© 2026 ZahnPrep. The Digital Mentor.</Typography>
      </footer>
    </div>
  );
}
