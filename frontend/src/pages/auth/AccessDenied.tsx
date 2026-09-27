import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ShieldAlert, ArrowLeft } from 'lucide-react'

export const AccessDenied: React.FC = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-[#fdf2f2] border border-[#fecaca] flex items-center justify-center text-[#d9383a]">
        <ShieldAlert className="w-6 h-6" />
      </div>

      <div>
        <h1 className="text-xl font-bold text-[var(--navy)] m-0">Access Restricted</h1>
        <p className="text-xs text-[#5a6578] mt-1.5 leading-relaxed">
          Your current user credentials do not have administrative authorization for the requested workspace section.
        </p>
      </div>

      <div className="p-3 bg-[#f8fafc] border border-[#d9dde1] rounded text-xs text-[#5a6578] text-left">
        <strong className="text-[#202124] block mb-1">To request clearance:</strong>
        Contact your institution coordinator or submit a verification ticket to the state platform administrator.
      </div>

      <div className="pt-2">
        <Link to="/login" className="gov-btn gov-btn-primary w-full text-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Return to Sign In
        </Link>
      </div>
    </div>
  )
}
export default AccessDenied
