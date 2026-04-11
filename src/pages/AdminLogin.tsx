"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin/dashboard');
      }
      setLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/admin/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-900" size={32} />
      </div>
    );
  }

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
          <CardTitle className="text-2xl font-black uppercase tracking-tight text-indigo-900">Admin Console</CardTitle>
          <CardDescription>Authorized personnel only</CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#312e81',
                    brandAccent: '#4338ca',
                  }
                }
              }
            }}
            theme="light"
            providers={[]}
            showLinks={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;