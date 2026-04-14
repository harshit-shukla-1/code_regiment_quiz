"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Timer, Camera, FileText, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const InstructionsPage = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('quiz_user');

  if (!userName) {
    navigate('/');
    return null;
  }

  const handleBegin = () => {
    localStorage.setItem('quiz_in_progress', 'true');
    navigate('/quiz');
  };

  const instructions = [
    {
      icon: <FileText className="text-indigo-600" size={24} />,
      title: "Question Intel",
      description: "You will face 20 multiple-choice questions covering Robotics, Arduino, and Sensors."
    },
    {
      icon: <Timer className="text-amber-600" size={24} />,
      title: "Mission Duration",
      description: "You have 10 minutes (600 seconds) to complete the assessment. The timer starts immediately."
    },
    {
      icon: <Camera className="text-rose-600" size={24} />,
      title: "Live Monitoring",
      description: "Surveillance is active. Silent snapshots will be captured periodically for integrity."
    },
    {
      icon: <ShieldAlert className="text-indigo-900" size={24} />,
      title: "No Extraction",
      description: "Exiting or refreshing the browser will result in mission failure and loss of progress."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="rounded-xl text-slate-500"
          >
            <ArrowLeft className="mr-2" size={18} />
            Abort
          </Button>
          <div className="text-right">
            <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Operative</p>
            <p className="font-bold text-slate-900">{userName}</p>
          </div>
        </div>

        <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
          <div className="h-2 bg-indigo-900 w-full" />
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-black text-indigo-900 uppercase tracking-tight">Mission Briefing</CardTitle>
            <CardDescription className="text-slate-500 font-medium">Read carefully before deployment.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {instructions.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={index} 
                  className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100"
                >
                  <div className="shrink-0 pt-1">{item.icon}</div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleBegin}
                className="w-full h-16 bg-indigo-900 hover:bg-indigo-800 text-white rounded-2xl font-black text-xl shadow-lg shadow-indigo-100 group"
              >
                Accept Mission & Begin
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
              </Button>
              <p className="text-center text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest">
                By clicking, you agree to the monitoring terms.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default InstructionsPage;