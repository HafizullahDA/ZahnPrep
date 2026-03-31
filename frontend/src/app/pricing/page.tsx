"use client";

import React from 'react';
import Link from 'next/link';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function PricingPage() {
  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Typography variant="title" as="h1" className="font-bold text-lg text-primary tracking-tight">ZahnPrep</Typography>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login"><Button variant="ghost" className="text-secondary font-semibold">Sign In</Button></Link>
        </div>
      </header>

      <main className="pt-32 px-6 max-w-6xl mx-auto pb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Typography variant="label" className="text-primary font-bold tracking-widest uppercase mb-4 block">Membership Tiers</Typography>
          <Typography variant="headline" as="h2" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Invest in your exam memory.</Typography>
          <Typography variant="body" className="text-xl text-on-surface-variant leading-relaxed">
            Stop passively reading. Start actively recalling. Choose a credit plan below and instantly access the dual-engine AI pipeline tailored exactly to the UPSC, JKPSC, and SSC CGL standards.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
          
          {/* Welcome Gift (Free Tier) */}
          <Surface level="lowest" className="p-8 rounded-3xl border border-outline-variant/30 flex flex-col h-full bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <Typography variant="title" as="h3" className="text-2xl font-bold mb-2">Welcome Gift</Typography>
              <Typography variant="body" className="text-on-surface-variant text-sm">Perfect for testing the platform.</Typography>
            </div>
            <div className="mb-8">
              <Typography variant="headline" as="div" className="text-4xl font-extrabold text-on-surface mb-2">Rs 0</Typography>
              <Typography variant="label" className="text-xs uppercase tracking-widest text-outline">One-Time</Typography>
            </div>
            <ul className="space-y-4 mb-10 flex-1 text-sm font-medium">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> 200 Free Credits</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> No credit card required</li>
              <li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-outline text-sm">cancel</span> Spaced Repetition restricted</li>
            </ul>
            <Link href="/auth/login">
              <Button variant="secondary" className="w-full py-4 border-2 border-primary/20 bg-surface hover:bg-primary/5 text-primary">Start for Free</Button>
            </Link>
          </Surface>

          {/* Annual Pro Plan (Highlight) */}
          <div className="p-8 md:p-10 rounded-[2.5rem] border-2 border-primary bg-primary text-white flex flex-col relative shadow-2xl shadow-primary/20 md:scale-105 z-10 box-border">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-tertiary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Save 26%</div>
            <div className="mb-6">
              <Typography variant="title" as="h3" className="text-3xl font-bold mb-2 text-white">Annual Pro</Typography>
              <Typography variant="body" className="text-on-primary-container text-sm">For serious aspirants.</Typography>
            </div>
            <div className="mb-8">
              <Typography variant="headline" as="div" className="text-5xl font-extrabold text-white mb-2">Rs 2,499<span className="text-xl text-primary-fixed/60 font-medium">/yr</span></Typography>
              <Typography variant="label" className="text-xs uppercase tracking-widest text-primary-fixed/60 text-[10px]">Just Rs 208/month</Typography>
            </div>
            <ul className="space-y-4 mb-10 flex-1 text-sm font-medium text-white/90">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-inverse-primary text-sm">check_circle</span> <strong className="text-white">2,000 Credits</strong> / month</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-inverse-primary text-sm">check_circle</span> Full Spaced Repetition Access</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-inverse-primary text-sm">check_circle</span> Priority OCR Processing</li>
            </ul>
            <Button variant="secondary" className="w-full py-4 bg-white text-primary border-none hover:bg-surface-container-low hover:text-primary">Unlock Annual Pro</Button>
          </div>

          {/* Monthly Base Plan */}
          <Surface level="lowest" className="p-8 rounded-3xl border border-outline-variant/30 flex flex-col h-full bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <Typography variant="title" as="h3" className="text-2xl font-bold mb-2">Monthly Base</Typography>
              <Typography variant="body" className="text-on-surface-variant text-sm">Consistent month-to-month prep.</Typography>
            </div>
            <div className="mb-8">
              <Typography variant="headline" as="div" className="text-4xl font-extrabold text-on-surface mb-2">Rs 149<span className="text-lg text-outline font-medium">/mo</span></Typography>
              <Typography variant="label" className="text-xs uppercase tracking-widest text-outline text-[10px]">Billed Monthly</Typography>
            </div>
            <ul className="space-y-4 mb-10 flex-1 text-sm font-medium">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> <strong className="text-on-surface">1,000 Credits</strong> / month</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Full Spaced Repetition Access</li>
              <li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Standard OCR Processing</li>
            </ul>
            <Button variant="primary" className="w-full py-4">Subscribe Monthly</Button>
          </Surface>

        </div>

        {/* The Panic Button Booster */}
        <Surface level="low" className="max-w-3xl mx-auto rounded-[2rem] p-8 md:p-10 border border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-surface-container-low to-surface-container">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-secondary-container text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>battery_charging_full</span>
            </div>
            <div>
              <Typography variant="title" as="h4" className="text-xl font-bold mb-1">Running low on credits?</Typography>
              <Typography variant="body" className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
                Grab the <strong>Rs 79 Booster Pack</strong> for an instant injection of 300 Credits. Unlike subscription tokens, these credits <strong>persist until consumed.</strong>
              </Typography>
            </div>
          </div>
          <Button variant="primary" className="shrink-0 whitespace-nowrap px-8 py-4 bg-secondary text-white hover:bg-secondary/90 shadow-md">Buy 300 Credits</Button>
        </Surface>

      </main>
    </>
  );
}
