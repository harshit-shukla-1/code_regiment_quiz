"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) navigate('/admin/dashboard');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) navigate('/admin/dashboard');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mb-8 self-center md:absolute md:top-8 md:left-8"
      >
        <ArrowLeft className="mr-2" size={18} />
        Return to Home
      </Button>

      <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden">
        <div className="h-2 bg-indigo-900 w-full" />
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <ShieldCheck className="text-indigo-900" size={24} />
          </div>
          <CardTitle className="text-2xl font-black uppercase tracking-tight">Admin Console</CardTitle>
          <CardDescription>Authorized personnel only</CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={[]}
            redirectTo={window.location.origin + '/admin/dashboard'}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;