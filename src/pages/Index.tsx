"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Play, ShieldCheck, Zap, GraduationCap } from 'lucide-react';
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
      // Navigate to instructions first instead of directly to quiz
      navigate('/instructions');
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
</dyad-writethink
The previous turn was interrupted at the end of the `Index.tsx` file update. I should verify if there are any remaining tasks or if the last update was effectively complete.

Looking at the previous turn:
1. `InstructionsPage.tsx` was created.
2. `App.tsx` was updated to include the route.
3. `Index.tsx` was being updated to navigate to `/instructions`.

The `Index.tsx` block finished with the closing tag `