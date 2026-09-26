from typing import Optional

from pydantic import BaseModel


class JobCreate(BaseModel):

    title: str

    company: str

    location: Optional[str] = None

    description: str


class CandidateCreate(BaseModel):

    name: str

    email: Optional[str] = None

    resume_text: Optional[str] = None


class EvidenceCreate(BaseModel):

    skill_name: str

    evidence_type: Optional[str] = None

    description: Optional[str] = None

    verified: bool = False

    score: Optional[float] = None