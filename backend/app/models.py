from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)

class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    category = Column(String(100), default="Technical")
    aliases = Column(Text, default="")

class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    company = Column(String(200), nullable=False)
    location = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    source = Column(String(500), default="DEMO DATA - synthetic employer record")
    created_at = Column(DateTime, default=datetime.utcnow)
    skills = relationship("JobSkill", back_populates="job", cascade="all, delete-orphan")

class JobSkill(Base):
    __tablename__ = "job_skills"
    id = Column(Integer, primary_key=True)
    job_id = Column(Integer, ForeignKey("jobs.id"), nullable=False)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    required_level = Column(String(50), default="Intermediate")
    job = relationship("Job", back_populates="skills")
    skill = relationship("Skill")

class Candidate(Base):
    __tablename__ = "candidates"
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    target_role = Column(String(200), nullable=False)
    location = Column(String(100), default="Pune")
    bio = Column(Text, default="")
    skills = relationship("CandidateSkill", back_populates="candidate", cascade="all, delete-orphan")

class CandidateSkill(Base):
    __tablename__ = "candidate_skills"
    id = Column(Integer, primary_key=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"), nullable=False)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    proficiency = Column(String(50), default="Intermediate")
    source = Column(String(255), default="Candidate profile")
    candidate = relationship("Candidate", back_populates="skills")
    skill = relationship("Skill")

class CandidateEvidence(Base):
    __tablename__ = "candidate_evidence"
    id = Column(Integer, primary_key=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"), nullable=False)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    evidence_type = Column(String(100), nullable=False)
    evidence_url = Column(String(500), default="")
    description = Column(Text, default="")
    verified = Column(Boolean, default=False)
    verified_by = Column(Integer, nullable=True)
    verified_at = Column(DateTime, nullable=True)
    score = Column(Float, nullable=True)
    source = Column(String(500), default="DEMO DATA - synthetic evidence record")

class ExperienceTask(Base):
    __tablename__ = "experience_tasks"
    id = Column(Integer, primary_key=True)
    role = Column(String(200), nullable=False)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    difficulty = Column(String(50), default="Intermediate")
    estimated_minutes = Column(Integer, default=45)
    source = Column(String(500), default="DEMO DATA - synthetic practical task")

class CandidateTask(Base):
    __tablename__ = "candidate_tasks"
    id = Column(Integer, primary_key=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"), nullable=False)
    task_id = Column(Integer, ForeignKey("experience_tasks.id"), nullable=False)
    status = Column(String(50), default="assigned")
    assigned_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

class TaskSubmission(Base):
    __tablename__ = "task_submissions"
    id = Column(Integer, primary_key=True)
    candidate_task_id = Column(Integer, ForeignKey("candidate_tasks.id"), nullable=False)
    submission_url = Column(String(500), default="")
    submission_text = Column(Text, default="")
    submitted_at = Column(DateTime, default=datetime.utcnow)

class TaskAssessment(Base):
    __tablename__ = "task_assessments"
    id = Column(Integer, primary_key=True)
    submission_id = Column(Integer, ForeignKey("task_submissions.id"), nullable=False)
    score = Column(Float, nullable=False)
    accuracy_score = Column(Float, default=0)
    completion_score = Column(Float, default=0)
    best_practices_score = Column(Float, default=0)
    assessed_by = Column(Integer, nullable=True)
    assessment_type = Column(String(50), default="rule_based")
    feedback = Column(Text, default="")

class Recommendation(Base):
    __tablename__ = "recommendations"
    id = Column(Integer, primary_key=True)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=True)
    action_type = Column(String(100), nullable=False)
    action = Column(Text, nullable=False)
    priority = Column(String(50), default="Medium")
    source = Column(String(500), default="DEMO DATA - rule-based recommendation")
