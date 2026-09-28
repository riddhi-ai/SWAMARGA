from datetime import datetime
from typing import Optional
import os

from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func

from .database import Base, engine, get_db
from .models import (
    User,
    Skill,
    Job,
    JobSkill,
    Candidate,
    CandidateSkill,
    CandidateEvidence,
    ExperienceTask,
    CandidateTask,
    TaskSubmission,
    TaskAssessment,
    Recommendation,
)
from .schemas import (
    LoginRequest,
    TaskCreate,
    SubmitRequest,
    AssessRequest,
    ValidateRequest,
)


# ============================================================
# DATABASE
# ============================================================

Base.metadata.create_all(bind=engine)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="SWAMARGA Backend",
    version="1.0.0",
    description=(
        "Illustrative demonstration backend for "
        "demand → skill gap → evidence → "
        "experience bridge → verification."
    ),
)


# ============================================================
# CORS
# ============================================================

origins = [
    x.strip()
    for x in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# HELPERS
# ============================================================

def skill_dict(skill):
    return {
        "id": skill.id,
        "name": skill.name,
        "category": skill.category,
    }


def job_dict(db, job):
    required_skills = []

    for job_skill in job.skills:
        required_skills.append(
            {
                "id": job_skill.skill.id,
                "name": job_skill.skill.name,
                "required_level": job_skill.required_level,
            }
        )

    return {
        "id": job.id,
        "title": job.title,
        "company": job.company,
        "location": job.location,
        "description": job.description,
        "required_skills": required_skills,
        "source": job.source,
    }


def resolve_job(db, role: str):
    job = (
        db.query(Job)
        .filter(func.lower(Job.title) == role.lower())
        .first()
    )

    if not job:
        job = (
            db.query(Job)
            .filter(Job.title.ilike(f"%{role}%"))
            .first()
        )

    return job


# ============================================================
# BASIC
# ============================================================

@app.get("/")
def root():
    return {
        "app": "SWAMARGA",
        "status": "running",
        "demo_data": True,
        "docs": "/docs",
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "database": "connected",
    }


# ============================================================
# AUTH
# ============================================================

@app.post("/auth/login")
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == payload.email)
        .first()
    )

    if not user or user.password != payload.password:
        raise HTTPException(
            status_code=401,
            detail="Invalid demo credentials",
        )

    return {
        "success": True,
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role,
        },
    }


# ============================================================
# JOBS
# ============================================================

@app.get("/jobs")
def jobs(db: Session = Depends(get_db)):
    return [
        job_dict(db, job)
        for job in db.query(Job)
        .order_by(Job.id)
        .all()
    ]


@app.get("/jobs/{job_id}")
def get_job(
    job_id: int,
    db: Session = Depends(get_db),
):
    job = db.get(Job, job_id)

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    return job_dict(db, job)


# ============================================================
# SKILLS
# ============================================================

@app.get("/skills")
def skills(db: Session = Depends(get_db)):
    return [
        skill_dict(skill)
        for skill in db.query(Skill)
        .order_by(Skill.name)
        .all()
    ]


# ============================================================
# CANDIDATES
# ============================================================

@app.get("/candidates")
def candidates(db: Session = Depends(get_db)):
    result = []

    for candidate in db.query(Candidate).all():

        result.append(
            {
                "id": candidate.id,
                "name": candidate.name,
                "email": candidate.email,
                "target_role": candidate.target_role,
                "location": candidate.location,
                "skills": [
                    {
                        "name": cs.skill.name,
                        "proficiency": cs.proficiency,
                        "source": cs.source,
                    }
                    for cs in candidate.skills
                ],
            }
        )

    return result


@app.get("/candidates/{candidate_id}")
def get_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
):
    candidate = db.get(
        Candidate,
        candidate_id,
    )

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    evidence = (
        db.query(CandidateEvidence)
        .filter_by(candidate_id=candidate_id)
        .all()
    )

    return {
        "id": candidate.id,
        "name": candidate.name,
        "email": candidate.email,
        "target_role": candidate.target_role,
        "location": candidate.location,
        "bio": candidate.bio,

        "skills": [
            {
                "id": cs.skill.id,
                "name": cs.skill.name,
                "proficiency": cs.proficiency,
                "source": cs.source,
            }
            for cs in candidate.skills
        ],

        "evidence": [
            {
                "id": evidence_row.id,
                "skill": db.get(
                    Skill,
                    evidence_row.skill_id,
                ).name,
                "evidence_type": evidence_row.evidence_type,
                "description": evidence_row.description,
                "verified": evidence_row.verified,
                "score": evidence_row.score,
            }
            for evidence_row in evidence
        ],
    }


