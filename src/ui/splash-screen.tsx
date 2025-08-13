"use client";

import { useEffect, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export function SplashScreen({ onFinish, duration = 2000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onFinish();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [onFinish, duration]);

  if (!isVisible) return null;

  return (
    <div className={`splash-screen fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path 
              d="M40 16C54.359 16 66 27.641 66 42V52C66 66.359 54.359 78 40 78C25.641 78 14 66.359 14 52V42C14 27.641 25.641 16 40 16Z" 
              fill="#000000"
            />
            <circle cx="40" cy="42" r="8" fill="white"/>
            <rect x="32" y="52" width="16" height="20" rx="2" fill="white"/>
          </svg>
        </div>
        
        <h1 className="text-white text-3xl font-bold">اوشتو</h1>
        
        <div className="flex space-x-1 rtl:space-x-reverse">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;