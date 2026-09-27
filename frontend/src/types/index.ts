export type UserRole = 'candidate' | 'institute' | 'employer' | 'government' | 'admin'

export interface Skill {
  id: number
  name: string
}

export interface Candidate {
  id: number
  name: string
  email: string
  target_role?: string
  location?: string
  resume_text?: string
}

export interface CandidateSkill {
  id: number
  candidate_id: number
  skill_id: number
  skill?: Skill
}

export interface CandidateEvidence {
  id: number
  candidate_id: number
  skill_id: number
  skill_name?: string
  evidence_type: string
  description?: string
  verified: boolean
  score?: number | null
}

export interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
  skills?: string[]
  matched_skills?: string[]
  missing_skills?: string[]
  missing_evidence?: string[]
  match_rationale?: string
}

export interface ExperienceTask {
  id: number
  title: string
  description: string
  role: string
  skill: string
  skill_id?: number
  task_type?: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimated_minutes: number
  why_it_matters?: string
  instructions?: string[]
  expected_evidence?: string[]
  rubric?: { criterion: string; weight: string }[]
}

export interface CandidateTask {
  id: number
  candidate_id: number
  task_id: number
  status: 'assigned' | 'in_progress' | 'submitted' | 'assessed'
  task?: ExperienceTask
  submission?: {
    id: number
    submission_text: string
    submission_url?: string
    submission_notes?: string
    submitted_at: string
  } | null
  assessment?: {
    technical_score: number
    process_score: number
    troubleshooting_score: number
    explanation_score: number
    total_score: number
    assessment_status: 'passed' | 'review_required'
    assessor_notes?: string
  } | null
}

export interface SkillGapAnalysis {
  candidate_id: number
  role: string
  required_skills: string[]
  candidate_skills: string[]
  matched_skills: string[]
  skill_gap: string[]
}

export interface EvidenceGapAnalysis {
  candidate_id: number
  required_skills: string[]
  verified_skills: string[]
  evidence_gap: string[]
}

export interface CompetencyStatusRow {
  skill: string
  marketDemand: 'High' | 'Medium' | 'Low'
  skillStatus: 'Demonstrated' | 'Skill Gap'
  evidenceStatus: 'Verified' | 'Evidence Gap' | 'Not Demonstrated'
  score?: number | null
  evidenceType?: string
  recommendedAction: string
  actionUrl: string
}

export interface CourseHealthRecord {
  id: number
  courseName: string
  sector: string
  enrolledStudents: number
  placementRate: number
  marketAlignment: 'Optimal' | 'Review Required' | 'Declining'
  topMissingSkill: string
  action: string
}

export interface WhatIfParameters {
  seats: number
  trainers: number
  labs: number
  budgetMultiplier: number
}

export interface DistrictMetric {
  district: string
  targetRoleDemand: number
  activeTrainees: number
  certifiedTrainers: number
  capacityDeficit: number
  mismatchLevel: 'High' | 'Moderate' | 'Balanced'
}
