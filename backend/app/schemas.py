from typing import Optional, List
from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

class TaskCreate(BaseModel):
    role: str
    skill_id: int
    title: str
    description: str
    difficulty: str = "Intermediate"
    estimated_minutes: int = 45

class SubmitRequest(BaseModel):
    candidate_id: int
    submission_url: str = ""
    submission_text: str

class AssessRequest(BaseModel):
    score: float
    accuracy_score: float = 0
    completion_score: float = 0
    best_practices_score: float = 0
    assessed_by: Optional[int] = None
    feedback: str = ""

class ValidateRequest(BaseModel):
    action: str
    employer_id: Optional[int] = None
    note: str = ""
