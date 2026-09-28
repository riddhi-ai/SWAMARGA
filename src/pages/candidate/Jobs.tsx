import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { apiService } from '../../services/api'
import { DEMO_JOBS } from '../../services/mockData'
import type { Job } from '../../types'
import { CheckCircle2, AlertTriangle, Building2, MapPin, Search } from 'lucide-react'

export const Jobs: React.FC = () => {
  const { t } = useTranslation()
  const [jobs, setJobs] = useState<Job[]>(DEMO_JOBS)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await apiService.getJobs()
        if (data && data.length > 0) setJobs(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: t('nav.overview'), to: '/candidate' },
          { label: t('nav.jobs') },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d9dde1] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-(--navy) m-0">
            {t('jobs.title')}
          </h1>
          <p className="text-sm text-[#5a6578] mt-1 mb-0">
            {t('jobs.subtitle')}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search roles or companies..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-[#d9dde1] rounded bg-white"
          />
          <Search className="w-3.5 h-3.5 text-[#a0aec0] absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-[#d9dde1] rounded p-5 shadow-xs hover:border-(--navy) transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div>
                  <h3 className="text-base font-bold text-(--navy) m-0">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#5a6578] mt-1">
                    <span className="flex items-center gap-1 font-semibold text-[#202124]">
                      <Building2 className="w-3.5 h-3.5" />
                      {job.company}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#2d3748] leading-relaxed">
                  {job.description}
                </p>

                {/* Evidence Alignment Breakdown */}
                <div className="pt-2 border-t border-[#eef1f3] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2e7a34] flex items-center gap-1 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t('jobs.matchedSkills')}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.matched_skills?.map((s) => (
                        <span
                          key={s}
                          className="bg-[#eff9f0] text-[#2e7a34] px-2 py-0.5 rounded text-[11px] font-medium border border-[#c2e5c6]"
                        >
                          {s} (Verified)
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-(--orange-dark) flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {t('jobs.missingEvidence')}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.missing_evidence && job.missing_evidence.length > 0 ? (
                        job.missing_evidence.map((s) => (
                          <span
                            key={s}
                            className="bg-(--orange-light) text-(--orange-dark) px-2 py-0.5 rounded text-[11px] font-medium border border-[#ffd5b8]"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-[#5a6578] italic">
                          No missing evidence barriers.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Match Explanation */}
                <div className="p-2.5 bg-[#f8fafc] border border-[#eef1f3] rounded text-xs text-[#5a6578]">
                  <strong className="text-(--navy)">Match Explanation: </strong>
                  {job.match_rationale}
                </div>
              </div>

              {/* Actions */}
              <div className="shrink-0 flex sm:flex-col items-center sm:items-stretch gap-2">
                <Link
                  to={`/candidate/jobs/${job.id}`}
                  className="gov-btn gov-btn-secondary gov-btn-sm text-center"
                >
                  View Role Details
                </Link>
                {job.missing_evidence && job.missing_evidence.length > 0 ? (
                  <Link
                    to="/candidate/experience-bridge/2"
                    className="gov-btn gov-btn-primary gov-btn-sm text-center"
                  >
                    {t('jobs.bridgeFirst')}
                  </Link>
                ) : (
                  <Link
                    to={`/candidate/jobs/${job.id}`}
                    className="gov-btn gov-btn-primary gov-btn-sm text-center"
                  >
                    {t('jobs.applyNow')}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Jobs


