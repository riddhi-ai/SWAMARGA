import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  to?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-xs text-[#5a6578] mb-4 overflow-x-auto py-1" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1.5 whitespace-nowrap">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-[#5a6578] hover:text-(--navy) transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="inline-flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-[#a0aec0] mx-1 shrink-0" aria-hidden="true" />
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="text-[#5a6578] hover:text-(--navy) transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#202124] font-semibold" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}


