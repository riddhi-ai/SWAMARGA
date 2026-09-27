import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/Button'
import { UserRole } from '../../types'
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react'

export const Login: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [role, setRole] = useState<UserRole>('candidate')
  const [email, setEmail] = useState('riddhi.demo@swamarga.local')
  const [password, setPassword] = useState('••••••••')

  const handleQuickSelect = (selectedRole: UserRole, defaultEmail: string) => {
    setRole(selectedRole)
    setEmail(defaultEmail)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/${role}`)
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-[#eef1f3] pb-3 text-center">
        <h1 className="text-xl font-bold text-[var(--navy)] m-0">Sign in to SWAMARGA</h1>
        <p className="text-xs text-[#5a6578] mt-1 mb-0">
          Access your personalized workforce workspace
        </p>
      </div>

      {/* Quick Role Tester Pills */}
      <div className="p-3 bg-[#f8fafc] border border-[#d9dde1] rounded text-xs">
        <span className="font-bold text-[#5a6578] block mb-2 uppercase tracking-wider text-[10px]">
          Demo Quick Sign In:
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => handleQuickSelect('candidate', 'riddhi.demo@swamarga.local')}
            className={`p-1.5 rounded text-left border cursor-pointer font-semibold ${
              role === 'candidate' ? 'bg-[var(--navy)] text-white border-[var(--navy)]' : 'bg-white border-[#d9dde1] text-[#2d3748]'
            }`}
          >
            Candidate (Riddhi)
          </button>
          <button
            type="button"
            onClick={() => handleQuickSelect('institute', 'admin@polytechnic.ac.in')}
            className={`p-1.5 rounded text-left border cursor-pointer font-semibold ${
              role === 'institute' ? 'bg-[var(--navy)] text-white border-[var(--navy)]' : 'bg-white border-[#d9dde1] text-[#2d3748]'
            }`}
          >
            Training Institute
          </button>
          <button
            type="button"
            onClick={() => handleQuickSelect('employer', 'recruiting@techcloud.in')}
            className={`p-1.5 rounded text-left border cursor-pointer font-semibold ${
              role === 'employer' ? 'bg-[var(--navy)] text-white border-[var(--navy)]' : 'bg-white border-[#d9dde1] text-[#2d3748]'
            }`}
          >
            Employer Partner
          </button>
          <button
            type="button"
            onClick={() => handleQuickSelect('government', 'planner@dvet.gov.in')}
            className={`p-1.5 rounded text-left border cursor-pointer font-semibold ${
              role === 'government' ? 'bg-[var(--navy)] text-white border-[var(--navy)]' : 'bg-white border-[#d9dde1] text-[#2d3748]'
            }`}
          >
            State Government
          </button>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="role" className="block text-xs font-bold text-[#202124] mb-1">
            Selected Workspace
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-white"
          >
            <option value="candidate">Candidate Portal</option>
            <option value="institute">Training Institute Workspace</option>
            <option value="employer">Employer Validation Workspace</option>
            <option value="government">Government Intelligence Portal</option>
            <option value="admin">Platform Administration</option>
          </select>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold text-[#202124] mb-1">
            Registered Email / Identifier
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-white"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-bold text-[#202124] mb-1">
            Password / Passkey
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-white"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-2"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Sign In to Workspace
        </Button>
      </form>

      <div className="pt-2 text-center text-xs text-[#5a6578]">
        Don't have an account?{' '}
        <Link to="/signup" className="font-bold text-[var(--navy)] hover:underline">
          Create registration
        </Link>
      </div>
    </div>
  )
}
export default Login
