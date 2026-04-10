"use client";

import React, { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface QuizTimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm font-medium">
        <div className="flex items-center gap-2 text-indigo-600">
          <Timer size={18} />
          <span>Time Remaining</span>
        </div>
        <span className={timeLeft < 30 ? "text-red-500 animate-pulse" : "text-gray-700"}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
      <Progress value={percentage} className="h-2 bg-indigo-100" />
    </div>
  );
};

export default QuizTimer;