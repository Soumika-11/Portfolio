'use client';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  Variant,
  Transition,
} from 'framer-motion';

export type TextRollProps = {
  children: string;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  className?: string;
  transition?: Transition;
  variants?: {
    enter: {
      initial: Variant;
      animate: Variant;
    };
    exit: {
      initial: Variant;
      animate: Variant;
    };
  };
  onAnimationComplete?: () => void;
  /** Interval (ms) between auto-play loops on touch devices. Default 3000. */
  autoPlayInterval?: number;
};

export function TextRoll({
  children,
  duration = 0.5,
  getEnterDelay = (i) => i * 0.1,
  getExitDelay = (i) => i * 0.1 + 0.2,
  className,
  transition = { ease: 'easeIn' },
  variants,
  onAnimationComplete,
  autoPlayInterval = 3000,
}: TextRollProps) {
  const defaultVariants = {
    enter: {
      initial: { rotateX: 0 } as Variant,
      hover: { rotateX: 90 } as Variant,
    },
    exit: {
      initial: { rotateX: -90 } as Variant,
      hover: { rotateX: 0 } as Variant,
    },
  };

  const letters = children.split('');

  // Touch-device auto-play
  const [animState, setAnimState] = useState<'initial' | 'hover'>('initial');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const touch = !window.matchMedia('(pointer: fine)').matches;
    setIsTouchDevice(touch);
    if (!touch) return;

    const cycle = () => {
      setAnimState('hover');
      // Wait for roll-in + roll-out to finish, then snap back and pause
      const rollDuration =
        (getExitDelay(letters.length - 1) + duration) * 1000 + 200;
      timerRef.current = setTimeout(() => {
        setAnimState('initial');
        timerRef.current = setTimeout(cycle, autoPlayInterval);
      }, rollDuration);
    };

    timerRef.current = setTimeout(cycle, 800);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoPlayInterval, duration, getExitDelay, letters.length]);

  return (
    <motion.span
      className={className}
      initial="initial"
      animate={isTouchDevice ? animState : undefined}
      whileHover={!isTouchDevice ? 'hover' : undefined}
      style={{ display: 'inline-flex', cursor: 'pointer' }}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          className="relative inline-block [perspective:10000px] [transform-style:preserve-3d] [width:auto]"
          aria-hidden="true"
        >
          <motion.span
            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]"
            variants={{
              initial: variants?.enter?.initial ?? defaultVariants.enter.initial,
              hover: variants?.enter?.animate ?? defaultVariants.enter.hover,
            }}
            transition={{ ...transition, duration, delay: getEnterDelay(i) }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
          <motion.span
            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_100%]"
            variants={{
              initial: variants?.exit?.initial ?? defaultVariants.exit.initial,
              hover: variants?.exit?.animate ?? defaultVariants.exit.hover,
            }}
            transition={{ ...transition, duration, delay: getExitDelay(i) }}
            onAnimationComplete={
              letters.length === i + 1 ? onAnimationComplete : undefined
            }
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
          <span className="invisible">
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </motion.span>
  );
}

