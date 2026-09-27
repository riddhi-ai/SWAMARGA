import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table, Column } from '../../components/ui/Table'
import { DEMO_DISTRICTS } from '../../services/mockData'
import { DistrictMetric } from '../../types'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { ShieldCheck } from 'lucide-react'

export const DistrictIntelligence: React.FC = () => {
  const { t } = useTranslation()
  const [districts] = useState<DistrictMetric[]>(DEMO_DISTRICTS)

  const chartData = districts.map((d) => ({
    name: d.district,
    Demand: d.targetRoleDemand,
    Trainees: d.activeTrainees,
  }))

  const columns: Column<DistrictMetric>[] = [
    {
      header: 'District Cluster',
      accessor: (row) => <strong className="text-[var(--navy)]">{row.district}</strong>,
    },
    {
      header: 'Recruiter Demand',
      accessor: (row) => <span className="font-mono text-xs font-bold text-[#202124]">{row.targetRoleDemand}</span>,
    },
    {
      header: 'Active Trainees',
      accessor: (row) => <span className="font-mono text-xs text-[#5a6578]">{row.activeTrainees}</span>,
    },
    {
      header: 'Instructors Available',
      accessor: (row) => <span className="font-mono text-xs text-[#5a6578]">{row.certifiedTrainers}</span>,
    },
    {
      header: 'Net Deficit',
      accessor: (row) => (
        <span className="font-mono text-xs font-bold text-[#d9383a]">
          -{row.capacityDeficit}
        </span>
      ),
    },
    {
      header: 'State Intervention Priority',
      accessor: (row) => {
        if (row.mismatchLevel === 'High') return <Badge variant="skillGap">Immediate Expansion</Badge>
        if (row.mismatchLevel === 'Moderate') return <Badge variant="evidenceGap">Curriculum Focus</Badge>
        return <Badge variant="verified">Sufficient</Badge>
      },
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Government Overview', to: '/government' },
          { label: t('nav.districtIntelligence') },
        ]}
      />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-2xl font-bold text-[var(--navy)] m-0">District Intelligence & Capacity Mapping</h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0">
          Comparing industry demand with certified vocational capacity across Maharashtra's key urban and industrial centers.
        </p>
      </div>

      <div className="p-3 bg-[var(--orange-light)] border border-[#ffd5b8] rounded text-xs text-[var(--orange-dark)] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>Demonstration prototype figures. District numbers serve as illustrative modeling inputs for planning agencies.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Demand vs. Training Intake by District"
          subtitle="Annual role requisitions compared against current institute enrollment"
        >
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d9dde1', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="Demand" name="Annual Industry Demand" fill="var(--navy)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Trainees" name="Active Trainees Enrolled" fill="var(--orange)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-[#5a6578] mt-3 m-0 italic">
            * Interpretation: Pune and Mumbai Suburban show severe absolute deficits exceeding 1,200 candidates annually, whereas Nashik demonstrates near parity between enrollment and local demand.
          </p>
        </Card>

        <Card
          title="District Tabular Allocation Matrix"
          subtitle="Prioritization status for trainer allocation and lab infrastructure grants"
        >
          <Table
            columns={columns}
            data={districts}
            keyExtractor={(row) => row.district}
            caption="District intelligence matrix"
          />
        </Card>
      </div>
    </div>
  )
}
export default DistrictIntelligence
