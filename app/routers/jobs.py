from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.models import (
    Job,
    JobSkill,
    Skill
)

from app.schemas.schemas import JobCreate

from app.services.skill_extraction import (
    extract_skills
)


router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.post("/")
def create_job(
    data: JobCreate,
    db: Session = Depends(get_db)
):

    job = Job(
        title=data.title,
        company=data.company,
        location=data.location,
        description=data.description
    )

    db.add(job)

    db.commit()

    db.refresh(job)

    return {
        "message": "Job created successfully",
        "job_id": job.id
    }


@router.get("/")
def get_jobs(
    db: Session = Depends(get_db)
):

    jobs = db.query(Job).all()

    return [
        {
            "id": job.id,
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "description": job.description
        }
        for job in jobs
    ]


@router.post("/{job_id}/extract-skills")
def extract_job_skills(
    job_id: int,
    db: Session = Depends(get_db)
):

    job = db.query(Job).filter(
        Job.id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    skills = extract_skills(
        job.description
    )

    saved_skills = []

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

        existing = db.query(JobSkill).filter(
            JobSkill.job_id == job.id,
            JobSkill.skill_id == skill.id
        ).first()

        if not existing:

            job_skill = JobSkill(
                job_id=job.id,
                skill_id=skill.id
            )

            db.add(job_skill)

        saved_skills.append(skill_name)

    db.commit()

    return {
        "job_id": job.id,
        "job_title": job.title,
        "extracted_skills": saved_skills
    }