"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
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
    <div className={cn("splash-screen fixed inset-0 z-50 flex items-center justify-center bg-primary transition-opacity duration-300",
      fadeOut ? 'opacity-0' : 'opacity-100'
    )}>
      <div className="flex flex-col items-center">
        <Image src={"/images/oshtow-tagline.png"} alt="" width={720} height={428} className="w-52" />
      </div>
    </div>
  );
}

export default SplashScreen;