"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Surface } from '@/components/ui/Surface';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

interface SimulatorProps {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  onAnswer: (selectedOption: number, secondsTaken: number) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export const Simulator: React.FC<SimulatorProps> = ({
  question,
  options,
  correctAnswerIndex,
  explanation,
  onAnswer,
  currentQuestionIndex,
  totalQuestions,
}) => {
  const [timeLeft, setTimeLeft] = useState(72);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const startTimeRef = useRef(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const handleAnswer = useCallback((idx: number) => {
    setAnswered((alreadyAnswered) => {
      if (alreadyAnswered) {
        return alreadyAnswered;
      }

      const secondsTaken = Math.round((Date.now() - startTimeRef.current) / 1000);
      setSelectedIndex(idx);
      onAnswer(idx, secondsTaken);
      return true;
    });
  }, [onAnswer]);

  useEffect(() => {
    if (answered) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          handleAnswer(-1);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answered, handleAnswer]);

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const isDangerZone = timeLeft <= 15;

  const getOptionStyle = (idx: number) => {
    if (!answered) {
      return 'bg-surface-container-low hover:bg-surface-container border-transparent hover:border-outline-variant/30';
    }
    if (idx === correctAnswerIndex) {
      return 'bg-green-50 border-green-500 text-green-900';
    }
    if (idx === selectedIndex && idx !== correctAnswerIndex) {
      return 'bg-red-50 border-red-400 text-red-900';
    }
    return 'bg-surface-container-low border-transparent opacity-50';
  };

  const getOptionIcon = (idx: number) => {
    if (!answered) {
      return null;
    }
    if (idx === correctAnswerIndex) {
      return <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>;
    }
    if (idx === selectedIndex) {
      return <span className="material-symbols-outlined text-red-500 text-xl">cancel</span>;
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background pt-safe">
      <header className="flex shrink-0 items-center justify-between border-b border-outline-variant/10 px-5 py-5 md:px-10">
        <Typography variant="label" className="text-xs uppercase tracking-[0.2em] text-secondary">
          Pressure Mode
        </Typography>
        <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${isDangerZone ? 'bg-error-container text-error' : 'bg-surface-container-high text-primary'}`}>
          <span className="material-symbols-outlined text-sm">timer</span>
          {timeLeft}s
        </div>
      </header>

      <div className="h-2 w-full shrink-0 bg-surface-container-high">
        <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }} />
      </div>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8 md:px-10">
        <Surface level="lowest" className="mb-6 rounded-[1.5rem] p-6 shadow-sm md:p-10">
          <Typography variant="label" className="mb-4 text-xs uppercase tracking-widest opacity-60">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Typography>

          <Typography variant="headline" className="mb-8 whitespace-pre-line text-lg font-semibold leading-relaxed md:text-xl">
            {question}
          </Typography>

          <div className="space-y-3">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={answered}
                className={`flex w-full items-start gap-4 rounded-xl border-2 p-4 text-left transition-all md:p-5 ${getOptionStyle(idx)} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    answered && idx === correctAnswerIndex
                      ? 'bg-green-500 text-white'
                      : answered && idx === selectedIndex
                        ? 'bg-red-400 text-white'
                        : 'bg-surface-container text-secondary'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <Typography variant="body" className="flex-1 pt-1 font-medium">
                  {option}
                </Typography>
                <div className="mt-0.5 shrink-0">{getOptionIcon(idx)}</div>
              </button>
            ))}
          </div>
        </Surface>

        {answered && (
          <Surface level="low" className="mb-6 rounded-[1.5rem] p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className={`rounded-lg p-2 ${selectedIndex === correctAnswerIndex ? 'bg-green-100' : 'bg-error-container'}`}>
                <span className={`material-symbols-outlined ${selectedIndex === correctAnswerIndex ? 'text-green-700' : 'text-error'}`}>
                  {selectedIndex === correctAnswerIndex ? 'verified' : 'lightbulb'}
                </span>
              </div>
              <Typography variant="label" className={`text-sm font-bold uppercase tracking-wider ${selectedIndex === correctAnswerIndex ? 'text-green-700' : 'text-error'}`}>
                {selectedIndex === -1
                  ? 'Time Up - Here is the answer'
                  : selectedIndex === correctAnswerIndex
                    ? 'Correct!'
                    : 'Incorrect - Here is why'}
              </Typography>
            </div>
            <Typography variant="body" className="text-sm leading-relaxed text-on-surface-variant">
              {explanation}
            </Typography>
          </Surface>
        )}

        {answered && (
          <div className="flex justify-end pb-8">
            <Button
              variant="primary"
              onClick={() => {
                // Navigation is handled by the parent exam page after the answer is recorded.
              }}
              className="gap-3 px-10 py-3 shadow-lg shadow-primary/20"
              id="next-question-btn"
            >
              {currentQuestionIndex + 1 < totalQuestions ? (
                <>
                  Next Question <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              ) : (
                <>
                  View Results <span className="material-symbols-outlined text-sm">insights</span>
                </>
              )}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};