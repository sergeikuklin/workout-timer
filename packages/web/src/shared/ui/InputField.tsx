import { forwardRef, InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, helperText, className, ...inputProps }, ref) => {
    return (
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-medium">{label}</span>
          {inputProps.required && (
            <span className="label-text-alt text-error">Required</span>
          )}
        </div>

        <input
          {...inputProps}
          className={`input input-bordered w-full focus:input-primary ${
            error ? 'input-error' : ''
          } ${className || ''}`}
          ref={ref}
        />

        {(error || helperText) && (
          <div className="label">
            <span
              className={`label-text-alt ${error ? 'text-error' : 'text-base-content/60'}`}
            >
              {error || helperText}
            </span>
          </div>
        )}
      </label>
    );
  }
);

InputField.displayName = 'InputField';
