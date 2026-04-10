"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Trophy, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('quiz_user', name.trim());
      navigate('/quiz');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-lg mb-4">
            <Brain className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">QuizMaster</h1>
          <p className="text-gray-600">Test your knowledge and climb the leaderboard!</p>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Ready to start?</CardTitle>
            <CardDescription className="text-center">
              Enter your name to begin the 20-question challenge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStart} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-lg border-indigo-100 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  type="submit" 
                  className="h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg group"
                >
                  Start Quiz
                  <Play className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/leaderboard')}
                  className="h-12 border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-xl font-semibold text-lg"
                >
                  <Trophy className="mr-2" size={18} />
                  Scores
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white shadow-sm">
            <div className="text-indigo-600 font-bold text-xl">20</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Questions</div>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-sm">
            <div className="text-indigo-600 font-bold text-xl">5m</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Timer</div>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-sm">
            <div className="text-indigo-600 font-bold text-xl">#1</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Rank</div>
          </div>
        </div>
      </motion.div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;