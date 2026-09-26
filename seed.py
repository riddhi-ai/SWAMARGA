from app.database import SessionLocal
from app.models.models import (
    Skill,
    Job,
    JobSkill,
    Candidate,
    CandidateSkill,
    CandidateEvidence,
)


def get_or_create_skill(db, name):

    skill = db.query(Skill).filter(
        Skill.name == name
    ).first()

    if not skill:
        skill = Skill(name=name)
        db.add(skill)
        db.commit()
        db.refresh(skill)

    return skill


def seed_database():

    db = SessionLocal()

    try:

        print("================================")
        print("SEEDING SWAMARGA DATABASE")
        print("================================")

        # --------------------------------------------------
        # 1. SKILLS
        # --------------------------------------------------

        skill_names = [
            "AWS",
            "Linux",
            "Networking",
            "Troubleshooting",
            "Docker",
        ]

        skills = {}

        for name in skill_names:
            skills[name] = get_or_create_skill(
                db,
                name
            )

        print("Skills created.")

        # --------------------------------------------------
        # 2. JOB POSTINGS
        # --------------------------------------------------

        jobs_data = [
            {
                "title": "Cloud Support Associate",
                "company": "TechCloud Solutions",
                "location": "Pune",
                "description": """
                We are looking for a Cloud Support Associate.
                Required skills include AWS, Linux, Networking,
                Troubleshooting and Docker.
                The candidate should be able to troubleshoot
                cloud infrastructure and Linux services.
                """
            },
            {
                "title": "Cloud Support Associate",
                "company": "CloudNova",
                "location": "Pune",
                "description": """
                Cloud Support Associate required with AWS,
                Linux, Networking and Troubleshooting skills.
                Docker knowledge is preferred.
                """
            },
            {
                "title": "Junior Cloud Engineer",
                "company": "DataGrid Systems",
                "location": "Pune",
                "description": """
                Junior Cloud Engineer with AWS, Linux,
                Networking, Troubleshooting and Docker
                experience.
                """
            },
            {
                "title": "Cloud Operations Associate",
                "company": "InfraWorks",
                "location": "Mumbai",
                "description": """
                Candidate should have AWS, Linux,
                Networking and Troubleshooting skills.
                Docker is an additional requirement.
                """
            },
            {
                "title": "Technical Support Engineer",
                "company": "NextGen Technologies",
                "location": "Pune",
                "description": """
                Technical Support Engineer with Linux,
                Networking and Troubleshooting knowledge.
                AWS and Docker are desirable.
                """
            },
        ]

        for job_data in jobs_data:

            existing_job = db.query(Job).filter(
                Job.title == job_data["title"],
                Job.company == job_data["company"]
            ).first()

            if existing_job:
                job = existing_job
            else:
                job = Job(**job_data)
                db.add(job)
                db.commit()
                db.refresh(job)

            # Extract and attach skills

            for skill_name in skill_names:

                if skill_name.lower() in job.description.lower():

                    existing_link = db.query(
                        JobSkill
                    ).filter(
                        JobSkill.job_id == job.id,
                        JobSkill.skill_id == skills[skill_name].id
                    ).first()

                    if not existing_link:

                        db.add(
                            JobSkill(
                                job_id=job.id,
                                skill_id=skills[skill_name].id
                            )
                        )

            db.commit()

        print("Job postings created.")

        # --------------------------------------------------
        # 3. DEMO CANDIDATE
        # --------------------------------------------------

        candidate = db.query(
            Candidate
        ).filter(
            Candidate.email == "riddhi.demo@swamarga.local"
        ).first()

        if not candidate:

            candidate = Candidate(
                name="Riddhi",
                email="riddhi.demo@swamarga.local",
                resume_text="""
                MCA student with experience in AWS,
                Linux and troubleshooting.
                Interested in cloud support and DevOps.
                """
            )

            db.add(candidate)
            db.commit()
            db.refresh(candidate)

        # Candidate knows these skills

        candidate_skill_names = [
            "AWS",
            "Linux",
            "Troubleshooting",
        ]

        for skill_name in candidate_skill_names:

            existing = db.query(
                CandidateSkill
            ).filter(
                CandidateSkill.candidate_id == candidate.id,
                CandidateSkill.skill_id == skills[skill_name].id
            ).first()

            if not existing:

                db.add(
                    CandidateSkill(
                        candidate_id=candidate.id,
                        skill_id=skills[skill_name].id
                    )
                )

        db.commit()

        print("Demo candidate created.")

        # --------------------------------------------------
        # 4. VERIFIED PRACTICAL EVIDENCE
        # --------------------------------------------------

        evidence_data = [
            {
                "skill": "Linux",
                "type": "Practical Assessment",
                "description": "Diagnosed and fixed a Linux service failure.",
                "verified": True,
                "score": 84
            },
            {
                "skill": "Troubleshooting",
                "type": "Practical Assessment",
                "description": "Completed a cloud troubleshooting scenario.",
                "verified": True,
                "score": 88
            },
            {
                "skill": "AWS",
                "type": "Certificate",
                "description": "AWS learning/certification evidence submitted.",
                "verified": False,
                "score": None
            },
        ]

        for item in evidence_data:

            existing = db.query(
                CandidateEvidence
            ).filter(
                CandidateEvidence.candidate_id == candidate.id,
                CandidateEvidence.skill_id == skills[item["skill"]].id
            ).first()

            if not existing:

                evidence = CandidateEvidence(
                    candidate_id=candidate.id,
                    skill_id=skills[item["skill"]].id,
                    evidence_type=item["type"],
                    description=item["description"],
                    verified=item["verified"],
                    score=item["score"]
                )

                db.add(evidence)

        db.commit()

        print("Candidate evidence created.")

        # --------------------------------------------------
        # COMPLETE
        # --------------------------------------------------

        print("")
        print("================================")
        print("DATABASE SEEDING COMPLETE")
        print("================================")
        print(f"Candidate ID: {candidate.id}")
        print("Candidate: Riddhi")
        print("")
        print("Required skills:")
        print("AWS")
        print("Linux")
        print("Networking")
        print("Troubleshooting")
        print("Docker")
        print("")
        print("Candidate skills:")
        print("AWS")
        print("Linux")
        print("Troubleshooting")
        print("")
        print("Expected Skill Gap:")
        print("Networking")
        print("Docker")
        print("")
        print("Verified Evidence:")
        print("Linux")
        print("Troubleshooting")
        print("")
        print("Expected Evidence Gap:")
        print("AWS")
        print("Networking")
        print("Docker")
        print("================================")

    finally:

        db.close()


if __name__ == "__main__":
    seed_database()