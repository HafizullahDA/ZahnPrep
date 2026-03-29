"use client";

import React from 'react';
import Link from 'next/link';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';

export default function LibraryPage() {
  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary cursor-pointer hidden md:block">menu</span>
            <Typography variant="title" as="h1" className="text-xl font-bold tracking-tighter text-primary">ZahnPrep</Typography>
          </div>
          
          {/* Search Bar Integration */}
          <div className="hidden md:flex flex-1 max-w-xl mx-12">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input 
                className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm" 
                placeholder="Search your library..." 
                type="text"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8">
              <Link href="/library" className="text-primary font-semibold text-sm">Library</Link>
              <Link href="/mistakes" className="text-on-surface-variant font-medium text-sm hover:text-primary transition-colors">Mistake Book</Link>
            </nav>
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold overflow-hidden border-2 border-surface-container-highest">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-24 pb-32 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="flex items-end justify-between mb-12 flex-col md:flex-row gap-6">
            <div className="max-w-2xl">
              <span className="text-[0.6875rem] uppercase tracking-widest font-bold text-tertiary mb-2 block">Knowledge Base</span>
              <Typography variant="headline" as="h2" className="text-4xl font-bold tracking-tight">Your Academic Library</Typography>
              <Typography variant="body" className="text-on-surface-variant mt-4 text-lg leading-relaxed">
                Organize, review, and master your study materials with AI-enhanced precision.
              </Typography>
            </div>
            <button className="w-full md:w-auto bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 hover:opacity-90 transition-all">
              <span className="material-symbols-outlined text-sm">upload_file</span>
              Upload Material
            </button>
          </div>

          {/* Recent Materials Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <Typography variant="title" as="h3" className="text-xl font-bold">Recent Materials</Typography>
              <button className="text-primary text-sm font-semibold hover:underline">View History</button>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x">
              {/* Recent Card 1 */}
              <Surface level="lowest" className="flex-shrink-0 w-80 p-6 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow group snap-start">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter bg-surface-container-high px-2 py-1 rounded">Sheet</span>
                </div>
                <Typography variant="title" as="h4" className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Constitutional Framework</Typography>
                <Typography variant="body" className="text-sm text-on-surface-variant mb-6">Modified 2 hours ago</Typography>
                <button className="w-full py-2.5 bg-surface-container-low text-primary rounded-lg text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition-all">
                  Generate Custom Drill
                  <span className="material-symbols-outlined text-sm">psychology</span>
                </button>
              </Surface>

              {/* Recent Card 2 */}
              <Surface level="lowest" className="flex-shrink-0 w-80 p-6 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow group snap-start">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-lg bg-tertiary/5 flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>picture_as_pdf</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter bg-surface-container-high px-2 py-1 rounded text-tertiary">PDF</span>
                </div>
                <Typography variant="title" as="h4" className="font-bold text-lg mb-1 group-hover:text-tertiary transition-colors">Medieval Indian History</Typography>
                <Typography variant="body" className="text-sm text-on-surface-variant mb-6">Modified 5 hours ago</Typography>
                <button className="w-full py-2.5 bg-surface-container-low text-tertiary rounded-lg text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-tertiary group-hover:text-white transition-all">
                  Process with Gemini
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                </button>
              </Surface>
            </div>
          </section>

          {/* Categorized Library List */}
          <section className="mb-16">
            <div className="space-y-12">
              
              {/* Category: UPSC */}
              <Surface level="low" className="rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-2 h-8 bg-primary rounded-full"></span>
                  <Typography variant="headline" as="h3" className="text-2xl font-bold">UPSC CSE</Typography>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-surface-container-lowest rounded-xl hover:translate-x-1 transition-transform cursor-pointer border-l-4 border-transparent hover:border-primary">
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                        <span className="material-symbols-outlined">description</span>
                      </div>
                      <div>
                        <Typography variant="label" as="h5" className="font-bold text-on-surface text-base">Modern Indian History: Comprehensive Guide</Typography>
                        <div className="flex gap-4 mt-1">
                          <span className="text-[10px] uppercase font-bold text-on-surface-variant">Sheet</span>
                          <span className="text-[10px] uppercase font-bold text-outline">Oct 12, 2023</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                      <span className="px-3 py-1 bg-surface-container-high text-[10px] font-bold rounded-full">High Priority</span>
                      <span className="material-symbols-outlined text-outline hover:text-primary">more_vert</span>
                    </div>
                  </div>
                </div>
              </Surface>

              {/* Category: JKPSC (Empty State Example) */}
              <Surface level="low" className="rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-2 h-8 bg-outline rounded-full"></span>
                  <Typography variant="headline" as="h3" className="text-2xl font-bold">JKPSC</Typography>
                </div>
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-outline text-3xl">folder_off</span>
                  </div>
                  <Typography variant="title" as="h4" className="text-lg font-bold">No files here yet</Typography>
                  <Typography variant="body" className="text-sm mt-2 max-w-xs text-on-surface-variant">
                    Start building your JKPSC library by uploading previous year papers or class notes.
                  </Typography>
                  <button className="mt-6 text-primary text-sm font-bold flex items-center gap-2 hover:underline">
                    <span className="material-symbols-outlined text-sm">upload_file</span>
                    Add first document
                  </button>
                </div>
              </Surface>

            </div>
          </section>

        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface/90 backdrop-blur-xl border-t border-outline-variant/20 shadow-lg">
        <Link href="/" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300">
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="text-[11px] font-medium uppercase tracking-wider font-inter">Home</span>
        </Link>
        <Link href="/library" className="flex flex-col items-center justify-center text-primary scale-110 transition-transform duration-300">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
          <span className="text-[11px] font-bold uppercase tracking-wider font-inter">Library</span>
        </Link>
        <Link href="/simulator" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300">
          <span className="material-symbols-outlined mb-1">psychology</span>
          <span className="text-[11px] font-medium uppercase tracking-wider font-inter">Simulate</span>
        </Link>
        <Link href="/mistakes" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300">
          <span className="material-symbols-outlined mb-1">history</span>
          <span className="text-[11px] font-medium uppercase tracking-wider font-inter">Mistakes</span>
        </Link>
      </nav>

      {/* Floating Action Button (Library Specific: Search/Add) */}
      <button className="fixed bottom-24 right-6 md:right-12 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center group active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">add</span>
      </button>
    </>
  );
}
