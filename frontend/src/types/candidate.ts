export type Candidate = {
  id: number
  name: string
  email: string
  targetRole: string
  location: string
  readiness: number
}

export type SkillItem = {
  name: string
  category: string
  level: "Strong" | "Developing" | "Gap"
  evidenceStatus: "Verified" | "Unverified" | "Missing"
}

export type CandidateDashboardData = {
  candidate: Candidate
  skills: SkillItem[]
  skillGaps: string[]
  evidenceGaps: string[]
}
