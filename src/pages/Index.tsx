"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Trophy, Play, Home, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const [name, setName] = useState('');
  const [houseName, setHouseName] = useState('');
  const [houseId, setHouseId] = useState('');
  const navigate = useNavigate();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && houseName.trim() && houseId.trim()) {
      localStorage.setItem('quiz_user', name.trim());
      localStorage.setItem('quiz_house_name', houseName.trim());
      localStorage.setItem('quiz_house_id', houseId.trim());
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
          <div className="inline-flex items-center justify-center p-3 bg-indigo-900 rounded-2xl shadow-lg mb-4">
            <Shield className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase">Code Regiment</h1>
          <p className="text-slate-600 font-medium">Robotics Workshop Assessment</p>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl">
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
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
            <div className="text-indigo-900 font-bold text-xl">20</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Questions</div>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
            <div className="text-indigo-900 font-bold text-xl">5m</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Timer</div>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
            <div className="text-indigo-900 font-bold text-xl">Live</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Ranking</div>
          </div>
        </div>
      </motion.div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;