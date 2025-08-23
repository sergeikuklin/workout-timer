import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  icon,
  disabled,
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return disabled ? 'bg-blue-300' : 'bg-blue-500 active:bg-blue-600';
      case 'secondary':
        return disabled ? 'bg-gray-200' : 'bg-gray-200 active:bg-gray-300';
      case 'success':
        return disabled ? 'bg-green-300' : 'bg-green-500 active:bg-green-600';
      case 'danger':
        return disabled ? 'bg-red-300' : 'bg-red-500 active:bg-red-600';
      default:
        return 'bg-blue-500 active:bg-blue-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2';
      case 'medium':
        return 'px-6 py-3';
      case 'large':
        return 'px-8 py-4';
      default:
        return 'px-6 py-3';
    }
  };

  const getTextClasses = () => {
    const baseClasses = 'text-center font-semibold';
    const colorClasses =
      variant === 'secondary' ? 'text-gray-700' : 'text-white';

    switch (size) {
      case 'small':
        return `${baseClasses} ${colorClasses} text-sm`;
      case 'medium':
        return `${baseClasses} ${colorClasses} text-base`;
      case 'large':
        return `${baseClasses} ${colorClasses} text-lg`;
      default:
        return `${baseClasses} ${colorClasses} text-base`;
    }
  };

  return (
    <TouchableOpacity
      className={`rounded-xl shadow-sm ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      disabled={disabled}
      {...props}
    >
      <Text className={getTextClasses()}>
        {icon && `${icon} `}
        {title}
      </Text>
    </TouchableOpacity>
  );
};