# ============================================================
# SKILL GAP
# ============================================================

@app.get("/candidates/{candidate_id}/skill-gap")
def skill_gap(
    candidate_id: int,
    role: str = Query(...),
    db: Session = Depends(get_db),
):
    candidate = db.get(
        Candidate,
        candidate_id,
    )

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    job = resolve_job(db, role)

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Role/job not found",
        )

    required = [
        job_skill.skill
        for job_skill in job.skills
    ]

    candidate_skill_ids = {
        cs.skill_id
        for cs in candidate.skills
    }

    matched = [
        skill
        for skill in required
        if skill.id in candidate_skill_ids
    ]

    gaps = [
        skill
        for skill in required
        if skill.id not in candidate_skill_ids
    ]

    return {
        "candidate": candidate.name,
        "role": job.title,

        "required_skills": [
            skill.name
            for skill in required
        ],

        "matched_skills": [
            skill.name
            for skill in matched
        ],

        "skill_gap": [
            skill.name
            for skill in gaps
        ],

        "gap_count": len(gaps),
    }


# ============================================================
# EVIDENCE GAP
# ============================================================

@app.get("/candidates/{candidate_id}/evidence-gap")
def evidence_gap(
    candidate_id: int,
    db: Session = Depends(get_db),
):
    candidate = db.get(
        Candidate,
        candidate_id,
    )

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    result = []

    for candidate_skill in candidate.skills:

        verified = (
            db.query(CandidateEvidence)
            .filter_by(
                candidate_id=candidate_id,
                skill_id=candidate_skill.skill_id,
                verified=True,
            )
            .first()
        )

        if not verified:
            result.append(
                {
                    "skill": candidate_skill.skill.name,
                    "proficiency": candidate_skill.proficiency,
                    "reason": (
                        "Skill claimed/demonstrated "
                        "in profile but no verified evidence"
                    ),
                }
            )

    return {
        "candidate": candidate.name,
        "evidence_gap": result,
        "count": len(result),
    }


# ============================================================
# EXPERIENCE TASKS
# ============================================================

@app.get("/tasks")
def tasks(db: Session = Depends(get_db)):

    result = []

    for task in (
        db.query(ExperienceTask)
        .order_by(ExperienceTask.id)
        .all()
    ):

        skill = db.get(
            Skill,
            task.skill_id,
        )

        result.append(
            {
                "id": task.id,
                "role": task.role,
                "skill": skill.name if skill else "",
                "skill_id": task.skill_id,
                "title": task.title,
                "description": task.description,
                "difficulty": task.difficulty,
                "estimated_minutes": task.estimated_minutes,
                "source": task.source,
            }
        )

    return result


# ============================================================
# RECOMMENDED EXPERIENCE BRIDGE
# ============================================================

@app.get("/tasks/recommended/{candidate_id}")
def recommended_tasks(
    candidate_id: int,
    role: Optional[str] = None,
    db: Session = Depends(get_db),
):
    candidate = db.get(
        Candidate,
        candidate_id,
    )

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    role = role or candidate.target_role

    job = resolve_job(
        db,
        role,
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Role/job not found",
        )

    required_ids = [
        job_skill.skill_id
        for job_skill in job.skills
    ]

    claimed_ids = {
        candidate_skill.skill_id
        for candidate_skill in candidate.skills
    }

    verified_ids = {
        evidence.skill_id
        for evidence in (
            db.query(CandidateEvidence)
            .filter_by(
                candidate_id=candidate_id,
                verified=True,
            )
            .all()
        )
    }

    # Evidence gaps first.
    priority_ids = [
        skill_id
        for skill_id in required_ids
        if skill_id in claimed_ids
        and skill_id not in verified_ids
    ]

    # Then actual skill gaps.
    priority_ids += [
        skill_id
        for skill_id in required_ids
        if skill_id not in claimed_ids
    ]

    result = []

    for skill_id in priority_ids:

        task = (
            db.query(ExperienceTask)
            .filter(
                ExperienceTask.skill_id == skill_id,
                ExperienceTask.role.ilike(
                    f"%{job.title}%"
                ),
            )
            .first()
        )

        if not task:
            task = (
                db.query(ExperienceTask)
                .filter(
                    ExperienceTask.skill_id == skill_id
                )
                .first()
            )

        if task:

            skill = db.get(
                Skill,
                skill_id,
            )

            result.append(
                {
                    "task_id": task.id,
                    "title": task.title,
                    "skill": skill.name,
                    "skill_id": skill_id,
                    "reason": (
                        "Evidence gap"
                        if skill_id in claimed_ids
                        else "Skill gap"
                    ),
                    "description": task.description,
                    "difficulty": task.difficulty,
                    "estimated_minutes": task.estimated_minutes,
                }
            )

    return {
        "candidate": candidate.name,
        "role": job.title,
        "recommended_tasks": result,
    }


