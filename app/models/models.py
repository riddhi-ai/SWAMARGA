from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    ForeignKey,
    Float
)

from sqlalchemy.orm import relationship

from app.database import Base


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)

    job_skills = relationship(
        "JobSkill",
        back_populates="skill",
        cascade="all, delete-orphan"
    )

    candidate_skills = relationship(
        "CandidateSkill",
        back_populates="skill",
        cascade="all, delete-orphan"
    )

    candidate_evidence = relationship(
        "CandidateEvidence",
        back_populates="skill",
        cascade="all, delete-orphan"
    )


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    company = Column(String(200), nullable=False)

    location = Column(String(200), nullable=True)

    description = Column(Text, nullable=False)

    job_skills = relationship(
        "JobSkill",
        back_populates="job",
        cascade="all, delete-orphan"
    )


class JobSkill(Base):
    __tablename__ = "job_skills"

    id = Column(Integer, primary_key=True, index=True)

    job_id = Column(
        Integer,
        ForeignKey("jobs.id"),
        nullable=False
    )

    skill_id = Column(
        Integer,
        ForeignKey("skills.id"),
        nullable=False
    )

    job = relationship(
        "Job",
        back_populates="job_skills"
    )

    skill = relationship(
        "Skill",
        back_populates="job_skills"
    )


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(200), nullable=False)

    email = Column(String(200), nullable=True)

    resume_text = Column(Text, nullable=True)

    candidate_skills = relationship(
        "CandidateSkill",
        back_populates="candidate",
        cascade="all, delete-orphan"
    )

    candidate_evidence = relationship(
        "CandidateEvidence",
        back_populates="candidate",
        cascade="all, delete-orphan"
    )


class CandidateSkill(Base):
    __tablename__ = "candidate_skills"

    id = Column(Integer, primary_key=True, index=True)

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id"),
        nullable=False
    )

    skill_id = Column(
        Integer,
        ForeignKey("skills.id"),
        nullable=False
    )

    candidate = relationship(
        "Candidate",
        back_populates="candidate_skills"
    )

    skill = relationship(
        "Skill",
        back_populates="candidate_skills"
    )


class CandidateEvidence(Base):
    __tablename__ = "candidate_evidence"

    id = Column(Integer, primary_key=True, index=True)

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id"),
        nullable=False
    )

    skill_id = Column(
        Integer,
        ForeignKey("skills.id"),
        nullable=False
    )

    evidence_type = Column(
        String(100),
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    verified = Column(
        Boolean,
        default=False
    )

    score = Column(
        Float,
        nullable=True
    )

    candidate = relationship(
        "Candidate",
        back_populates="candidate_evidence"
    )

    skill = relationship(
        "Skill",
        back_populates="candidate_evidence"
    )


class ExperienceTask(Base):
    __tablename__ = "experience_tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(
        String(200),
        nullable=False
    )

    description = Column(
        Text,
        nullable=False
    )

    skill_name = Column(
        String(100),
        nullable=True
    )


class CandidateTask(Base):
    __tablename__ = "candidate_tasks"

    id = Column(Integer, primary_key=True, index=True)

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id"),
        nullable=False
    )

    task_id = Column(
        Integer,
        ForeignKey("experience_tasks.id"),
        nullable=False
    )

    status = Column(
        String(50),
        default="Assigned"
    )


class TaskSubmission(Base):
    __tablename__ = "task_submissions"

    id = Column(Integer, primary_key=True, index=True)

    candidate_task_id = Column(
        Integer,
        ForeignKey("candidate_tasks.id"),
        nullable=False
    )

    submission_text = Column(
        Text,
        nullable=False
    )


class TaskAssessment(Base):
    __tablename__ = "task_assessments"

    id = Column(Integer, primary_key=True, index=True)

    submission_id = Column(
        Integer,
        ForeignKey("task_submissions.id"),
        nullable=False
    )

    score = Column(
        Float,
        nullable=False
    )

    feedback = Column(
        Text,
        nullable=True
    )

    verified = Column(
        Boolean,
        default=False
    )