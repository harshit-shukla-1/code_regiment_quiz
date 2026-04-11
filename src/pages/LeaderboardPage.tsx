"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Timer, ArrowLeft, Medal, User, Loader2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  name: string;
  house_name: string;
  house_id: string;
  score: number;
  time_taken: number;
  created_at: string;
}

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .order('score', { ascending: false })
          .order('time_taken', { ascending: true })
          .limit(50);

        if (error) throw error;
        setResults(data || []);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="rounded-xl hover:bg-white/50 text-slate-600"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Base
          </Button>
          <div className="flex items-center gap-2 text-indigo-900">
            <Trophy size={24} />
            <h1 className="text-2xl font-black uppercase tracking-tight">Leaderboard</h1>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="animate-spin text-indigo-900" size={40} />
            <p className="text-slate-500 font-medium">Retrieving rankings...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {results.slice(0, 3).map((result, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={index}
                  className={`relative p-6 rounded-3xl shadow-lg text-center border ${
                    index === 0 
                      ? 'bg-indigo-900 text-white scale-105 z-10 border-indigo-900' 
                      : 'bg-white text-slate-800 border-slate-100'
                  }`}
                >
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                    index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-slate-300' : 'bg-amber-600'
                  }`}>
                    <Medal size={20} className="text-white" />
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm font-bold opacity-80 uppercase tracking-wider">Rank #{index + 1}</p>
                    <h3 className="text-xl font-black truncate px-2">{result.name}</h3>
                    <p className="text-xs font-bold opacity-70 flex items-center justify-center gap-1">
                      <Home size={12} /> {result.house_name} ({result.house_id})
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-70 font-bold">Score</p>
                        <p className="text-lg font-black">{result.score}/20</p>
                      </div>
                      <div className="w-px h-8 bg-current opacity-20" />
                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-70 font-bold">Time</p>
                        <p className="text-lg font-black">{formatTime(result.time_taken)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
                  <User size={18} className="text-indigo-900" />
                  Top Operatives
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                        <th className="px-6 py-4">Rank</th>
                        <th className="px-6 py-4">Operative</th>
                        <th className="px-6 py-4">House</th>
                        <th className="px-6 py-4">Score</th>
                        <th className="px-6 py-4">Time</th>
                        <th className="px-6 py-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {results.length > 0 ? (
                        results.map((result, index) => (
                          <tr key={index} className="hover:bg-indigo-50/30 transition-colors">
                            <td className="px-6 py-4 font-black text-slate-300">#{index + 1}</td>
                            <td className="px-6 py-4 font-bold text-slate-900">{result.name}</td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-bold text-slate-700">{result.house_name}</div>
                              <div className="text-xs text-slate-400">ID: {result.house_id}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-900">
                                {result.score} / 20
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-600 font-medium flex items-center gap-1">
                              <Timer size={14} />
                              {formatTime(result.time_taken)}
                            </td>
                            <td className="px-6 py-4 text-slate-400 text-sm font-medium">
                              {new Date(result.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                            No records found. Be the first to complete the mission!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <div className="flex justify-center pt-4">
          <Button 
            onClick={() => navigate('/')}
            className="bg-indigo-900 hover:bg-indigo-800 text-white px-8 py-6 rounded-2xl text-lg font-black shadow-lg shadow-indigo-100 uppercase tracking-wider"
          >
            New Mission
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;