"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface TransitionController {
  playCover: () => Promise<void>;
  playReveal: () => Promise<void>;
  setAccentColor: (color: string) => void;
}

const defaultController: TransitionController = {
  playCover: () => Promise.resolve(),
  playReveal: () => Promise.resolve(),
  setAccentColor: () => {},
};

const TransitionContext = createContext<{
  controller: TransitionController;
  register: (c: TransitionController) => void;
}>({
  controller: defaultController,
  register: () => {},
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [controller, setController] = useState<TransitionController>(defaultController);
  const register = useCallback((c: TransitionController) => setController(c), []);
  return (
    <TransitionContext.Provider value={{ controller, register }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionController() {
  return useContext(TransitionContext).controller;
}

export function useTransitionContext() {
  return useContext(TransitionContext);
}
