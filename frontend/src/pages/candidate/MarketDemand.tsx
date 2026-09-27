import React from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Table, Column } from '../../components/ui/Table'
import { Badge } from '../../components/ui/Badge'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface DemandRow {
  skill: string
  demandLevel: 'High' | 'Medium'
  jobShare: string
  whyItMatters: string
}

export const MarketDemand: React.FC = () => {
  const { t } = useTranslation()

  const demandRows: DemandRow[] = [
    { skill: 'Linux', demandLevel: 'High', jobShare: '92%', whyItMatters: 'Primary OS layer for production server infrastructure and cloud instances' },
    { skill: 'Troubleshooting', demandLevel: 'High', jobShare: '88%', whyItMatters: 'Incident resolution speed and root-cause analysis in support SLA agreements' },
    { skill: 'AWS', demandLevel: 'High', jobShare: '84%', whyItMatters: 'Public cloud management, VPC networking, EC2, and IAM policies' },
    { skill: 'Networking', demandLevel: 'High', jobShare: '76%', whyItMatters: 'DNS, TCP/IP, CIDR blocks, security groups, and gateway diagnostics' },
    { skill: 'Docker', demandLevel: 'Medium', jobShare: '54%', whyItMatters: 'Containerized microservice debugging and deployment pipelines' },
  ]

  const chartData = [
    { name: 'Linux', percentage: 92 },
    { name: 'Troubleshooting', percentage: 88 },
    { name: 'AWS', percentage: 84 },
    { name: 'Networking', percentage: 76 },
    { name: 'Docker', percentage: 54 },
  ]

  const columns: Column<DemandRow>[] = [
    {
      header: 'Skill Requirement',
      accessor: (row) => <strong className="text-[var(--navy)]">{row.skill}</strong>,
    },
    {
      header: 'Market Signal',
      accessor: (row) => (
        <Badge variant={row.demandLevel === 'High' ? 'high' : 'medium'} showIcon={false}>
          {row.demandLevel} Demand
        </Badge>
      ),
    },
    {
      header: 'Frequency in Postings',
      accessor: (row) => <span className="font-mono font-bold text-[#202124]">{row.jobShare}</span>,
    },
    {
      header: 'Operational Context',
      accessor: (row) => <span className="text-xs text-[#5a6578]">{row.whyItMatters}</span>,
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: t('nav.overview'), to: '/candidate' },
          { label: t('nav.marketDemand') },
        ]}
      />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-2xl font-bold text-[var(--navy)] m-0">{t('nav.marketDemand')}</h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0">
          Aggregated employer demand signals for Cloud Support Associate across Pune & Maharashtra.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Skill Demand Frequency"
          subtitle="Percentage of active regional cloud job postings requiring specific competencies"
        >
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis unit="%" tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip
                  formatter={(val) => [`${val}%`, 'Frequency in Postings']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d9dde1', fontSize: '12px' }}
                />
                <Bar dataKey="percentage" fill="var(--navy)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-[#5a6578] mt-3 m-0 italic">
            * Chart interpretation: Linux and Troubleshooting are non-negotiable fundamentals across 88%+ of postings, while AWS and Networking form the core cloud capability baseline.
          </p>
        </Card>

        <Card
          title="Industry Demand Matrix"
          subtitle="Contextual justification for each required technical skill"
        >
          <Table
            columns={columns}
            data={demandRows}
            keyExtractor={(row) => row.skill}
            caption="Market demand frequency and operational relevance"
          />
        </Card>
      </div>
    </div>
  )
}
export default MarketDemand
