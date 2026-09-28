import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Mail, CheckCircle2 } from 'lucide-react'

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate()
  const [code, setCode] = useState('')

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/candidate')
  }

  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-[#eff9f0] border border-[#c2e5c6] flex items-center justify-center text-[#2e7a34]">
        <Mail className="w-6 h-6" />
      </div>

      <div>
        <h1 className="text-xl font-bold text-(--navy) m-0">Verify Email Address</h1>
        <p className="text-xs text-[#5a6578] mt-1.5 leading-relaxed">
          We have dispatched a 6-digit verification code to your registered email address.
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label htmlFor="otp" className="sr-only">Verification Code</label>
          <input
            id="otp"
            type="text"
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            className="w-48 mx-auto text-center tracking-widest text-lg font-mono font-bold p-2.5 border border-[#d9dde1] rounded bg-[#f8fafc]"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Confirm Verification & Open Workspace
        </Button>
      </form>

      <div className="text-xs text-[#5a6578]">
        Didn't receive code?{' '}
        <button
          type="button"
          onClick={() => alert('Verification code re-sent.')}
          className="text-(--navy) font-bold hover:underline bg-transparent border-0 cursor-pointer p-0"
        >
          Resend code
        </button>
      </div>
    </div>
  )
}
export default VerifyEmail


