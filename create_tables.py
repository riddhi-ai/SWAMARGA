from app.database import engine, Base

from app.models.models import (
    Skill,
    Job,
    JobSkill,
    Candidate,
    CandidateSkill,
    CandidateEvidence,
    ExperienceTask,
    CandidateTask,
    TaskSubmission,
    TaskAssessment
)


print("Creating SWAMARGA database tables...")

Base.metadata.create_all(
    bind=engine
)

print("================================")
print("TABLES CREATED SUCCESSFULLY")
print("================================")