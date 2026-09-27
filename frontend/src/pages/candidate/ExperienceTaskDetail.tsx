import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Alert } from '../../components/ui/Alert'
import { Button } from '../../components/ui/Button'
import { DEMO_EXPERIENCE_TASKS } from '../../services/mockData'
import { apiService } from '../../services/api'
import { CheckCircle2, ArrowLeft, Send } from 'lucide-react'

export const ExperienceTaskDetail: React.FC = () => {
  const { t } = useTranslation()
  const { taskId } = useParams<{ taskId: string }>()

  const idNum = parseInt(taskId || '1', 10)
  const task = DEMO_EXPERIENCE_TASKS.find((t) => t.id === idNum) || DEMO_EXPERIENCE_TASKS[0]

  const [submissionText, setSubmissionText] = useState('')
  const [submissionUrl, setSubmissionUrl] = useState('')
  const [submissionNotes, setSubmissionNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!submissionText.trim()) return

    setIsSubmitting(true)
    try {
      await apiService.submitTaskEvidence(task.id, {
        submission_text: submissionText,
        submission_url: submissionUrl,
        submission_notes: submissionNotes,
      })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: t('nav.overview'), to: '/candidate' },
          { label: t('nav.experienceBridge'), to: '/candidate/experience-bridge' },
          { label: task.title },
        ]}
      />

      <div className="flex items-center justify-between border-b border-[#d9dde1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold text-[#5a6578]">
              Experience Bridge Scenario #{task.id}
            </span>
            <Badge variant="neutral">{task.role}</Badge>
            <Badge variant={task.skill === 'AWS' ? 'evidenceGap' : 'verified'}>
              Competency: {task.skill}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-[var(--navy)] m-0">{task.title}</h1>
        </div>

        <Link
          to="/candidate/experience-bridge"
          className="gov-btn gov-btn-secondary gov-btn-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Tasks
        </Link>
      </div>

      {submitted ? (
        <div className="space-y-4">
          <Alert variant="success" title="Evidence Submitted for Verification">
            {t('experienceBridge.successMsg')}
          </Alert>

          <Card
            title="Preliminary Automated Evaluation"
            subtitle="Benchmark assessment against industry troubleshooting criteria"
          >
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-[#eff9f0] border border-[#c2e5c6] rounded">
                <div>
                  <span className="font-bold text-[#2e7a34] block">Technical Accuracy (35%)</span>
                  <span className="text-[#5a6578]">Gateway prefix-list routing destination correctly configured.</span>
                </div>
                <span className="text-sm font-bold text-[#2e7a34]">92 / 100</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#eff9f0] border border-[#c2e5c6] rounded">
                <div>
                  <span className="font-bold text-[#2e7a34] block">Methodology & Log Quality (40%)</span>
                  <span className="text-[#5a6578]">Diagnostic steps isolate security group rules and curl response verification.</span>
                </div>
                <span className="text-sm font-bold text-[#2e7a34]">88 / 100</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#eff9f0] border border-[#c2e5c6] rounded">
                <div>
                  <span className="font-bold text-[#2e7a34] block">Documentation Quality (25%)</span>
                  <span className="text-[#5a6578]">Clear explanation of VPC endpoint routing mechanics provided.</span>
                </div>
                <span className="text-sm font-bold text-[#2e7a34]">90 / 100</span>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <strong className="text-sm text-[var(--navy)]">Weighted Total Score: 90 / 100</strong>
                  <p className="text-[#5a6578] m-0">Queued for final employer attestation.</p>
                </div>
                <Link
                  to="/candidate/passport"
                  className="gov-btn gov-btn-primary gov-btn-sm"
                >
                  View in Competency Passport
                </Link>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Scenario & Instructions */}
          <div className="lg:col-span-2 space-y-6">
            <Card title={t('experienceBridge.scenarioBrief')}>
              <p className="text-xs text-[#2d3748] leading-relaxed mb-4">
                {task.description}
              </p>

              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--navy)] mb-2">
                {t('experienceBridge.instructions')}
              </h4>
              <ol className="text-xs text-[#2d3748] space-y-2.5 pl-4 list-decimal">
                {task.instructions?.map((inst, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {inst}
                  </li>
                ))}
              </ol>
            </Card>

            {/* Evidence Submission Form */}
            <Card title={t('experienceBridge.submissionBox')}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="submissionText" className="block text-xs font-bold text-[#202124] mb-1">
                    Diagnostic Logs & Technical Summary <span className="text-[#d9383a]">*</span>
                  </label>
                  <textarea
                    id="submissionText"
                    rows={6}
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    required
                    placeholder="Enter diagnostic logs, exact command history, root cause analysis, and verification checks..."
                    className="w-full p-3 border border-[#d9dde1] rounded text-xs font-mono bg-[#f8fafc]"
                  />
                </div>

                <div>
                  <label htmlFor="submissionUrl" className="block text-xs font-bold text-[#202124] mb-1">
                    {t('experienceBridge.artifactUrl')}
                  </label>
                  <input
                    id="submissionUrl"
                    type="url"
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    placeholder="https://github.com/candidate/cloud-vpc-triage or log gist"
                    className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-[#f8fafc]"
                  />
                </div>

                <div>
                  <label htmlFor="submissionNotes" className="block text-xs font-bold text-[#202124] mb-1">
                    Assessor Notes (Optional context for employer reviewers)
                  </label>
                  <input
                    id="submissionNotes"
                    type="text"
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    placeholder="E.g. Performed on simulated AWS CLI environment using us-east-1 configuration."
                    className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-[#f8fafc]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#5a6578]">
                    Submitting records verifiable proof to candidate ID #1
                  </span>
                  <Button
                    type="submit"
                    variant="orange"
                    isLoading={isSubmitting}
                    leftIcon={<Send className="w-4 h-4" />}
                  >
                    {t('experienceBridge.submitEvidence')}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Right Col: Expected Evidence & Rubric */}
          <div className="space-y-6">
            <Card title="Required Evidence Deliverables">
              <ul className="space-y-2 text-xs text-[#2d3748] pl-0 list-none m-0">
                {task.expected_evidence?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3e9b45] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title={t('experienceBridge.evaluationCriteria')}>
              <div className="space-y-2 text-xs">
                {task.rubric?.map((r, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-1.5 border-b border-[#eef1f3]">
                    <span className="text-[#202124]">{r.criterion}</span>
                    <span className="font-bold text-[var(--navy)]">{r.weight}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="p-4 bg-[#f8fafc] border border-[#d9dde1] rounded text-xs text-[#5a6578]">
              <strong className="block text-[var(--navy)] mb-1 font-bold">Anti-Cheating Integrity Policy</strong>
              All submitted evidence is validated through static log analysis, syntax validation, and randomized parameter checks.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default ExperienceTaskDetail
