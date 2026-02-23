"use client";

import { useRef, useEffect } from "react";
import { TransitionProvider, useTransitionContext } from "@/components/transitions/TransitionContext";
import { RapidLayersTransition, type RapidLayersTransitionHandle } from "@/components/transitions/RapidLayersTransition";

function TransitionWrapperInner({ children }: { children: React.ReactNode }) {
  const transitionRef = useRef<RapidLayersTransitionHandle>(null);
  const { register } = useTransitionContext();

  useEffect(() => {
    register({
      playCover: () => transitionRef.current?.play() ?? Promise.resolve(),
      playReveal: () => transitionRef.current?.reveal() ?? Promise.resolve(),
      setVariant: () => {},
    });
  }, [register]);

  return (
    <>
      {children}
      <RapidLayersTransition ref={transitionRef} />
    </>
  );
}

export default function TransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransitionProvider>
      <TransitionWrapperInner>{children}</TransitionWrapperInner>
    </TransitionProvider>
  );
}
