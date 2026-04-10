"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import QuizTimer from '@/components/QuizTimer';
import { defaultQuestions } from '@/data/questions';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const userName = localStorage.getItem('quiz_user');
  const houseName = localStorage.getItem('quiz_house_name');
  const houseId = localStorage.getItem('quiz_house_id');
  
  const currentQuestion = defaultQuestions[currentQuestionIndex];

  useEffect(() => {
    if (!userName || !houseName || !houseId) {
      navigate('/');
    }
  }, [userName, houseName, houseId, navigate]);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null || isSubmitting) return;
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

  const finishQuiz = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setIsFinished(true);

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const finalScore = score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0);

    try {
      const { error } = await supabase
        .from('quiz_results')
        .insert([
          { 
            name: userName || 'Anonymous', 
            house_name: houseName || 'Unknown',
            house_id: houseId || 'Unknown',
            score: finalScore, 
            time_taken: timeTaken 
          }
        ]);

      if (error) throw error;
      navigate('/leaderboard');
    } catch (error) {
      console.error('Error saving result:', error);
      showError('Failed to save your score. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="space-y-1">
            <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest">Question</p>
            <h2 className="text-2xl font-bold text-slate-900">
              {currentQuestionIndex + 1} <span className="text-slate-400 text-lg">/ {defaultQuestions.length}</span>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest">Score</p>
            <h2 className="text-2xl font-bold text-slate-900">{score}</h2>
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
            <Card className="border-none shadow-xl overflow-hidden rounded-3xl bg-white">
              <CardContent className="p-8 space-y-8">
                <h3 className="text-2xl font-bold text-slate-800 leading-tight">
                  {currentQuestion.text}
                </h3>

                <div className="grid gap-4">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const showResult = selectedOption !== null;

                    let buttonClass = "h-auto min-h-[4rem] text-lg justify-between px-6 py-4 rounded-2xl border-2 transition-all duration-200 text-left ";
                    if (!showResult) {
                      buttonClass += "border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 text-slate-700";
                    } else if (isCorrect) {
                      buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-700";
                    } else if (isSelected && !isCorrect) {
                      buttonClass += "border-rose-500 bg-rose-50 text-rose-700";
                    } else {
                      buttonClass += "border-slate-50 text-slate-400 opacity-50";
                    }

                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        className={buttonClass}
                        onClick={() => handleOptionSelect(index)}
                        disabled={showResult || isSubmitting}
                      >
                        <span className="flex items-center gap-4">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-current flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="leading-snug">{option}</span>
                        </span>
                        {showResult && isCorrect && <CheckCircle2 className="text-emerald-500 flex-shrink-0" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="text-rose-500 flex-shrink-0" />}
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
            className="text-slate-400 hover:text-rose-600"
            onClick={() => {
              if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
                navigate('/');
              }
            }}
          >
            Abandon Mission
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;