"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { supabase } from '@/integrations/supabase/client';

interface CameraMonitorProps {
  userName: string;
  email: string;
  houseId: string;
  intervalMs?: number;
}

const CameraMonitor: React.FC<CameraMonitorProps> = ({ userName, email, houseId, intervalMs = 30000 }) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        try {
          await supabase.from('monitoring_snapshots').insert([{
            user_name: userName,
            email: email,
            house_id: houseId,
            snapshot: imageSrc
          }]);
        } catch (error) {
          console.error("[CameraMonitor] Failed to upload snapshot", error);
        }
      }
    }
  }, [userName, email, houseId]);

  useEffect(() => {
    const interval = setInterval(capture, intervalMs);
    // Initial capture after 2 seconds to allow camera to warm up
    const initialTimeout = setTimeout(capture, 2000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [capture, intervalMs]);

  return (
    <div className="fixed bottom-4 right-4 w-32 h-24 rounded-lg overflow-hidden border-2 border-indigo-500 shadow-xl z-50 opacity-20 hover:opacity-100 transition-opacity">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 320,
          height: 240,
          facingMode: "user"
        }}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-1 left-1 flex items-center gap-1">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-[8px] font-bold text-white bg-black/50 px-1 rounded">LIVE MONITOR</span>
      </div>
    </div>
  );
};

export default CameraMonitor;