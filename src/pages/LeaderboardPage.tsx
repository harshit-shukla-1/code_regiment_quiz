"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Timer, ArrowLeft, Medal, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizResult } from '@/types/quiz';

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const results: QuizResult[] = JSON.parse(localStorage.getItem('quiz_results') || '[]');

  // Sort by score (desc) then by time (asc)
  const sortedResults = [...results].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeTaken - b.timeTaken;
  }).slice(0, 10);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="rounded-xl hover:bg-white/50"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Home
          </Button>
          <div className="flex items-center gap-2 text-indigo-600">
            <Trophy size={24} />
            <h1 className="text-2xl font-bold">Leaderboard</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {sortedResults.slice(0, 3).map((result, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className={`relative p-6 rounded-3xl shadow-lg text-center ${
                index === 0 ? 'bg-indigo-600 text-white scale-105 z-10' : 'bg-white text-gray-800'
              }`}
            >
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-300' : 'bg-orange-400'
              }`}>
                <Medal size={20} className="text-white" />
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium opacity-80">Rank #{index + 1}</p>
                <h3 className="text-xl font-bold truncate px-2">{result.name}</h3>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-70">Score</p>
                    <p className="text-lg font-bold">{result.score}/20</p>
                  </div>
                  <div className="w-px h-8 bg-current opacity-20" />
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-70">Time</p>
                    <p className="text-lg font-bold">{formatTime(result.timeTaken)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-50">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <User size={18} className="text-indigo-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Player</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sortedResults.length > 0 ? (
                    sortedResults.map((result, index) => (
                      <tr key={index} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-400">#{index + 1}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{result.name}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {result.score} / 20
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 flex items-center gap-1">
                          <Timer size={14} />
                          {formatTime(result.timeTaken)}
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {new Date(result.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                        No results yet. Be the first to play!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-4">
          <Button 
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-2xl text-lg font-bold shadow-lg shadow-indigo-200"
          >
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;