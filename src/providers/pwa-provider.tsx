"use client";

import { createContext, useContext, useEffect, useState } from "react";
import SplashScreen from "@/ui/splash-screen";

interface PWAContextType {
  isInstalled: boolean;
  isStandalone: boolean;
  showInstallPrompt: () => void;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export function usePWA() {
  const context = useContext(PWAContext);
  if (context === undefined) {
    throw new Error("usePWA must be used within a PWAProvider");
  }
  return context;
}

interface PWAProviderProps {
  children: React.ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  const [showSplash, setShowSplash] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const checkInstallation = () => {
      const standalone = window.matchMedia("(display-mode: standalone)").matches;
      const webkitStandalone = (window.navigator as any).standalone === true;
      const isInStandaloneMode = standalone || webkitStandalone;

      setIsStandalone(isInStandaloneMode);
      setIsInstalled(isInStandaloneMode);

      if (isInStandaloneMode) {
        setShowSplash(true);
        document.body.classList.add('splash-active');
      } else {
        document.body.classList.add('pwa-ready');
      }

    };

    checkInstallation();

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const showInstallPrompt = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
    document.body.classList.remove('splash-active');
    document.body.classList.add('pwa-ready');
  };

  const contextValue: PWAContextType = {
    isInstalled,
    isStandalone,
    showInstallPrompt,
  };

  return (
    <PWAContext.Provider value={contextValue}>
      {showSplash && isStandalone ? (
        <SplashScreen onFinish={handleSplashFinish} duration={1500} />
      ) : null}
      {!showSplash || !isStandalone ? children : null}
    </PWAContext.Provider>
  );
}