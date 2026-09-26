from typing import List, Dict, Any

from sqlalchemy.orm import Session


def get_role_required_skills(
    db: Session,
    role: str
) -> List[str]:

    from app.models.models import Job, JobSkill, Skill

    skills = (
        db.query(Skill.name)
        .join(
            JobSkill,
            JobSkill.skill_id == Skill.id
        )
        .join(
            Job,
            JobSkill.job_id == Job.id
        )
        .filter(
            Job.title.ilike(f"%{role}%")
        )
        .distinct()
        .all()
    )

    return sorted(
        [skill[0] for skill in skills]
    )


def get_candidate_skills(
    db: Session,
    candidate_id: int
) -> List[str]:

    from app.models.models import (
        CandidateSkill,
        Skill
    )

    skills = (
        db.query(Skill.name)
        .join(
            CandidateSkill,
            CandidateSkill.skill_id == Skill.id
        )
        .filter(
            CandidateSkill.candidate_id == candidate_id
        )
        .all()
    )

    return sorted(
        [skill[0] for skill in skills]
    )


def calculate_skill_gap(
    required_skills: List[str],
    candidate_skills: List[str]
) -> Dict[str, List[str]]:

    required = {
        skill.lower(): skill
        for skill in required_skills
    }

    candidate = {
        skill.lower(): skill
        for skill in candidate_skills
    }

    missing = [
        required[key]
        for key in required
        if key not in candidate
    ]

    matched = [
        candidate[key]
        for key in candidate
        if key in required
    ]

    return {
        "matched_skills": sorted(matched),
        "skill_gap": sorted(missing)
    }


def get_skill_gap(
    db: Session,
    candidate_id: int,
    role: str
) -> Dict[str, Any]:

    required_skills = get_role_required_skills(
        db,
        role
    )

    candidate_skills = get_candidate_skills(
        db,
        candidate_id
    )

    result = calculate_skill_gap(
        required_skills,
        candidate_skills
    )

    return {
        "candidate_id": candidate_id,
        "role": role,
        "required_skills": required_skills,
        "candidate_skills": candidate_skills,
        **result
    }


def get_evidence_gap(
    db: Session,
    candidate_id: int,
    required_skills: List[str]
) -> Dict[str, Any]:

    from app.models.models import (
        CandidateEvidence,
        Skill
    )

    verified = (
        db.query(Skill.name)
        .join(
            CandidateEvidence,
            CandidateEvidence.skill_id == Skill.id
        )
        .filter(
            CandidateEvidence.candidate_id == candidate_id,
            CandidateEvidence.verified == True
        )
        .all()
    )

    verified_skills = {
        skill[0]
        for skill in verified
    }

    evidence_gap = [
        skill
        for skill in required_skills
        if skill.lower()
        not in {
            item.lower()
            for item in verified_skills
        }
    ]

    return {
        "candidate_id": candidate_id,
        "required_skills": required_skills,
        "verified_skills": sorted(
            verified_skills
        ),
        "evidence_gap": sorted(
            evidence_gap
        )
    }