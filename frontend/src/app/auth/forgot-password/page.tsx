"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            <Link href="/auth/login" className="flex items-center text-primary text-sm font-bold hover:underline mb-8">
              <span className="material-symbols-outlined text-sm mr-1">arrow_back</span>
              Back to Login
            </Link>

            <div className="mb-10 text-left">
              <Typography variant="headline" as="h1" className="text-2xl font-bold tracking-tight mb-2">Reset Password.</Typography>
              <Typography variant="body" className="font-medium leading-relaxed">Enter your academy email to receive connection instructions.</Typography>
            </div>

            {submitted ? (
              <div className="p-6 bg-secondary-container text-on-secondary-container rounded-lg text-center">
                <span className="material-symbols-outlined text-4xl mb-4 text-primary">mark_email_read</span>
                <Typography variant="title" as="h3" className="font-bold mb-2 text-primary">Instructions Sent</Typography>
                <Typography variant="body" className="text-sm">We've sent a secure reset link to {email}. Please check your inbox.</Typography>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                <Button type="submit" variant="primary" className="w-full py-4 tracking-wide shadow-md">
                  Send Reset Link
                </Button>
              </form>
            )}

          </Surface>
        </div>
      </main>
    </div>
  );
}
