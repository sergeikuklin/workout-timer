import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground active:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground active:bg-destructive/90',
        outline:
          'border border-input bg-background active:bg-accent active:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground active:bg-secondary/80',
        ghost: 'active:bg-accent active:text-accent-foreground',
        link: 'text-primary underline-offset-4 active:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

const ShadcnButton = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ButtonProps
>(({ className, variant, size, children, ...props }, ref) => {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-center font-medium text-current">{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
});
ShadcnButton.displayName = 'ShadcnButton';

export { ShadcnButton, buttonVariants };
