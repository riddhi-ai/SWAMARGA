import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { MetricCard } from '../../components/ui/MetricCard'
import { Badge } from '../../components/ui/Badge'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Sliders, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react'

export const WhatIfSimulator: React.FC = () => {
  const { t } = useTranslation()

  // Base state
  const [seats, setSeats] = useState<number>(120)
  const [trainers, setTrainers] = useState<number>(4)
  const [labs, setLabs] = useState<number>(40)

  // Simulation calculations
  const trainerRatio = Math.round(seats / Math.max(trainers, 1))
  const labCapacityPerStudent = (labs / Math.max(seats, 1)).toFixed(2)

  // Quality factor: optimal trainer ratio is 1:20 (or less), optimal lab ratio is 0.4+
  const trainerQualityScore = Math.max(0, 100 - Math.max(0, trainerRatio - 20) * 3)
  const labQualityScore = Math.min(100, Math.round(parseFloat(labCapacityPerStudent) * 200))
  const predictedPlacementRate = Math.min(94, Math.max(30, Math.round((trainerQualityScore * 0.5) + (labQualityScore * 0.5))))
  const projectedJobReadyGrads = Math.round(seats * (predictedPlacementRate / 100))

  const comparisonData = [
    { metric: 'Current Baseline', jobReady: 78, placementRate: 65 },
    { metric: 'Simulated Model', jobReady: projectedJobReadyGrads, placementRate: predictedPlacementRate },
  ]

  const handleReset = () => {
    setSeats(120)
    setTrainers(4)
    setLabs(40)
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Institute Overview', to: '/institute' },
          { label: t('institute.simulatorTitle') },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d9dde1] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--navy)] m-0">{t('institute.simulatorTitle')}</h1>
          <p className="text-sm text-[#5a6578] mt-1 mb-0">{t('institute.simulatorDesc')}</p>
        </div>

        <button
          onClick={handleReset}
          className="gov-btn gov-btn-secondary gov-btn-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          Reset to Baseline
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Parameters */}
        <div className="space-y-6">
          <Card title="Capacity Levers & Inputs">
            <div className="space-y-5 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="seats-range" className="font-bold text-[#202124]">
                    {t('institute.seats')}: <span className="text-[var(--navy)] text-sm">{seats}</span>
                  </label>
                  <span className="text-[11px] text-[#5a6578]">Capacity: 60 - 300</span>
                </div>
                <input
                  id="seats-range"
                  type="range"
                  min="60"
                  max="300"
                  step="10"
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--navy)]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="trainers-range" className="font-bold text-[#202124]">
                    {t('institute.trainers')}: <span className="text-[var(--navy)] text-sm">{trainers}</span>
                  </label>
                  <span className="text-[11px] text-[#5a6578]">1:20 standard</span>
                </div>
                <input
                  id="trainers-range"
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={trainers}
                  onChange={(e) => setTrainers(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--navy)]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="labs-range" className="font-bold text-[#202124]">
                    {t('institute.labs')}: <span className="text-[var(--navy)] text-sm">{labs}</span>
                  </label>
                  <span className="text-[11px] text-[#5a6578]">Cloud Workstations</span>
                </div>
                <input
                  id="labs-range"
                  type="range"
                  min="20"
                  max="120"
                  step="5"
                  value={labs}
                  onChange={(e) => setLabs(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--navy)]"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#eef1f3] text-[11px] text-[#5a6578]">
              * What-If engine recalculates expected practical competency mastery based on lab access hours and instructor attention ratios.
            </div>
          </Card>

          <Card title="Bottleneck Risk Diagnosis">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#eef1f3]">
                <span className="text-[#5a6578]">Student-to-Trainer Ratio:</span>
                <span className={`font-bold ${trainerRatio > 25 ? 'text-[#d9383a]' : 'text-[#2e7a34]'}`}>
                  1 : {trainerRatio} {trainerRatio > 25 ? '(High Risk)' : '(Healthy)'}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-[#eef1f3]">
                <span className="text-[#5a6578]">Workstation Availability:</span>
                <span className={`font-bold ${parseFloat(labCapacityPerStudent) < 0.35 ? 'text-[#d9383a]' : 'text-[#2e7a34]'}`}>
                  {labCapacityPerStudent} PCs / Student
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 2 Columns: Projected Outcomes & Comparative Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label={t('institute.outputProjection')}
              value={projectedJobReadyGrads}
              context={`from ${seats} enrolled`}
              subtext="Qualified by Experience Bridge standards"
              tone="green"
            />
            <MetricCard
              label="Simulated Placement Rate"
              value={`${predictedPlacementRate}%`}
              context={predictedPlacementRate > 70 ? 'Optimal readiness' : 'Constrained by capacity'}
              subtext="Based on employer demand alignment"
              tone={predictedPlacementRate > 70 ? 'green' : 'orange'}
            />
          </div>

          <Card
            title="Baseline vs. Simulated Performance Projection"
            subtitle="Evaluating the impact of adjusted infrastructure on verified job readiness"
          >
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="metric" tick={{ fontSize: 12, fontWeight: 600 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d9dde1', fontSize: '12px' }}
                  />
                  <Bar dataKey="jobReady" name="Job-Ready Graduates" fill="var(--navy)" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="placementRate" name="Projected Placement Rate (%)" fill="var(--orange)" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-[#5a6578] mt-3 m-0 italic">
              * Chart interpretation: Increasing student intake without proportional trainer additions reduces the projected placement rate due to diminished lab instruction time.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default WhatIfSimulator
