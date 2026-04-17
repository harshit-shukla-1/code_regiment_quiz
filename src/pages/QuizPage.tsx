"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertTriangle, Maximize2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import QuizTimer from '@/components/QuizTimer';
import CameraMonitor from '@/components/CameraMonitor';
import { supabase } from '@/integrations/supabase/client';
import { showError, showSuccess } from '@/utils/toast';

const QuizPage = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [startTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const navigate = useNavigate();
  
  const isSubmittingRef = useRef(false);

  // User details from local storage
  const userName = localStorage.getItem('quiz_user') || '';
  const userEmail = localStorage.getItem('quiz_email') || '';
  const houseName = localStorage.getItem('quiz_house_name') || '';
  const houseId = localStorage.getItem('quiz_house_id') || '';
  const isInProgress = localStorage.getItem('quiz_in_progress') === 'true';

  const finishQuiz = useCallback(async (reason: string = "manual") => {
    if (isSubmittingRef.current || isFinished || questions.length === 0) return;
    
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const finalScore = userAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].correct_answer ? acc + 1 : acc;
    }, 0);

    try {
      // Exit fullscreen before redirecting
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      const { error } = await supabase
        .from('leaderboard')
        .insert([{ 
          name: userName, 
          email: userEmail,
          house_name: houseName,
          house_id: houseId,
          score: finalScore, 
          time_taken: timeTaken 
        }]);

      if (error) throw error;
      
      setIsFinished(true);
      localStorage.removeItem('quiz_in_progress');
      
      if (reason === "violation") {
        showError("MISSION TERMINATED: Security breach detected (screen exit or tab switch). Results submitted.");
      } else if (reason === "timer") {
        showError("Time's up! Your results have been submitted.");
      } else {
        showSuccess(`Mission accomplished! Score: ${finalScore}/${questions.length}`);
      }
      
      navigate('/leaderboard');
    } catch (error: any) {
      showError('Sync failed: ' + error.message);
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  }, [userName, userEmail, houseName, houseId, isFinished, questions, startTime, userAnswers, navigate]);

  const enterFullScreen = async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
        setIsFullScreen(true);
      }
    } catch (err) {
      showError("Fullscreen activation failed. Please check browser settings.");
    }
  };

  // Initialization Effect
  useEffect(() => {
    if (!userName || !houseName || !houseId || !isInProgress) {
      navigate('/');
      return;
    }

    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase.from('questions').select('*');
        if (error) throw error;
        
        const shuffled = [...(data || [])].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 20);
        
        if (selected.length === 0) {
          showError("Mission intel missing. Contact admin.");
          navigate('/');
          return;
        }

        setQuestions(selected);
        setUserAnswers(new Array(selected.length).fill(null));
      } catch (err: any) {
        showError("Communication lost: " + err.message);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Strict Monitoring Effect
  useEffect(() => {
    const handleViolation = () => {
      if (!isSubmittingRef.current && !isFinished && questions.length > 0) {
        finishQuiz("violation");
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleViolation();
      }
    };

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        handleViolation();
      } else {
        setIsFullScreen(true);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isFinished && !isSubmittingRef.current) {
        e.preventDefault();
        e.returnValue = 'Mission in progress. Exiting will submit your current progress.';
        return e.returnValue;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFinished, finishQuiz, questions.length]);

  const handleOptionSelect = (index: number) => {
    if (isSubmitting || isFinished) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = index;
    setUserAnswers(newAnswers);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 400);
  };

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
      <Loader2 className="animate-spin text-indigo-900" size={40} />
      <p className="font-bold text-slate-500 uppercase tracking-widest">Loading Intel...</p>
    </div>
  );

  // Fullscreen gate
  if (!isFullScreen && !isFinished) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-900 p-6 text-white text-center">
      <div className="max-w-md space-y-8">
        <div className="mx-auto w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center">
          <ShieldAlert size={40} className="text-white" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-black uppercase tracking-tight">Secure Environment Required</h1>
          <p className="text-indigo-200 font-medium">
            To ensure the integrity of the assessment, the mission must be conducted in full-screen mode.
          </p>
        </div>
        <Button 
          onClick={enterFullScreen}
          className="w-full h-16 bg-white text-indigo-900 hover:bg-indigo-50 rounded-2xl font-black text-xl shadow-2xl"
        >
          <Maximize2 className="mr-2" size={24} />
          Enter Secure Mode
        </Button>
        <p className="text-[10px] text-indigo-400 uppercase font-bold tracking-widest">
          Warning: Exiting full-screen will auto-submit the quiz.
        </p>
      </div>
    </div>
  );

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = userAnswers[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-3 md:p-6 flex flex-col items-center justify-center overflow-x-hidden">
      <CameraMonitor userName={userName} email={userEmail} houseId={houseId} />

      <div className="w-full max-w-2xl space-y-4 md:space-y-6">
        <div className="flex items-center justify-between bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest">Question</p>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {currentQuestionIndex + 1} <span className="text-slate-400 text-base md:text-lg">/ {questions.length}</span>
            </h2>
          </div>
          <div className="text-right space-y-0.5">
            <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest">Secure Link</p>
            <h2 className="text-sm md:text-base font-bold text-indigo-600 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
              Active Surveillance
            </h2>
          </div>
        </div>

        <QuizTimer duration={600} onTimeUp={() => finishQuiz("timer")} isActive={!isFinished && !isSubmitting} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="w-full"
          >
            <Card className="border-none shadow-xl rounded-3xl bg-white">
              <CardContent className="p-5 md:p-8 space-y-6 md:space-y-8">
                <h3 className="text-lg md:text-2xl font-bold text-slate-800 leading-tight">
                  {currentQuestion?.text}
                </h3>
                <div className="grid gap-3 md:gap-4">
                  {currentQuestion?.options.map((option: string, index: number) => {
                    const isSelected = selectedOption === index;
                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        className={`h-auto min-h-[3.5rem] text-base md:text-lg justify-start px-4 py-3 rounded-2xl border-2 transition-all text-left flex items-center gap-3 w-full ${
                          isSelected ? "border-indigo-600 bg-indigo-50 text-indigo-900" : "border-slate-100 hover:border-indigo-200 text-slate-700"
                        }`}
                        onClick={() => handleOptionSelect(index)}
                        disabled={isSubmitting}
                      >
                        <span className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                          isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 text-slate-400"
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1 whitespace-normal">{option}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              disabled={currentQuestionIndex === 0 || isSubmitting}
              className="flex-1 h-12 rounded-xl"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              disabled={currentQuestionIndex === questions.length - 1 || isSubmitting}
              className="flex-1 h-12 rounded-xl"
            >
              Next
            </Button>
          </div>

          <Button
            onClick={() => window.confirm("Ready to submit mission?") && finishQuiz("manual")}
            disabled={isSubmitting}
            className="w-full h-14 bg-indigo-900 hover:bg-indigo-800 text-white rounded-2xl font-black text-lg shadow-lg"
          >
            {isSubmitting ? "Syncing..." : "Submit Mission"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;