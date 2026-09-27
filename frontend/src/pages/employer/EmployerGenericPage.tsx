import React from 'react'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Table, Column } from '../../components/ui/Table'

export interface EmployerGenericPageProps {
  title: string
  subtitle: string
  columns: Column<any>[]
  data: any[]
  contextNotice?: string
}

export const EmployerGenericPage: React.FC<EmployerGenericPageProps> = ({
  title,
  subtitle,
  columns,
  data,
  contextNotice,
}) => {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Employer Overview', to: '/employer' },
          { label: title },
        ]}
      />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-2xl font-bold text-[var(--navy)] m-0">{title}</h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0">{subtitle}</p>
      </div>

      {contextNotice && (
        <div className="p-3.5 bg-[#f8fafc] border border-[#d9dde1] rounded text-xs text-[#5a6578]">
          <strong className="text-[var(--navy)] block mb-0.5">Corporate Portal Notice:</strong>
          {contextNotice}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex-1 w-full max-w-sm relative">
          <input 
            type="text" 
            placeholder="Search records..." 
            className="w-full pl-3 pr-10 py-2 bg-white border border-[#cbd5e1] rounded text-sm focus:border-[var(--navy)] focus:ring-1 focus:ring-[var(--navy)]"
          />
          <svg className="w-4 h-4 text-[#94a3b8] absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="gov-btn gov-btn-secondary gov-btn-sm text-xs py-2">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Filter
          </button>
          <button className="gov-btn gov-btn-secondary gov-btn-sm text-xs py-2">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Export CSV
          </button>
        </div>
      </div>

      <Card title="Corporate Records & Frameworks" subtitle="Synchronized with Maharashtra state talent directory">
        <Table
          columns={columns}
          data={data}
          keyExtractor={(_, idx) => idx}
          caption={`${title} corporate records table`}
        />
      </Card>
    </div>
  )
}
export default EmployerGenericPage

