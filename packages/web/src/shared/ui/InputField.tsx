import { forwardRef, InputHTMLAttributes } from 'react';
import { Input } from './Input';
import { cn } from '../lib/utils';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, helperText, className, ...inputProps }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-between">
          <span>{label}</span>
          {inputProps.required && (
            <span className="text-xs text-destructive">Required</span>
          )}
        </label>

        <Input
          {...inputProps}
          className={cn(
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          ref={ref}
        />

        {(error || helperText) && (
          <p
            className={`text-sm ${error ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
