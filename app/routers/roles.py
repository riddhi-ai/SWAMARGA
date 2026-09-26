from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database import get_db

from app.services.skill_analysis import (
    get_role_required_skills
)


router = APIRouter(
    prefix="/roles",
    tags=["Roles"]
)


@router.get("/{role}/skill-profile")
def role_skill_profile(
    role: str,
    db: Session = Depends(get_db)
):

    skills = get_role_required_skills(
        db,
        role
    )

    return {
        "role": role,
        "required_skills": skills,
        "skill_count": len(skills)
    }