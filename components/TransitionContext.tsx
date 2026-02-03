"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TransitionState {
  isTransitioning: boolean;
  heroImageLoaded: boolean;
  imageSrc: string | null;
  startTransition: (imageSrc: string, startRect: DOMRect) => void;
  setHeroImageLoaded: (loaded: boolean) => void;
  completeTransition: () => void;
}

const TransitionContext = createContext<TransitionState | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const startTransition = (src: string, rect: DOMRect) => {
    setImageSrc(src);
    setIsTransitioning(true);
    setHeroImageLoaded(false);
  };

  const completeTransition = () => {
    setIsTransitioning(false);
    setHeroImageLoaded(false);
    setImageSrc(null);
  };

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        heroImageLoaded,
        imageSrc,
        startTransition,
        setHeroImageLoaded,
        completeTransition,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within TransitionProvider");
  }
  return context;
}
