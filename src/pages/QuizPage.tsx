"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, Send, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import QuizTimer from '@/components/QuizTimer';
import { defaultQuestions } from '@/data/questions';
import { supabase } from '@/integrations/supabase/client';
import { showError, showSuccess } from '@/utils/toast';

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(defaultQuestions.length).fill(null));
  const [startTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const userName = localStorage.getItem('quiz_user');
  const houseName = localStorage.getItem('quiz_house_name');
  const houseId = localStorage.getItem('quiz_house_id');
  
  const currentQuestion = defaultQuestions[currentQuestionIndex];
  const selectedOption = userAnswers[currentQuestionIndex];

  const currentScore = userAnswers.reduce((acc, answer, index) => {
    return answer === defaultQuestions[index].correctAnswer ? acc + 1 : acc;
  }, 0);

  useEffect(() => {
    if (!userName || !houseName || !houseId) {
      navigate('/');
    }
  }, [userName, houseName, houseId, navigate]);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null || isSubmitting) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = index;
    setUserAnswers(newAnswers);

    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < defaultQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 600);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < defaultQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const finishQuiz = async () => {
    if (isSubmitting) return;
    
    const unansweredCount = userAnswers.filter(a => a === null).length;
    if (unansweredCount > 0 && !isFinished) {
      const confirmSubmit = window.confirm(`You have ${unansweredCount} unanswered questions. Are you sure you want to submit?`);
      if (!confirmSubmit) return;
    }

    setIsSubmitting(true);
    
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    try {
      const { error } = await supabase
        .from('quiz_results')
        .insert([
          { 
            name: userName || 'Anonymous', 
            house_name: houseName || 'Unknown',
            house_id: houseId || 'Unknown',
            score: currentScore, 
            time_taken: timeTaken 
          }
        ]);

      if (error) throw error;
      
      setIsFinished(true);
      showSuccess('Mission accomplished! Score submitted.');
      navigate('/leaderboard');
    } catch (error: any) {
      console.error('Error saving result:', error);
      showError(error.message || 'Failed to save your score. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-3 md:p-6 flex flex-col items-center justify-center overflow-x-hidden">
      <div className="w-full max-w-2xl space-y-4 md:space-y-6">
        <div className="flex items-center justify-between bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest">Question</p>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {currentQuestionIndex + 1} <span className="text-slate-400 text-base md:text-lg">/ {defaultQuestions.length}</span>
            </h2>
          </div>
          <div className="text-right space-y-0.5">
            <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest">Score</p>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">{currentScore}</h2>
          </div>
        </div>

        <QuizTimer duration={300} onTimeUp={finishQuiz} isActive={!isFinished && !isSubmitting} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Card className="border-none shadow-xl overflow-hidden rounded-3xl bg-white">
              <CardContent className="p-5 md:p-8 space-y-6 md:space-y-8">
                <h3 className="text-lg md:text-2xl font-bold text-slate-800 leading-tight break-words overflow-hidden">
                  {currentQuestion.text}
                </h3>

                <div className="grid gap-3 md:gap-4">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const showResult = selectedOption !== null;

                    let buttonClass = "h-auto min-h-[3.5rem] md:min-h-[4rem] text-base md:text-lg justify-between px-4 md:px-6 py-3 md:py-4 rounded-2xl border-2 transition-all duration-200 text-left flex items-center gap-3 md:gap-4 w-full ";
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
                        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0 overflow-hidden">
                          <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border-2 border-current flex items-center justify-center text-xs md:text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="leading-snug break-words flex-1 overflow-hidden">{option}</span>
                        </div>
                        <div className="flex-shrink-0">
                          {showResult && isCorrect && <CheckCircle2 className="text-emerald-500 w-5 h-5 md:w-6 md:h-6" />}
                          {showResult && isSelected && !isCorrect && <XCircle className="text-rose-500 w-5 h-5 md:w-6 md:h-6" />}
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex items-center justify-between gap-3 md:gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0 || isSubmitting}
              className="flex-1 h-11 md:h-12 rounded-xl border-slate-200 text-slate-600 font-bold text-sm md:text-base"
            >
              <ChevronLeft className="mr-1 md:mr-2" size={18} />
              Previous
            </Button>
            
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentQuestionIndex === defaultQuestions.length - 1 || isSubmitting}
              className="flex-1 h-11 md:h-12 rounded-xl border-slate-200 text-slate-600 font-bold text-sm md:text-base"
            >
              Next
              <ChevronRight className="ml-1 md:ml-2" size={18} />
            </Button>
          </div>

          <Button
            onClick={finishQuiz}
            disabled={isSubmitting}
            className="w-full h-12 md:h-14 bg-indigo-900 hover:bg-indigo-800 text-white rounded-2xl font-black text-base md:text-lg shadow-lg shadow-indigo-100 uppercase tracking-wider"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Send size={18} />
                </motion.div>
                Transmitting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Submit Mission
                <Send size={18} />
              </span>
            )}
          </Button>

          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-slate-400 hover:text-rose-600 text-xs md:text-sm"
              onClick={() => {
                if (window.confirm('Are you sure you want to quit? Your progress will be lost.')) {
                  navigate('/');
                }
              }}
            >
              <AlertCircle className="mr-1" size={14} />
              Abandon Mission
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;