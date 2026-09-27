import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'orange' | 'outline' | 'text' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded transition-colors focus:outline-none cursor-pointer'

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  }[size]

  const variantClasses = {
    primary: 'bg-[var(--navy)] text-white hover:bg-[#122540] border border-transparent shadow-xs',
    secondary: 'bg-white text-[var(--navy)] hover:bg-[#f1f5f9] border border-[#b5bcc4]',
    orange: 'bg-[var(--orange)] text-white hover:bg-[var(--orange-dark)] border border-transparent shadow-xs',
    outline: 'bg-transparent text-[#202124] hover:bg-[#f1f3f5] border border-[#d9dde1]',
    text: 'bg-transparent text-[var(--navy)] hover:underline p-0 border-0',
    danger: 'bg-[#d9383a] text-white hover:bg-[#b52a2c] border border-transparent',
  }[variant]

  const disabledClasses = disabled || isLoading ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  )
}
