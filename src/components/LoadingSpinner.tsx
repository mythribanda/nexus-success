import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
}

export default function LoadingSpinner({ 
  size = 'md', 
  className,
  variant = 'primary'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const variantClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    success: 'border-success',
    warning: 'border-warning'
  };

  return (
    <div className={cn(
      "inline-block rounded-full border-2 border-solid border-current border-r-transparent animate-spin",
      sizeClasses[size],
      variantClasses[variant],
      className
    )}>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-primary rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-lg font-medium bg-gradient-primary bg-clip-text text-transparent">
          Loading Smart Student Hub...
        </p>
        <div className="mt-2 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}