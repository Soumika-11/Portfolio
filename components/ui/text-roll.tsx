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
  duration = 0.4,
  className,
  autoPlayInterval = 3500,
}: TextRollProps) {
  const letters = children.split('');
  const [isRolled, setIsRolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cycle = () => {
      setIsRolled((prev) => !prev);
      timerRef.current = setTimeout(cycle, autoPlayInterval);
    };

    timerRef.current = setTimeout(cycle, autoPlayInterval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoPlayInterval]);

  const active = isHovered || isRolled;

  return (
    <motion.span
      className={`inline-flex items-baseline cursor-pointer select-none ${className ?? ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'inline-flex' }}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          className="relative inline-block overflow-hidden leading-[1.25] h-[1.25em] align-baseline"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            animate={{ y: active ? '-100%' : '0%' }}
            transition={{
              duration,
              ease: [0.33, 1, 0.68, 1],
              delay: i * 0.02,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
          <motion.span
            className="absolute left-0 top-full inline-block"
            animate={{ y: active ? '-100%' : '0%' }}
            transition={{
              duration,
              ease: [0.33, 1, 0.68, 1],
              delay: i * 0.02,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </motion.span>
  );
}

