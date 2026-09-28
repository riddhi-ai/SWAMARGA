import React from 'react'

export interface MetricCardProps {
  label: string
  value: string | number
  context?: string
  subtext?: string
  tone?: 'default' | 'orange' | 'green' | 'red'
  badge?: string
  className?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  context,
  subtext,
  tone = 'default',
  badge,
  className = '',
}) => {
  const toneBorder = {
    default: 'border-l-4 border-l-(--navy)',
    orange: 'border-l-4 border-l-(--orange)',
    green: 'border-l-4 border-l-[#3e9b45]',
    red: 'border-l-4 border-l-[#d9383a]',
  }[tone]

  return (
    <div className={`gov-card ${toneBorder} flex flex-col justify-between ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-bold text-[#5a6578] uppercase tracking-wider">{label}</span>
        {badge && (
          <span className="text-[10px] font-semibold bg-[#eef1f3] text-[#2d3748] px-1.5 py-0.5 rounded">
            {badge}
          </span>
        )}
      </div>

      <div className="my-2.5">
        <span className="text-2xl font-bold text-[#202124] tracking-tight">{value}</span>
        {context && <span className="ml-2 text-xs font-semibold text-[#5a6578]">{context}</span>}
      </div>

      {subtext && <p className="text-xs text-[#5a6578] m-0 leading-normal">{subtext}</p>}
    </div>
  )
}


