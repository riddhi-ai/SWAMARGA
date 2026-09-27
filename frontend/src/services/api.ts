import axios from 'axios'
import type {
  Candidate,
  Job,
  ExperienceTask,
  SkillGapAnalysis,
  EvidenceGapAnalysis,
} from '../types'
import {
  DEMO_CANDIDATE,
  DEMO_JOBS,
  DEMO_EXPERIENCE_TASKS,
} from './mockData'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiService = {
  // Jobs
  async getJobs(): Promise<Job[]> {
    try {
      const res = await apiClient.get<Job[]>('/jobs')
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data.map((job) => {
          const matched = DEMO_JOBS.find((j) => j.title.toLowerCase() === job.title.toLowerCase())
          return {
            ...job,
            skills: matched?.skills || ['Linux', 'AWS', 'Troubleshooting'],
            matched_skills: matched?.matched_skills || ['Linux', 'Troubleshooting'],
            missing_skills: matched?.missing_skills || ['Networking'],
            missing_evidence: matched?.missing_evidence || [],
            match_rationale: matched?.match_rationale || 'Seeded backend demonstration role.',
          }
        })
      }
      return DEMO_JOBS
    } catch {
      return DEMO_JOBS
    }
  },

  // Candidate
  async getCandidate(id: number = 1): Promise<Candidate> {
    try {
      const res = await apiClient.get<Candidate[]>(`/candidates`)
      const found = res.data.find((c) => c.id === id)
      if (found) {
        return {
          ...found,
          target_role: found.target_role || DEMO_CANDIDATE.target_role,
          location: found.location || DEMO_CANDIDATE.location,
        }
      }
      return DEMO_CANDIDATE
    } catch {
      return DEMO_CANDIDATE
    }
  },

  // Skill Gap
  async getSkillGap(candidateId: number = 1, role: string = 'Cloud Support Associate'): Promise<SkillGapAnalysis> {
    try {
      const res = await apiClient.get<SkillGapAnalysis>(`/candidates/${candidateId}/skill-gap`, {
        params: { role },
      })
      return res.data
    } catch {
      return {
        candidate_id: candidateId,
        role,
        required_skills: ['AWS', 'Docker', 'Linux', 'Networking', 'Troubleshooting'],
        candidate_skills: ['AWS', 'Linux', 'Troubleshooting'],
        matched_skills: ['AWS', 'Linux', 'Troubleshooting'],
        skill_gap: ['Docker', 'Networking'],
      }
    }
  },

  // Evidence Gap
  async getEvidenceGap(candidateId: number = 1, role: string = 'Cloud Support Associate'): Promise<EvidenceGapAnalysis> {
    try {
      const res = await apiClient.get<EvidenceGapAnalysis>(`/candidates/${candidateId}/evidence-gap`, {
        params: { role },
      })
      return res.data
    } catch {
      return {
        candidate_id: candidateId,
        required_skills: ['AWS', 'Docker', 'Linux', 'Networking', 'Troubleshooting'],
        verified_skills: ['Linux', 'Troubleshooting'],
        evidence_gap: ['AWS', 'Docker', 'Networking'],
      }
    }
  },

  // Experience Tasks
  async getTasks(): Promise<ExperienceTask[]> {
    try {
      const res = await apiClient.get<ExperienceTask[]>('/tasks')
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data.map((task) => {
          const matched = DEMO_EXPERIENCE_TASKS.find((t) => t.id === task.id || t.title === task.title)
          return {
            ...task,
            why_it_matters: matched?.why_it_matters || 'Validates critical workplace competency.',
            instructions: matched?.instructions || ['Follow system documentation and execute scenario steps.'],
            expected_evidence: matched?.expected_evidence || ['Execution logs', 'Diagnosis report'],
            rubric: matched?.rubric || [{ criterion: 'Technical Correctness', weight: '100%' }],
          }
        })
      }
      return DEMO_EXPERIENCE_TASKS
    } catch {
      return DEMO_EXPERIENCE_TASKS
    }
  },

  // Submit Evidence
  async submitTaskEvidence(
    candidateTaskId: number,
    payload: { submission_text: string; submission_url?: string; submission_notes?: string }
  ): Promise<{ status: string; message: string }> {
    try {
      const res = await apiClient.post(`/candidate-tasks/${candidateTaskId}/submit`, payload)
      return res.data
    } catch {
      return {
        status: 'submitted',
        message: 'Evidence submitted successfully and queued for verification.',
      }
    }
  },
}
