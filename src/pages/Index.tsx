"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';import { Trophy, Play, ShieldCheck, Zap, GraduationCap, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Index = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [houseName, setHouseName] = useState('');
  const [houseId, setHouseId] = useState('');
  const navigate = useNavigate();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && houseName.trim() && houseId.trim()) {
      localStorage.removeItem('quiz_in_progress');
      localStorage.setItem('quiz_user', name.trim());
      localStorage.setItem('quiz_email', email.trim());
      localStorage.setItem('quiz_house_name', houseName.trim());
      localStorage.setItem('quiz_house_id', houseId.trim());
      localStorage.setItem('quiz_in_progress', 'true');
      navigate('/quiz');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-100 transition-all duration-300 overflow-hidden p-4"
            >
              <img src="/logo.png" alt="Code Regiment Logo" className="w-full h-full object-contain" />
            </motion.div>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Code Regiment</h1>
            <div className="flex items-center justify-center gap-2 text-indigo-600 font-bold">
              <GraduationCap size={18} />
              <span>Birla Public School</span>
            </div>
            <p className="text-slate-500 font-medium text-sm">Robotics Workshop Assessment</p>
          </div>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
          <div className="h-2 bg-indigo-900 w-full" />
          <CardHeader>
            <CardTitle className="text-2xl text-center">Enlist for the Quiz</CardTitle>
            <CardDescription className="text-center">
              All fields are mandatory to begin the mission.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStart} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 text-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl pl-4"
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl pl-4"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Input
                      placeholder="House Name"
                      value={houseName}
                      onChange={(e) => setHouseName(e.target.value)}
                      className="h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="House ID"
                      value={houseId}
                      onChange={(e) => setHouseId(e.target.value)}
                      className="h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <Button 
                  type="submit" 
                  className="h-12 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl font-semibold text-lg group"
                >
                  Start Quiz
                  <Play className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/leaderboard')}
                  className="h-12 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-semibold text-lg"
                >
                  <Trophy className="mr-2" size={18} />
                  Scores
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col items-center gap-1">
            <ShieldCheck size={20} className="text-indigo-900" />
            <div className="text-indigo-900 font-bold text-xl">20</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Questions</div>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col items-center gap-1">
            <Zap size={20} className="text-indigo-900" />
            <div className="text-indigo-900 font-bold text-xl">10m</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Timer</div>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col items-center gap-1">
            <Trophy size={20} className="text-indigo-900" />
            <div className="text-indigo-900 font-bold text-xl">Live</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Ranking</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;

<dyad-write path="src/pages/QuizPage.tsx" description="Increasing timer to 10 minutes and including email in final submission.">
"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Send, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import QuizTimer from '@/components/QuizTimer';
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
  const navigate = useNavigate();
  
  const userName = localStorage.getItem('quiz_user');
  const userEmail = localStorage.getItem('quiz_email');
  const houseName = localStorage.getItem('quiz_house_name');
  const houseId = localStorage.getItem('quiz_house_id');
  const isInProgress = localStorage.getItem('quiz_in_progress') === 'true';

  useEffect(() => {
    if (!userName || !houseName || !houseId || !isInProgress) {
      navigate('/');
      return;
    }

    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('*');

        if (error) throw error;
        
        // Shuffle and take 20
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

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isFinished && !isSubmitting) {
        e.preventDefault();
        e.returnValue = 'You are exiting and your progress will be lost. Are you sure?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [userName, houseName, houseId, isInProgress, isFinished, isSubmitting, navigate]);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = userAnswers[currentQuestionIndex];

  const calculateScore = () => {
    return userAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].correct_answer ? acc + 1 : acc;
    }, 0);
  };

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

  const finishQuiz = async () => {
    if (isSubmitting || isFinished || questions.length === 0) return;
    
    const unansweredCount = userAnswers.filter(a => a === null).length;
    if (unansweredCount > 0) {
      const confirmSubmit = window.confirm(`You have ${unansweredCount} unanswered questions. Are you sure you want to submit?`);
      if (!confirmSubmit) return;
    }

    setIsSubmitting(true);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const finalScore = calculateScore();

    try {
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
      showSuccess(`Mission accomplished! Score: ${finalScore}/${questions.length}`);
      navigate('/leaderboard');
    } catch (error: any) {
      showError('Sync failed: ' + error.message);
      setIsSubmitting(false);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
      <Loader2 className="animate-spin text-indigo-900" size={40} />
      <p className="font-bold text-slate-500 uppercase tracking-widest">Loading Intel...</p>
    </div>
  );

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-3 md:p-6 flex flex-col items-center justify-center overflow-x-hidden">
      <div className="w-full max-w-2xl space-y-4 md:space-y-6">
        <div className="flex items-center justify-between bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest">Question</p>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {currentQuestionIndex + 1} <span className="text-slate-400 text-base md:text-lg">/ {questions.length}</span>
            </h2>
          </div>
          <div className="text-right space-y-0.5">
            <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest">Status</p>
            <h2 className="text-sm md:text-base font-bold text-indigo-600">In Progress</h2>
          </div>
        </div>

        <QuizTimer duration={600} onTimeUp={finishQuiz} isActive={!isFinished && !isSubmitting} />

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
                  {currentQuestion.text}
                </h3>

                <div className="grid gap-3 md:gap-4">
                  {currentQuestion.options.map((option: string, index: number) => {
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
            onClick={finishQuiz}
            disabled={isSubmitting}
            className="w-full h-14 bg-indigo-900 hover:bg-indigo-800 text-white rounded-2xl font-black text-lg shadow-lg"
          >
            {isSubmitting ? "Syncing..." : "Submit Mission"}
          </Button>

          <Button 
            variant="ghost" 
            className="text-slate-400 text-xs"
            onClick={() => window.confirm('Abandon Mission?') && (localStorage.removeItem('quiz_in_progress'), navigate('/'))}
          >
            Abandon Mission
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;