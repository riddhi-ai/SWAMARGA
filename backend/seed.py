from app.database import Base, engine, SessionLocal
from app.models import *
from datetime import datetime

Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Reset demo DB so seeding is repeatable.
for model in [TaskAssessment, TaskSubmission, CandidateTask, CandidateEvidence,
              CandidateSkill, Candidate, ExperienceTask, JobSkill, Job,
              Skill, Recommendation, User]:
    db.query(model).delete()
db.commit()

# Users: synthetic demo accounts.
users = [
    User(email="candidate@swamarga.demo", password="demo123", role="candidate"),
    User(email="employer@swamarga.demo", password="demo123", role="employer"),
    User(email="institute@swamarga.demo", password="demo123", role="training_provider"),
    User(email="government@swamarga.demo", password="demo123", role="government_admin"),
]
db.add_all(users)

skills_data = [
    ("AWS","Cloud","Amazon Web Services|AWS Cloud"),
    ("Linux","Systems","Linux Administration|GNU/Linux"),
    ("Networking","Infrastructure","Computer Networking|Network Administration"),
    ("Docker","Cloud/DevOps","Containerization|Docker Containers"),
    ("Troubleshooting","Support","Technical Troubleshooting|Incident Troubleshooting"),
    ("Python","Programming","Python Programming"),
    ("SQL","Data","SQL Database"),
    ("TCP/IP","Networking","TCP IP|Internet Protocol Suite"),
    ("Cloud Security","Security","Cloud Security"),
]
skills = {}
for name, category, aliases in skills_data:
    s = Skill(name=name, category=category, aliases=aliases)
    db.add(s); db.flush(); skills[name] = s

jobs_data = [
    {
        "title":"Cloud Support Associate","company":"TechCloud Solutions","location":"Pune",
        "description":"Provide first-line cloud infrastructure support, investigate Linux and networking incidents, troubleshoot connectivity and containerized workloads, document incident resolution, and escalate complex issues.",
        "source":"DEMO DATA - synthetic employer record inspired by public occupational task descriptions"
    },
    {
        "title":"Junior Cloud Operations Associate","company":"MahaStack Services","location":"Mumbai",
        "description":"Monitor cloud workloads, perform Linux administration, assist with network diagnostics, maintain containerized services, and document operational procedures.",
        "source":"DEMO DATA - synthetic employer record"
    },
    {
        "title":"IT Support Engineer","company":"DigitalWorks India","location":"Pune",
        "description":"Resolve end-user hardware/software issues, diagnose system faults, document incidents, and support basic network and operating-system administration.",
        "source":"DEMO DATA - synthetic employer record"
    }
]
jobs = []
requirements = {
    "Cloud Support Associate":[("AWS","Advanced"),("Linux","Intermediate"),("Networking","Intermediate"),("Docker","Basic"),("Troubleshooting","Advanced")],
    "Junior Cloud Operations Associate":[("AWS","Intermediate"),("Linux","Intermediate"),("Networking","Intermediate"),("Docker","Basic")],
    "IT Support Engineer":[("Linux","Intermediate"),("Networking","Basic"),("Troubleshooting","Advanced")]
}
for d in jobs_data:
    j = Job(**d); db.add(j); db.flush(); jobs.append(j)
    for sk, level in requirements[j.title]:
        db.add(JobSkill(job_id=j.id, skill_id=skills[sk].id, required_level=level))

candidate = Candidate(
    name="Riddhi Naskari",
    email="riddhi.demo@swamarga.local",
    target_role="Cloud Support Associate",
    location="Pune",
    bio="Synthetic demonstration candidate record. Not a real employment record."
)
db.add(candidate); db.flush()

for sk, prof in [("AWS","Intermediate"),("Linux","Intermediate")]:
    db.add(CandidateSkill(candidate_id=candidate.id, skill_id=skills[sk].id, proficiency=prof, source="DEMO DATA - synthetic candidate profile"))

# AWS claim has evidence, but deliberately unverified so Evidence Gap is visible.
db.add(CandidateEvidence(
    candidate_id=candidate.id, skill_id=skills["AWS"].id,
    evidence_type="Certificate", evidence_url="",
    description="AWS learning/certificate record used only for demonstration.",
    verified=False, source="DEMO DATA - synthetic evidence"
))
db.add(CandidateEvidence(
    candidate_id=candidate.id, skill_id=skills["Linux"].id,
    evidence_type="Practical Project", evidence_url="",
    description="Linux troubleshooting project record used only for demonstration.",
    verified=True, verified_by=2, verified_at=datetime.utcnow(), score=88,
    source="DEMO DATA - synthetic evidence"
))

tasks = [
    ("Cloud Support Associate","AWS","AWS Cloud Routing Simulation",
     "Diagnose a simulated cloud VPC routing failure. Identify route-table, subnet, security-group and connectivity issues; document the root cause and remediation steps.", "Intermediate",45),
    ("Cloud Support Associate","Networking","Network Connectivity Troubleshooting",
     "Investigate a simulated service that cannot reach a remote endpoint. Use TCP/IP reasoning, routing tables and diagnostic commands to isolate the fault and submit a short incident report.", "Intermediate",40),
    ("Cloud Support Associate","Docker","Investigate Docker Container CrashLoopBackOff Scenario",
     "Inspect a failing container workload, identify the configuration or dependency causing repeated restarts, and document a safe remediation and verification procedure.", "Intermediate",45),
    ("Cloud Support Associate","Troubleshooting","Linux Service Recovery",
     "Diagnose a failed Linux service using logs and service-management commands, restore operation, and provide a concise root-cause report.", "Basic",35),
]
for role, sk, title, desc, diff, mins in tasks:
    db.add(ExperienceTask(role=role, skill_id=skills[sk].id, title=title, description=desc, difficulty=diff, estimated_minutes=mins))

db.add_all([
    Recommendation(action_type="Curriculum", action="Add practical networking diagnostics and TCP/IP troubleshooting modules.", priority="High"),
    Recommendation(action_type="Training", action="Increase hands-on Docker and cloud networking lab capacity.", priority="High"),
    Recommendation(action_type="Evidence", action="Require practical evidence for AWS claims before marking the competency verified.", priority="High"),
])
db.commit()
print("SWAMARGA demo database seeded successfully.")
print("Candidate: Riddhi Naskari (id=1)")
print("Login: candidate@swamarga.demo / demo123")
print("Role: Cloud Support Associate")
db.close()
