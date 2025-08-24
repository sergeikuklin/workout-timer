import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { cn } from '../lib/utils';

export interface CircularProgressProps {
  value?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'work' | 'rest' | 'break' | 'idle' | 'done';
  className?: string;
  children?: React.ReactNode;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value = 0,
  size = 320,
  strokeWidth = 8,
  variant = 'idle',
  className,
  children,
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  // Color mapping for different states
  const getColors = (variant: string) => {
    switch (variant) {
      case 'work':
        return {
          progress: '#DC2626', // Energetic red
          background: '#DC2626',
        };
      case 'rest':
        return {
          progress: '#16A34A', // Fresh green
          background: '#16A34A',
        };
      case 'break':
        return {
          progress: '#2563EB', // Calm blue
          background: '#2563EB',
        };
      case 'done':
        return {
          progress: '#7C3AED', // Celebratory purple
          background: '#7C3AED',
        };
      default:
        return {
          progress: '#6B7280',
          background: '#6B7280',
        };
    }
  };

  const colors = getColors(variant);

  return (
    <View
      className={cn('relative items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <Svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}
      >
        {/* Background circle */}
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke={colors.background}
          strokeWidth={strokeWidth / 4} // Thinner background
          fill="transparent"
          opacity={0.1}
        />
        {/* Progress circle */}
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke={colors.progress}
          strokeWidth={strokeWidth / 4}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View className="absolute z-10 items-center justify-center">
        {children}
      </View>
    </View>
  );
};
