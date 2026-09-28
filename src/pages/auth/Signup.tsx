import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/Button'
import { UserRole } from '../../types'
import { ArrowRight } from 'lucide-react'

export const Signup: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [role, setRole] = useState<UserRole>('candidate')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/verify-email')
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-[#eef1f3] pb-3 text-center">
        <h1 className="text-xl font-bold text-(--navy) m-0">Create Registration</h1>
        <p className="text-xs text-[#5a6578] mt-1 mb-0">
          Join the SWAMARGA workforce network
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label htmlFor="signup-role" className="block text-xs font-bold text-[#202124] mb-1">
            I am registering as:
          </label>
          <select
            id="signup-role"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-white"
          >
            <option value="candidate">Candidate / Technical Jobseeker</option>
            <option value="institute">Vocational Institute / College</option>
            <option value="employer">Employer / Corporate Partner</option>
            <option value="government">Government Department Official</option>
          </select>
        </div>

        <div>
          <label htmlFor="fullname" className="block text-xs font-bold text-[#202124] mb-1">
            Full Name / Contact Authority
          </label>
          <input
            id="fullname"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g. Riddhi Naskari"
            className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-white"
          />
        </div>

        <div>
          <label htmlFor="signup-email" className="block text-xs font-bold text-[#202124] mb-1">
            Official Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-white"
          />
        </div>

        <Button
          type="submit"
          variant="orange"
          className="w-full mt-2"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Proceed to Email Verification
        </Button>
      </form>

      <div className="pt-2 text-center text-xs text-[#5a6578]">
        Already registered?{' '}
        <Link to="/login" className="font-bold text-(--navy) hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  )
}
export default Signup


