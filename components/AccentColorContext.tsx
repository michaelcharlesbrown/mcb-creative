"use client";

import { createContext, useContext, useState, useCallback } from "react";

const AccentColorContext = createContext<{
  accentColor: string | null;
  setAccentColor: (color: string | null) => void;
}>({
  accentColor: null,
  setAccentColor: () => {},
});

export function AccentColorProvider({ children }: { children: React.ReactNode }) {
  const [accentColor, setAccentColor] = useState<string | null>(null);
  const setter = useCallback((color: string | null) => setAccentColor(color), []);
  return (
    <AccentColorContext.Provider value={{ accentColor, setAccentColor: setter }}>
      {children}
    </AccentColorContext.Provider>
  );
}

export function useAccentColor() {
  return useContext(AccentColorContext);
}
