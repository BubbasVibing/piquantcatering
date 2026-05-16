'use client';

import { useEffect, useState } from 'react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

interface CountUpProps {
  target: number;
  duration?: number;
  suffix?: string;
}

export default function CountUp({ target, duration = 2000, suffix = '' }: CountUpProps) {
  const { ref, isVisible } = useInViewAnimation<HTMLSpanElement>({ threshold: 0.2 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    let frame = 0;

    const step = (timestamp: number) => {
      if (startTimestamp === null) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
