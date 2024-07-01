import { forwardRef, InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, ...inputProps }, ref) => {
    return (
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>

        <input
          {...inputProps}
          className="input input-bordered w-full max-w-xs"
          ref={ref}
        />
      </label>
    );
  }
);
