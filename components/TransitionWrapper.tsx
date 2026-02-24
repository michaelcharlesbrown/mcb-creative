"use client";

import { useRef, useEffect } from "react";
import { TransitionProvider, useTransitionContext } from "@/components/transitions/TransitionContext";
import { PinkWipeTransition, type PinkWipeHandle } from "@/components/transitions/PinkWipeTransition";

function TransitionWrapperInner({ children }: { children: React.ReactNode }) {
  const wipeRef = useRef<PinkWipeHandle>(null);
  const { register } = useTransitionContext();

  useEffect(() => {
    register({
      playCover: () => wipeRef.current?.playCover() ?? Promise.resolve(),
      playReveal: () => wipeRef.current?.playReveal() ?? Promise.resolve(),
      setAccentColor: (color) => wipeRef.current?.setAccentColor(color),
    });
  }, [register]);

  return (
    <>
      {children}
      <PinkWipeTransition ref={wipeRef} />
    </>
  );
}

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <TransitionProvider>
      <TransitionWrapperInner>{children}</TransitionWrapperInner>
    </TransitionProvider>
  );
}
