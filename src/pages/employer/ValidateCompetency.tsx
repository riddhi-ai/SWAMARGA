import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Alert } from '../../components/ui/Alert'
import { Button } from '../../components/ui/Button'
import { CheckCircle2, ShieldCheck, ArrowLeft, Send, AlertTriangle } from 'lucide-react'

export const ValidateCompetency: React.FC = () => {
  const { t } = useTranslation()
  const [validated, setValidated] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleValidate = () => {
    setValidated(true)
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Employer Overview', to: '/employer' },
          { label: t('nav.validate') },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d9dde1] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-(--navy) m-0">Validate Candidate Evidence</h1>
          <p className="text-sm text-[#5a6578] mt-1 mb-0">
            Review submitted diagnostic logs and issue official employer attestation.
          </p>
        </div>

        <Link to="/employer" className="gov-btn gov-btn-secondary gov-btn-sm">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Queue
        </Link>
      </div>

      {validated && (
        <Alert variant="success" title="Employer Attestation Issued">
          Attestation successfully registered for <strong>Riddhi Naskari</strong> under <strong>AWS Cloud Routing</strong>. The candidate's Competency Passport has been updated with your company signature.
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Submitted Practical Deliverables">
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#f8fafc] border border-[#d9dde1] rounded">
                <span className="font-bold text-[#5a6578] block mb-1">Task Context:</span>
                <span className="text-sm font-bold text-(--navy) block">
                  Troubleshoot a Cloud VPC Route Table Connectivity Failure
                </span>
                <span className="text-[#5a6578]">Candidate: Riddhi Naskari (Cloud Support Associate)</span>
              </div>

              <div>
                <label className="font-bold text-[#202124] block mb-1">
                  Submitted Terminal Output & Diagnosis Methodology:
                </label>
                <pre className="p-3 bg-[#202124] text-[#a0aec0] font-mono rounded overflow-x-auto text-[11px] leading-relaxed">
{`$ aws ec2 describe-route-tables --route-table-ids rtb-09a8b7c6d5e4
DestinationCidrBlock: 10.0.0.0/16 -> Target: local
DestinationPrefixListId: pl-63a5400a (s3) -> Target: vpce-0123456789abcdef0 [MISSING]

Root Cause: Private subnet route table lacked prefix-list association for com.amazonaws.ap-south-1.s3.
Remediation: Executed aws ec2 create-route --route-table-id rtb-09a8b7c6d5e4 --destination-prefix-list-id pl-63a5400a --gateway-id vpce-0123456789abcdef0.
Verification: curl -I https://s3.ap-south-1.amazonaws.com returned HTTP/1.1 200 OK.`}
                </pre>
              </div>

              <div className="p-3 bg-[#eff9f0] border border-[#c2e5c6] rounded flex items-center justify-between">
                <div>
                  <strong className="text-[#2e7a34] block">System Automated Score</strong>
                  <span className="text-[#5a6578]">Automated syntax and log verification passed.</span>
                </div>
                <span className="text-lg font-bold text-[#2e7a34]">90 / 100</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Employer Attestation Actions">
            <div className="space-y-4 text-xs">
              <div>
                <label htmlFor="evalNotes" className="font-bold text-[#202124] block mb-1">
                  Employer Review Comments (Optional):
                </label>
                <textarea
                  id="evalNotes"
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="E.g. Clean isolation of VPC prefix list routing issue. Ready for Tier-2 cloud support interview."
                  className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-[#f8fafc]"
                />
              </div>

              <Button
                variant="orange"
                className="w-full"
                disabled={validated}
                onClick={handleValidate}
                leftIcon={<ShieldCheck className="w-4 h-4" />}
              >
                {validated ? 'Attestation Recorded' : 'Issue Employer Attestation'}
              </Button>

              <button
                type="button"
                onClick={() => alert('Additional proof requested from candidate.')}
                className="gov-btn gov-btn-secondary w-full text-xs"
              >
                Request Additional Proof
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default ValidateCompetency


