import { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({ 
  end, 
  start = 0, 
  duration = 2000, 
  decimals = 0,
  suffix = '',
  prefix = '',
  className = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    const startValue = start;
    const endValue = end;
    const change = endValue - startValue;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = startValue + (change * easeOutQuart);
      
      setCount(Number(current.toFixed(decimals)));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100);

    return () => clearTimeout(timer);
  }, [end, start, duration, decimals]);

  return (
    <span className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}