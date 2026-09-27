import React from 'react'
import { CheckCircle2, AlertCircle, XCircle, Clock, Info } from 'lucide-react'

export interface BadgeProps {
  variant?: 'verified' | 'evidenceGap' | 'skillGap' | 'pending' | 'neutral' | 'high' | 'medium' | 'low'
  children: React.ReactNode
  showIcon?: boolean
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  showIcon = true,
  className = '',
}) => {
  const styles = {
    verified: 'bg-[#eff9f0] text-[#2e7a34] border-[#c2e5c6]',
    evidenceGap: 'bg-(--orange-light) text-(--orange-dark) border-[#ffd5b8]',
    skillGap: 'bg-[#fdf2f2] text-[#d9383a] border-[#fecaca]',
    pending: 'bg-[#fffbeb] text-[#b45309] border-[#fde68a]',
    neutral: 'bg-[#eef2f7] text-(--navy) border-[#d4e0ee]',
    high: 'bg-[#fdf2f2] text-[#991b1b] border-[#fecaca]',
    medium: 'bg-[#fffbeb] text-[#92400e] border-[#fde68a]',
    low: 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]',
  }[variant]

  const renderIcon = () => {
    if (!showIcon) return null
    switch (variant) {
      case 'verified':
        return <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      case 'evidenceGap':
        return <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      case 'skillGap':
        return <XCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      case 'pending':
        return <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      default:
        return <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded border ${styles} ${className}`}
    >
      {renderIcon()}
      <span>{children}</span>
    </span>
  )
}


