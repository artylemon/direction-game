import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'time-option';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  selected?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600 border-transparent',
  secondary: 'bg-white text-gray-600 border-gray-200 hover:border-blue-300',
  success: 'bg-green-500 text-white hover:bg-green-600 border-transparent shadow-lg',
  'time-option': 'border-2 transition-colors',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-4 py-2 text-lg',
  lg: 'px-8 py-4 text-xl',
  xl: 'px-12 py-6 text-2xl',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  selected = false,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = 'rounded-lg font-bold transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed';
  
  const selectedStyles = selected
    ? 'bg-blue-500 text-white border-blue-600'
    : '';

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        variant === 'time-option' && selectedStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
