"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import QuizTimer from '@/components/QuizTimer';
import { defaultQuestions } from '@/data/questions';
import { QuizResult } from '@/types/quiz';

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();
  
  const userName = localStorage.getItem('quiz_user');
  const currentQuestion = defaultQuestions[currentQuestionIndex];

  useEffect(() => {
    if (!userName) {
      navigate('/');
    }
  }, [userName, navigate]);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    
    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < defaultQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        finishQuiz();
      }
    }, 1000);
  };

  const finishQuiz = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const result: QuizResult = {
      name: userName || 'Anonymous',
      score: score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0),
      timeTaken,
      date: new Date().toISOString()
    };

    const existingResults = JSON.parse(localStorage.getItem('quiz_results') || '[]');
    localStorage.setItem('quiz_results', JSON.stringify([...existingResults, result]));
    setIsFinished(true);
    navigate('/leaderboard');
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
          <div className="space-y-1">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Question</p>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentQuestionIndex + 1} <span className="text-gray-400 text-lg">/ {defaultQuestions.length}</span>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Score</p>
            <h2 className="text-2xl font-bold text-gray-900">{score}</h2>
          </div>
        </div>

        <QuizTimer duration={300} onTimeUp={finishQuiz} isActive={!isFinished} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-none shadow-xl overflow-hidden rounded-3xl">
              <CardContent className="p-8 space-y-8">
                <h3 className="text-2xl font-semibold text-gray-800 leading-tight">
                  {currentQuestion.text}
                </h3>

                <div className="grid gap-4">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const showResult = selectedOption !== null;

                    let buttonClass = "h-16 text-lg justify-between px-6 rounded-2xl border-2 transition-all duration-200 ";
                    if (!showResult) {
                      buttonClass += "border-indigo-50 hover:border-indigo-200 hover:bg-indigo-50 text-gray-700";
                    } else if (isCorrect) {
                      buttonClass += "border-green-500 bg-green-50 text-green-700";
                    } else if (isSelected && !isCorrect) {
                      buttonClass += "border-red-500 bg-red-50 text-red-700";
                    } else {
                      buttonClass += "border-gray-100 text-gray-400 opacity-50";
                    }

                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        className={buttonClass}
                        onClick={() => handleOptionSelect(index)}
                        disabled={showResult}
                      >
                        <span className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-full bg-white border-2 border-current flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </span>
                        {showResult && isCorrect && <CheckCircle2 className="text-green-500" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="text-red-500" />}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center">
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-indigo-600"
            onClick={() => {
              if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
                navigate('/');
              }
            }}
          >
            Quit Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;