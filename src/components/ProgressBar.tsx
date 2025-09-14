import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export default function ProgressBar({ 
  value, 
  max = 100, 
  className, 
  variant = 'primary',
  size = 'md',
  showLabel = true,
  animated = true
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const variantClasses = {
    primary: 'bg-gradient-primary',
    secondary: 'bg-gradient-secondary',
    success: 'bg-gradient-success',
    warning: 'bg-gradient-warning',
    danger: 'bg-gradient-danger',
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
          <span className="text-xs text-muted-foreground">{value}/{max}</span>
        </div>
      )}
      <div className={cn(
        "w-full bg-glass-background rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            variantClasses[variant],
            animated && "animate-pulse"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}