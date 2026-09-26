from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.models import (
    Candidate,
    CandidateSkill,
    CandidateEvidence,
    Skill
)

from app.schemas.schemas import (
    CandidateCreate,
    EvidenceCreate
)

from app.services.skill_extraction import (
    extract_skills
)

from app.services.skill_analysis import (
    get_skill_gap,
    get_evidence_gap,
    get_role_required_skills
)


router = APIRouter(
    prefix="/candidates",
    tags=["Candidates"]
)


@router.post("/")
def create_candidate(
    data: CandidateCreate,
    db: Session = Depends(get_db)
):

    candidate = Candidate(
        name=data.name,
        email=data.email,
        resume_text=data.resume_text
    )

    db.add(candidate)

    db.commit()

    db.refresh(candidate)

    if data.resume_text:

        skills = extract_skills(
            data.resume_text
        )

        for skill_name in skills:

            skill = db.query(Skill).filter(
                Skill.name == skill_name
            ).first()

            if not skill:

                skill = Skill(
                    name=skill_name
                )

                db.add(skill)

                db.commit()

                db.refresh(skill)

            candidate_skill = CandidateSkill(
                candidate_id=candidate.id,
                skill_id=skill.id
            )

            db.add(candidate_skill)

        db.commit()

    return {
        "message": "Candidate created successfully",
        "candidate_id": candidate.id
    }


@router.get("/")
def get_candidates(
    db: Session = Depends(get_db)
):

    candidates = db.query(
        Candidate
    ).all()

    return [
        {
            "id": candidate.id,
            "name": candidate.name,
            "email": candidate.email
        }
        for candidate in candidates
    ]


@router.get("/{candidate_id}/skill-gap")
def candidate_skill_gap(
    candidate_id: int,
    role: str,
    db: Session = Depends(get_db)
):

    candidate = db.query(
        Candidate
    ).filter(
        Candidate.id == candidate_id
    ).first()

    if not candidate:

        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    return get_skill_gap(
        db,
        candidate_id,
        role
    )


@router.get("/{candidate_id}/evidence-gap")
def candidate_evidence_gap(
    candidate_id: int,
    role: str,
    db: Session = Depends(get_db)
):

    candidate = db.query(
        Candidate
    ).filter(
        Candidate.id == candidate_id
    ).first()

    if not candidate:

        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    required_skills = get_role_required_skills(
        db,
        role
    )

    return get_evidence_gap(
        db,
        candidate_id,
        required_skills
    )


@router.post("/{candidate_id}/evidence")
def add_evidence(
    candidate_id: int,
    data: EvidenceCreate,
    db: Session = Depends(get_db)
):

    candidate = db.query(
        Candidate
    ).filter(
        Candidate.id == candidate_id
    ).first()

    if not candidate:

        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    skill = db.query(
        Skill
    ).filter(
        Skill.name.ilike(data.skill_name)
    ).first()

    if not skill:

        skill = Skill(
            name=data.skill_name
        )

        db.add(skill)

        db.commit()

        db.refresh(skill)

    evidence = CandidateEvidence(
        candidate_id=candidate_id,
        skill_id=skill.id,
        evidence_type=data.evidence_type,
        description=data.description,
        verified=data.verified,
        score=data.score
    )

    db.add(evidence)

    db.commit()

    db.refresh(evidence)

    return {
        "message": "Evidence added successfully",
        "evidence_id": evidence.id
    }