# ============================================================
# CREATE TASK
# ============================================================

@app.post("/tasks")
def create_task(
    payload: TaskCreate,
    db: Session = Depends(get_db),
):
    if not db.get(
        Skill,
        payload.skill_id,
    ):
        raise HTTPException(
            status_code=404,
            detail="Skill not found",
        )

    task = ExperienceTask(
        **payload.model_dump()
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return {
        "id": task.id,
        **payload.model_dump(),
    }


# ============================================================
# ASSIGN TASK
# ============================================================

@app.post("/tasks/{task_id}/assign")
def assign_task(
    task_id: int,
    candidate_id: int,
    db: Session = Depends(get_db),
):
    task = db.get(
        ExperienceTask,
        task_id,
    )

    candidate = db.get(
        Candidate,
        candidate_id,
    )

    if not task or not candidate:
        raise HTTPException(
            status_code=404,
            detail="Task or candidate not found",
        )

    # Reuse an existing assignment if one exists.
    existing = (
        db.query(CandidateTask)
        .filter_by(
            candidate_id=candidate_id,
            task_id=task_id,
        )
        .first()
    )

    if existing:
        return {
            "candidate_task_id": existing.id,
            "status": existing.status,
            "task_id": existing.task_id,
            "candidate_id": existing.candidate_id,
        }

    candidate_task = CandidateTask(
        candidate_id=candidate_id,
        task_id=task_id,
        status="assigned",
    )

    db.add(candidate_task)
    db.commit()
    db.refresh(candidate_task)

    return {
        "candidate_task_id": candidate_task.id,
        "status": candidate_task.status,
        "task_id": candidate_task.task_id,
        "candidate_id": candidate_task.candidate_id,
    }


# ============================================================
# SUBMIT TASK BY TASK ID
# ============================================================

@app.post("/tasks/{task_id}/submit")
def submit_task(
    task_id: int,
    payload: SubmitRequest,
    db: Session = Depends(get_db),
):
    candidate = db.get(
        Candidate,
        payload.candidate_id,
    )

    task = db.get(
        ExperienceTask,
        task_id,
    )

    if not candidate or not task:
        raise HTTPException(
            status_code=404,
            detail="Candidate or task not found",
        )

    candidate_task = (
        db.query(CandidateTask)
        .filter_by(
            candidate_id=candidate.id,
            task_id=task.id,
        )
        .first()
    )

    if not candidate_task:

        candidate_task = CandidateTask(
            candidate_id=candidate.id,
            task_id=task.id,
            status="in_progress",
        )

        db.add(candidate_task)
        db.flush()

    candidate_task.status = "submitted"
    candidate_task.completed_at = datetime.utcnow()

    submission = TaskSubmission(
        candidate_task_id=candidate_task.id,
        submission_url=payload.submission_url or "",
        submission_text=payload.submission_text,
    )

    db.add(submission)
    db.flush()

    evidence = CandidateEvidence(
        candidate_id=candidate.id,
        skill_id=task.skill_id,
        evidence_type="Experience Bridge Submission",
        evidence_url=payload.submission_url or "",
        description=(
            f"{task.title}: "
            f"{payload.submission_text}"
        ),
        verified=False,
        source=(
            "DEMO DATA - generated from "
            "candidate task submission"
        ),
    )

    db.add(evidence)

    db.commit()

    db.refresh(submission)
    db.refresh(evidence)

    return {
        "status": "submitted",
        "message": (
            "Evidence submitted successfully "
            "and queued for assessment."
        ),
        "candidate_task_id": candidate_task.id,
        "submission_id": submission.id,
        "evidence_id": evidence.id,
        "task_id": task.id,
        "skill": db.get(
            Skill,
            task.skill_id,
        ).name,
    }


# ============================================================
# SUBMIT BY CANDIDATE TASK ID
# ============================================================

@app.post(
    "/candidate-tasks/{candidate_task_id}/submit"
)
def submit_candidate_task(
    candidate_task_id: int,
    payload: SubmitRequest,
    db: Session = Depends(get_db),
):
    """
    Frontend-compatible submission endpoint.

    CandidateTask
        ↓
    TaskSubmission
        ↓
    CandidateEvidence
    """

    candidate_task = db.get(
        CandidateTask,
        candidate_task_id,
    )

    if not candidate_task:
        raise HTTPException(
            status_code=404,
            detail="Candidate task not found",
        )

    candidate = db.get(
        Candidate,
        candidate_task.candidate_id,
    )

    task = db.get(
        ExperienceTask,
        candidate_task.task_id,
    )

    if not candidate or not task:
        raise HTTPException(
            status_code=404,
            detail="Candidate or experience task not found",
        )

    candidate_task.status = "submitted"
    candidate_task.completed_at = datetime.utcnow()

    submission = TaskSubmission(
        candidate_task_id=candidate_task.id,
        submission_url=payload.submission_url or "",
        submission_text=payload.submission_text,
    )

    db.add(submission)
    db.flush()

    evidence = CandidateEvidence(
        candidate_id=candidate.id,
        skill_id=task.skill_id,
        evidence_type="Experience Bridge Submission",
        evidence_url=payload.submission_url or "",
        description=(
            f"{task.title}: "
            f"{payload.submission_text}"
        ),
        verified=False,
        source=(
            "DEMO DATA - generated from "
            "candidate task submission"
        ),
    )

    db.add(evidence)

    db.commit()

    db.refresh(submission)
    db.refresh(evidence)

    return {
        "status": "submitted",
        "message": (
            "Evidence submitted successfully "
            "and queued for assessment."
        ),
        "candidate_task_id": candidate_task.id,
        "submission_id": submission.id,
        "evidence_id": evidence.id,
        "task_id": task.id,
        "skill": db.get(
            Skill,
            task.skill_id,
        ).name,
    }


# ============================================================
# ASSESSMENT
# ============================================================

@app.post(
    "/submissions/{submission_id}/assess"
)
def assess_submission(
    submission_id: int,
    payload: AssessRequest,
    db: Session = Depends(get_db),
):
    submission = db.get(
        TaskSubmission,
        submission_id,
    )

    if not submission:
        raise HTTPException(
            status_code=404,
            detail="Submission not found",
        )

    if not 0 <= payload.score <= 100:
        raise HTTPException(
            status_code=400,
            detail="Score must be 0-100",
        )

    assessment = TaskAssessment(
        submission_id=submission_id,
        **payload.model_dump(),
    )

    db.add(assessment)

    candidate_task = db.get(
        CandidateTask,
        submission.candidate_task_id,
    )

    candidate_task.status = "assessed"

    db.commit()
    db.refresh(assessment)

    task = db.get(
        ExperienceTask,
        candidate_task.task_id,
    )

    evidence = (
        db.query(CandidateEvidence)
        .filter(
            CandidateEvidence.candidate_id
            == candidate_task.candidate_id,

            CandidateEvidence.skill_id
            == task.skill_id,

            CandidateEvidence.evidence_type
            == "Experience Bridge Submission",
        )
        .order_by(
            CandidateEvidence.id.desc()
        )
        .first()
    )

    if evidence:
        evidence.score = payload.score
        db.commit()

    return {
        "assessment_id": assessment.id,
        "score": assessment.score,
        "passed": assessment.score >= 70,
        "feedback": assessment.feedback,
    }


# ============================================================
# EMPLOYER VALIDATION
# ============================================================

@app.post(
    "/evidence/{evidence_id}/validate"
)
def validate_evidence(
    evidence_id: int,
    payload: ValidateRequest,
    db: Session = Depends(get_db),
):
    evidence = db.get(
        CandidateEvidence,
        evidence_id,
    )

    if not evidence:
        raise HTTPException(
            status_code=404,
            detail="Evidence not found",
        )

    action = payload.action.lower()

    if action not in {
        "approve",
        "reject",
        "request_review",
    }:
        raise HTTPException(
            status_code=400,
            detail=(
                "action must be approve, "
                "reject, or request_review"
            ),
        )

    evidence.verified = (
        action == "approve"
    )

    evidence.verified_by = (
        payload.employer_id
    )

    evidence.verified_at = (
        datetime.utcnow()
        if evidence.verified
        else None
    )

    if payload.note:

        evidence.description = (
            evidence.description or ""
        ) + (
            f" | Employer note: "
            f"{payload.note}"
        )

    db.commit()

    return {
        "evidence_id": evidence.id,
        "status": (
            "VERIFIED"
            if evidence.verified
            else action.upper()
        ),
        "verified": evidence.verified,
        "verified_at": evidence.verified_at,
    }


# ============================================================
# COMPETENCY PASSPORT
# ============================================================

@app.get(
    "/candidates/{candidate_id}/passport"
)
def passport(
    candidate_id: int,
    db: Session = Depends(get_db),
):
    candidate = db.get(
        Candidate,
        candidate_id,
    )

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    rows = []

    verified_evidence = (
        db.query(CandidateEvidence)
        .filter_by(
            candidate_id=candidate_id,
            verified=True,
        )
        .all()
    )

    for evidence in verified_evidence:

        skill = db.get(
            Skill,
            evidence.skill_id,
        )

        rows.append(
            {
                "skill": skill.name,
                "evidence_type": evidence.evidence_type,
                "score": evidence.score,
                "verified": True,
                "verified_at": evidence.verified_at,
                "evidence_url": evidence.evidence_url,
            }
        )

    return {
        "candidate": candidate.name,
        "verified_competencies": rows,
        "count": len(rows),
    }


# ============================================================
# ANALYTICS — SKILL GAPS
# ============================================================

@app.get("/analytics/skill-gaps")
def analytics_skill_gaps(
    db: Session = Depends(get_db),
):
    counts = {}

    for candidate in db.query(Candidate).all():

        role = resolve_job(
            db,
            candidate.target_role,
        )

        if not role:
            continue

        candidate_skill_ids = {
            cs.skill_id
            for cs in candidate.skills
        }

        for job_skill in role.skills:

            if (
                job_skill.skill_id
                not in candidate_skill_ids
            ):

                skill_name = (
                    job_skill.skill.name
                )

                counts[skill_name] = (
                    counts.get(
                        skill_name,
                        0,
                    ) + 1
                )

    return {
        "data_status": (
            "ILLUSTRATIVE DEMO DATA"
        ),

        "skill_gaps": [
            {
                "skill": skill_name,
                "candidates_with_gap": count,
            }
            for skill_name, count
            in sorted(
                counts.items(),
                key=lambda item: -item[1],
            )
        ],
    }


# ============================================================
# ANALYTICS — DEMAND
# ============================================================

@app.get("/analytics/demand")
def analytics_demand(
    db: Session = Depends(get_db),
):
    rows = []

    for job in db.query(Job).all():

        rows.append(
            {
                "job": job.title,
                "company": job.company,
                "location": job.location,
                "required_skill_count": len(
                    job.skills
                ),
                "source": job.source,
            }
        )

    return {
        "data_status": "SYNTHETIC JOB RECORDS",
        "jobs": rows,
    }


# ============================================================
# ANALYTICS — DISTRICTS
# ============================================================

@app.get("/analytics/districts")
def analytics_districts():

    return {
        "data_status": (
            "ILLUSTRATIVE AGGREGATION - "
            "NOT OFFICIAL GOVERNMENT STATISTICS"
        ),

        "districts": [
            {
                "district": "Pune",
                "annual_cloud_it_demand": 2850,
                "active_trainees": 1600,
                "certified_instructors": 42,
                "capacity_deficit": -1250,
            },

            {
                "district": "Mumbai Suburban",
                "annual_cloud_it_demand": 3400,
                "active_trainees": 2200,
                "certified_instructors": 58,
                "capacity_deficit": -1200,
            },

            {
                "district": "Nagpur",
                "annual_cloud_it_demand": 820,
                "active_trainees": 650,
                "certified_instructors": 19,
                "capacity_deficit": -170,
            },

            {
                "district": "Nashik",
                "annual_cloud_it_demand": 640,
                "active_trainees": 580,
                "certified_instructors": 15,
                "capacity_deficit": -60,
            },

            {
                "district": "Chhatrapati Sambhajinagar",
                "annual_cloud_it_demand": 520,
                "active_trainees": 380,
                "certified_instructors": 12,
                "capacity_deficit": -140,
            },
        ],
    }


# ============================================================
# RECOMMENDATIONS
# ============================================================

@app.get("/recommendations")
def recommendations(
    db: Session = Depends(get_db),
):

    return {
        "data_status": (
            "RULE-BASED ILLUSTRATIVE "
            "RECOMMENDATIONS"
        ),

        "recommendations": [
            {
                "action_type": "Curriculum",
                "priority": "High",
                "action": (
                    "Add practical networking "
                    "diagnostics and TCP/IP "
                    "troubleshooting modules."
                ),
            },

            {
                "action_type": "Training",
                "priority": "High",
                "action": (
                    "Increase hands-on Docker "
                    "and cloud networking "
                    "lab capacity."
                ),
            },

            {
                "action_type": "Evidence",
                "priority": "High",
                "action": (
                    "Require practical evidence "
                    "for AWS claims before "
                    "marking the competency verified."
                ),
            },

            {
                "action_type": "Employer",
                "priority": "Medium",
                "action": (
                    "Use verified competency "
                    "records alongside job-skill "
                    "requirements during candidate review."
                ),
            },
        ],
    }