import React from 'react'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table, Column } from '../../components/ui/Table'

export interface InstituteGenericPageProps {
  title: string
  subtitle: string
  columns: Column<any>[]
  data: any[]
  alertNote?: string
}

export const InstituteGenericPage: React.FC<InstituteGenericPageProps> = ({
  title,
  subtitle,
  columns,
  data,
  alertNote,
}) => {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Institute Overview', to: '/institute' },
          { label: title },
        ]}
      />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-2xl font-bold text-(--navy) m-0">{title}</h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0">{subtitle}</p>
      </div>

      {alertNote && (
        <div className="p-3.5 bg-[#f8fafc] border border-[#d9dde1] rounded text-xs text-[#5a6578]">
          <strong className="text-(--navy) block mb-0.5">Planning Context:</strong>
          {alertNote}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex-1 w-full max-w-sm relative">
          <input 
            type="text" 
            placeholder="Search records..." 
            className="w-full pl-3 pr-10 py-2 bg-white border border-[#cbd5e1] rounded text-sm focus:border-(--navy) focus:ring-1 focus:ring-(--navy)"
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

      <Card title="Operational Records" subtitle="Sourced from administration registry. Immutable entries.">
        <Table
          columns={columns}
          data={data}
          keyExtractor={(_, idx) => idx}
          caption={`${title} operational records table`}
        />
      </Card>
    </div>
  )
}
export default InstituteGenericPage


