import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-glass-background/50 backdrop-blur-xl border border-glass-border rounded-xl shadow-glass",
        "transition-all duration-300 ease-in-out",
        hover && "hover:bg-glass-highlight/30 hover:border-glass-highlight hover:shadow-elevated hover:-translate-y-1",
        glow && "shadow-glow",
        className
      )}
    >
      {children}
    </div>
  );
}