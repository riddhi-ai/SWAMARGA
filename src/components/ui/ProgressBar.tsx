import React from 'react'

export interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  sublabel?: string
  tone?: 'default' | 'green' | 'orange'
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  sublabel,
  tone = 'default',
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100)

  const toneColor = {
    default: 'bg-(--navy)',
    green: 'bg-[#3e9b45]',
    orange: 'bg-(--orange)',
  }[tone]

  return (
    <div className={`w-full ${className}`}>
      {(label || sublabel) && (
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium text-[#2d3748]">
          <span>{label}</span>
          <span>{sublabel || `${percentage}%`}</span>
        </div>
      )}
      <div
        className="w-full bg-[#eef1f3] rounded-full h-2 overflow-hidden border border-[#d9dde1]"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${toneColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}


