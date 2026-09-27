import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
  variant?: 'default' | 'bordered' | 'muted'
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantClass = {
    default: 'bg-white border border-[#d9dde1] shadow-xs',
    bordered: 'bg-white border-2 border-(--navy)',
    muted: 'bg-[#f7f8f5] border border-[#d9dde1]',
  }[variant]

  return (
    <div className={`rounded p-5 ${variantClass} ${className}`} {...props}>
      {(title || subtitle || action) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-4 border-b border-[#eef1f3] gap-2">
          <div>
            {title && <h3 className="text-base font-bold text-[#202124] tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-[#5a6578] mt-0.5 mb-0">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}


