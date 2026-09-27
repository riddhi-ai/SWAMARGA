import React from 'react'

export interface TabItem {
  id: string
  label: string
  count?: number
}

export interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`border-b border-[#d9dde1] mb-5 ${className}`}>
      <nav className="flex space-x-6 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`py-3 px-1 border-b-2 font-semibold text-sm whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'border-[var(--navy)] text-[var(--navy)]'
                  : 'border-transparent text-[#5a6578] hover:text-[#202124] hover:border-[#b5bcc4]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-[var(--navy)] text-white' : 'bg-[#eef1f3] text-[#5a6578]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
