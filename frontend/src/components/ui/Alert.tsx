import React from 'react'
import { Info, AlertTriangle, CheckCircle2, AlertCircle, X } from 'lucide-react'

export interface AlertProps {
  variant?: 'info' | 'warning' | 'success' | 'error'
  title?: string
  children: React.ReactNode
  onClose?: () => void
  className?: string
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const styles = {
    info: 'bg-[#eef2f7] text-(--navy) border-(--navy)/30',
    warning: 'bg-(--orange-light) text-(--orange-dark) border-(--orange)/40',
    success: 'bg-[#eff9f0] text-[#2e7a34] border-[#3e9b45]/40',
    error: 'bg-[#fdf2f2] text-[#d9383a] border-[#d9383a]/40',
  }[variant]

  const IconComponent = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle2,
    error: AlertCircle,
  }[variant]

  return (
    <div
      role="alert"
      className={`border-l-4 p-4 rounded-r text-sm border flex items-start justify-between gap-3 ${styles} ${className}`}
    >
      <div className="flex items-start gap-3">
        <IconComponent className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          {title && <h4 className="font-bold text-sm mb-1 text-inherit">{title}</h4>}
          <div className="text-inherit opacity-95">{children}</div>
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-inherit opacity-70 hover:opacity-100 p-1"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}


