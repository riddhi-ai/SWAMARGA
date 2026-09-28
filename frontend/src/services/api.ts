import axios from 'axios'
import type {
  Candidate,
  Job,
  ExperienceTask,
  SkillGapAnalysis,
  EvidenceGapAnalysis,
  CandidateTask,
} from '../types'
import {
  DEMO_CANDIDATE,
  DEMO_JOBS,
  DEMO_EXPERIENCE_TASKS,
} from './mockData'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiService = {

  // ============================================================
  // JOBS
  // ============================================================

  async getJobs(): Promise<Job[]> {
    const res = await apiClient.get('/jobs')

    return res.data.map((job: any): Job => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,

      skills:
        job.required_skills?.map((s: any) => s.name) ||
        [],

      matched_skills:
        job.matched_skills ||
        [],

      missing_skills:
        job.missing_skills ||
        [],

      missing_evidence:
        job.missing_evidence ||
        [],

      match_rationale:
        job.match_rationale ||
        'Skill requirements retrieved from SWAMARGA backend.',
    }))
  },

  // ============================================================
  // SINGLE CANDIDATE
  // ============================================================

  async getCandidate(id: number = 1): Promise<Candidate> {
    const res = await apiClient.get(`/candidates/${id}`)

    return {
      id: res.data.id,
      name: res.data.name,
      email: res.data.email,
      target_role: res.data.target_role,
      location: res.data.location,
      resume_text: res.data.bio,
    }
  },

  // ============================================================
  // SKILL GAP
  // ============================================================

  async getSkillGap(
    candidateId: number = 1,
    role: string = 'Cloud Support Associate'
  ): Promise<SkillGapAnalysis> {

    const res = await apiClient.get(
      `/candidates/${candidateId}/skill-gap`,
      {
        params: { role },
      }
    )

    return {
      candidate_id: candidateId,
      role: res.data.role,

      required_skills:
        res.data.required_skills || [],

      candidate_skills:
        res.data.matched_skills || [],

      matched_skills:
        res.data.matched_skills || [],

      skill_gap:
        res.data.skill_gap || [],
    }
  },

  // ============================================================
  // EVIDENCE GAP
  // ============================================================

  async getEvidenceGap(
    candidateId: number = 1,
    _role: string = 'Cloud Support Associate'
  ): Promise<EvidenceGapAnalysis> {

    const res = await apiClient.get(
      `/candidates/${candidateId}/evidence-gap`
    )

    const evidenceGap = res.data.evidence_gap || []

    const candidate = await apiClient.get(
      `/candidates/${candidateId}`
    )

    const candidateSkills =
      candidate.data.skills?.map((s: any) => s.name) || []

    const verifiedSkills =
      candidate.data.evidence
        ?.filter((e: any) => e.verified)
        ?.map((e: any) => e.skill) || []

    return {
      candidate_id: candidateId,

      required_skills: candidateSkills,

      verified_skills: verifiedSkills,

      evidence_gap:
        evidenceGap.map((item: any) =>
          typeof item === 'string'
            ? item
            : item.skill
        ),
    }
  },

  // ============================================================
  // EXPERIENCE TASKS
  // ============================================================

  async getTasks(): Promise<ExperienceTask[]> {

    const res = await apiClient.get('/tasks')

    return res.data.map((task: any): ExperienceTask => {

      const matched = DEMO_EXPERIENCE_TASKS.find(
        (t) =>
          t.id === task.id ||
          t.title === task.title
      )

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        role: task.role,
        skill: task.skill,
        skill_id: task.skill_id,

        difficulty:
          task.difficulty || 'Intermediate',

        estimated_minutes:
          task.estimated_minutes || 45,

        why_it_matters:
          matched?.why_it_matters ||
          'Validates workplace competency through practical evidence.',

        instructions:
          matched?.instructions ||
          [
            'Analyse the scenario.',
            'Perform the required technical steps.',
            'Document your diagnosis and solution.',
          ],

        expected_evidence:
          matched?.expected_evidence ||
          [
            'Execution evidence',
            'Diagnosis report',
          ],

        rubric:
          matched?.rubric ||
          [
            {
              criterion: 'Technical Correctness',
              weight: '100%',
            },
          ],
      }
    })
  },

  // ============================================================
  // RECOMMENDED EXPERIENCE BRIDGE TASKS
  // ============================================================

  async getRecommendedTasks(
    candidateId: number = 1,
    role: string = 'Cloud Support Associate'
  ): Promise<ExperienceTask[]> {

    const res = await apiClient.get(
      `/tasks/recommended/${candidateId}`,
      {
        params: { role },
      }
    )

    return (res.data.recommended_tasks || []).map(
      (task: any): ExperienceTask => ({
        id: task.task_id,
        title: task.title,
        description: task.description,
        role,
        skill: task.skill,
        difficulty:
          task.difficulty || 'Intermediate',
        estimated_minutes:
          task.estimated_minutes || 45,

        why_it_matters:
          task.reason === 'Evidence gap'
            ? `Build verified evidence for ${task.skill}.`
            : `Close the ${task.skill} skill gap.`,

        instructions: [
          'Complete the practical scenario.',
          'Document your approach.',
          'Submit the evidence for assessment.',
        ],

        expected_evidence: [
          'Task output',
          'Technical explanation',
          'Supporting evidence',
        ],

        rubric: [
          {
            criterion: 'Technical Correctness',
            weight: '50%',
          },
          {
            criterion: 'Task Completion',
            weight: '30%',
          },
          {
            criterion: 'Best Practices',
            weight: '20%',
          },
        ],
      })
    )
  },

  // ============================================================
  // ASSIGN TASK
  // ============================================================

  async assignTask(
    taskId: number,
    candidateId: number = 1
  ): Promise<CandidateTask> {

    const res = await apiClient.post(
      `/tasks/${taskId}/assign`,
      null,
      {
        params: {
          candidate_id: candidateId,
        },
      }
    )

    return {
      id: res.data.candidate_task_id,
      candidate_id: res.data.candidate_id,
      task_id: res.data.task_id,
      status: res.data.status,
    }
  },

  // ============================================================
  // SUBMIT TASK
  // ============================================================

  async submitTaskEvidence(
    candidateTaskId: number,
    payload: {
      submission_text: string
      submission_url?: string
      submission_notes?: string
    }
  ): Promise<{
    status: string
    message: string
    submission_id?: number
    evidence_id?: number
  }> {

    /*
     * Frontend passes candidateTaskId.
     *
     * Our backend currently expects the actual
     * ExperienceTask ID.
     *
     * The CandidateTask ID is normally also available
     * from assignTask(). For the current MVP we use
     * the candidate task's task_id when available.
     */

    const taskId = candidateTaskId

    const res = await apiClient.post(
      `/tasks/${taskId}/submit`,
      {
        candidate_id: 1,
        submission_text:
          payload.submission_text +
          (
            payload.submission_notes
              ? `\n\nNotes: ${payload.submission_notes}`
              : ''
          ),
        submission_url:
          payload.submission_url || '',
      }
    )

    return {
      status: res.data.status || 'submitted',

      message:
        'Evidence submitted successfully and queued for assessment.',

      submission_id:
        res.data.submission_id,

      evidence_id:
        res.data.evidence_id,
    }
  },

  // ============================================================
  // ASSESSMENT
  // ============================================================

  async assessSubmission(
    submissionId: number,
    score: number,
    feedback: string = ''
  ) {

    const res = await apiClient.post(
      `/submissions/${submissionId}/assess`,
      {
        score,
        accuracy_score: Math.round(score * 0.4),
        completion_score: Math.round(score * 0.3),
        best_practices_score: Math.round(score * 0.3),
        assessed_by: 2,
        feedback,
      }
    )

    return res.data
  },

  // ============================================================
  // EMPLOYER VALIDATION
  // ============================================================

  async validateEvidence(
    evidenceId: number,
    action: 'approve' | 'reject' | 'request_review',
    note: string = ''
  ) {

    const res = await apiClient.post(
      `/evidence/${evidenceId}/validate`,
      {
        action,
        employer_id: 2,
        note,
      }
    )

    return res.data
  },

  // ============================================================
  // COMPETENCY PASSPORT
  // ============================================================

  async getCompetencyPassport(
    candidateId: number = 1
  ) {

    const res = await apiClient.get(
      `/candidates/${candidateId}/passport`
    )

    return res.data
  },

  // ============================================================
  // ANALYTICS
  // ============================================================

  async getSkillGapAnalytics() {

    const res = await apiClient.get(
      '/analytics/skill-gaps'
    )

    return res.data
  },

  async getDemandAnalytics() {

    const res = await apiClient.get(
      '/analytics/demand'
    )

    return res.data
  },

  async getDistrictAnalytics() {

    const res = await apiClient.get(
      '/analytics/districts'
    )

    return res.data
  },

  // ============================================================
  // RECOMMENDATIONS
  // ============================================================

  async getRecommendations() {

    const res = await apiClient.get(
      '/recommendations'
    )

    return res.data
  },

  // ============================================================
  // LOGIN
  // ============================================================

  async login(
    email: string,
    password: string
  ) {

    const res = await apiClient.post(
      '/auth/login',
      {
        email,
        password,
      }
    )

    return res.data
  },
}