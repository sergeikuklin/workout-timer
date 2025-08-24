import * as React from "react"
import { cn } from "../lib/utils"

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  size?: string;
  strokeWidth?: string;
  variant?: 'work' | 'rest' | 'break' | 'idle' | 'done';
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ className, value = 0, size = "320px", strokeWidth = "4px", variant = 'idle', children, ...props }, ref) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    // Color mapping for different states
    const getColors = (variant: string) => {
      switch (variant) {
        case 'work':
          return {
            progress: 'hsl(0, 84%, 60%)', // Energetic red
            background: 'hsl(0, 84%, 60%)',
          };
        case 'rest':
          return {
            progress: 'hsl(120, 61%, 50%)', // Fresh green
            background: 'hsl(120, 61%, 50%)',
          };
        case 'break':
          return {
            progress: 'hsl(200, 98%, 39%)', // Calm blue
            background: 'hsl(200, 98%, 39%)',
          };
        case 'done':
          return {
            progress: 'hsl(280, 100%, 70%)', // Celebratory purple
            background: 'hsl(280, 100%, 70%)',
          };
        default:
          return {
            progress: 'hsl(var(--muted-foreground))',
            background: 'hsl(var(--muted-foreground))',
          };
      }
    };

    const colors = getColors(variant);

    return (
      <div 
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center",
          className
        )}
        style={{ 
          width: size, 
          height: size
        }}
        {...props}
      >
        <svg
          className="absolute inset-0 transform -rotate-90"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={colors.background}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="opacity-10"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={colors.progress}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              "transition-all duration-500 ease-out",
              {
                "animate-pulse": variant === 'work' && value > 90, // Pulse when almost done
              }
            )}
          />
        </svg>
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          {children}
        </div>
      </div>
    )
  }
)
CircularProgress.displayName = "CircularProgress"

export { CircularProgress }
