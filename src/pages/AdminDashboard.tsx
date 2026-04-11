"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, LogOut, LayoutDashboard, Database, Users, CheckCircle2 } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [newQuestion, setNewQuestion] = useState({ text: '', options: ['', '', '', ''], correct_answer: 0 });

  useEffect(() => {
    checkAdmin();
    fetchData();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return navigate('/admin');

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      showError("Access Denied: You do not have admin privileges.");
      await supabase.auth.signOut();
      navigate('/admin');
    } else {
      setIsAdmin(true);
    }
  };

  const fetchData = async () => {
    const { data: qData } = await supabase.from('questions').select('*').order('created_at', { ascending: false });
    const { data: rData } = await supabase.from('leaderboard').select('*').order('created_at', { ascending: false });
    setQuestions(qData || []);
    setResults(rData || []);
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('questions').insert([newQuestion]);
    if (error) showError(error.message);
    else {
      showSuccess("Question added to the pool");
      setNewQuestion({ text: '', options: ['', '', '', ''], correct_answer: 0 });
      fetchData();
    }
  };

  const deleteQuestion = async (id: string) => {
    if (!window.confirm("Delete this question?")) return;
    const { error } = await supabase.from('questions').delete().eq('id', id);
    if (error) showError(error.message);
    else fetchData();
  };

  const deleteResult = async (id: string) => {
    if (!window.confirm("Delete this entry?")) return;
    const { error } = await supabase.from('leaderboard').delete().eq('id', id);
    if (error) showError(error.message);
    else fetchData();
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-indigo-900">
            <LayoutDashboard size={28} />
            <h1 className="text-2xl font-black uppercase tracking-tight">Admin Command</h1>
          </div>
          <Button variant="outline" onClick={() => supabase.auth.signOut().then(() => navigate('/'))}>
            <LogOut className="mr-2" size={18} />
            Logout
          </Button>
        </header>

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="bg-white border p-1 rounded-xl">
            <TabsTrigger value="questions" className="rounded-lg gap-2">
              <Database size={16} /> Question Pool ({questions.length})
            </TabsTrigger>
            <TabsTrigger value="results" className="rounded-lg gap-2">
              <Users size={16} /> Manage Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            <Card className="border-none shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle>Add New Question</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddQuestion} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Question Text</Label>
                    <Input 
                      value={newQuestion.text} 
                      onChange={e => setNewQuestion({...newQuestion, text: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newQuestion.options.map((opt, i) => (
                      <div key={i} className="space-y-2">
                        <Label>Option {String.fromCharCode(65 + i)}</Label>
                        <div className="flex gap-2">
                          <Input 
                            value={opt} 
                            onChange={e => {
                              const opts = [...newQuestion.options];
                              opts[i] = e.target.value;
                              setNewQuestion({...newQuestion, options: opts});
                            }}
                            required 
                          />
                          <Button 
                            type="button"
                            variant={newQuestion.correct_answer === i ? "default" : "outline"}
                            className="shrink-0"
                            onClick={() => setNewQuestion({...newQuestion, correct_answer: i})}
                          >
                            {newQuestion.correct_answer === i ? <CheckCircle2 size={18} /> : "Correct"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button type="submit" className="w-full bg-indigo-900 hover:bg-indigo-800">
                    <Plus className="mr-2" size={18} /> Enlist Question
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Options</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.map((q) => (
                    <TableRow key={q.id}>
                      <TableCell className="font-medium">{q.text}</TableCell>
                      <TableCell>
                        <div className="text-xs space-y-1">
                          {q.options.map((opt: string, i: number) => (
                            <div key={i} className={i === q.correct_answer ? "text-green-600 font-bold" : "text-slate-500"}>
                              {String.fromCharCode(65 + i)}: {opt}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="text-rose-600" onClick={() => deleteQuestion(q.id)}>
                          <Trash2 size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>House</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-bold">{r.name}</TableCell>
                      <TableCell>{r.house_name} ({r.house_id})</TableCell>
                      <TableCell>{r.score}/20</TableCell>
                      <TableCell className="text-slate-500">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="text-rose-600" onClick={() => deleteResult(r.id)}>
                          <Trash2 size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;