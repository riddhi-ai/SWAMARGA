from datetime import datetime

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.models import (
    Candidate,
    ExperienceTask,
    CandidateTask,
    TaskSubmission,
    TaskAssessment
)

from app.schemas.schemas import (
    TaskCreate,
    SubmissionCreate,
    AssessmentCreate
)

from app.services.skill_analysis import (
    get_role_required_skills,
    get_candidate_skills,
    get_candidate_evidence_skills,
    calculate_skill_gap,
    calculate_evidence_gap
)


router = APIRouter(
    tags=["Experience Bridge"]
)


# =========================================================
# EXPERIENCE BRIDGE
# =========================================================

@router.get(
    "/candidates/{candidate_id}/experience-bridge"
)
def experience_bridge(
    candidate_id: int,
    db: Session = Depends(get_db)
):

    candidate = db.get(
        Candidate,
        candidate_id
    )


    if not candidate:

        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )


    required = get_role_required_skills(
        db,
        candidate.target_role
    )


    candidate_skills = get_candidate_skills(
        db,
        candidate.id
    )


    evidence_skills = (
        get_candidate_evidence_skills(
            db,
            candidate.id
        )
    )


    skill_gap = calculate_skill_gap(
        required,
        candidate_skills
    )


    evidence_gap = calculate_evidence_gap(
        required,
        candidate_skills,
        evidence_skills
    )


    skill_gap_set = set(
        skill_gap
    )

    evidence_gap_set = set(
        evidence_gap
    )


    tasks = (
        db.query(ExperienceTask)
        .filter(
            ExperienceTask.active == True
        )
        .all()
    )


    recommendations = []


    for task in tasks:

        skill = task.skill.name


        if skill in evidence_gap_set:

            recommendations.append({

                "task_id": task.id,

                "title": task.title,

                "skill": skill,

                "gap_type": "evidence_gap",

                "reason":
                    "Candidate has this skill "
                    "but lacks practical evidence.",

                "difficulty": task.difficulty,

                "estimated_minutes":
                    task.estimated_minutes

            })


        elif skill in skill_gap_set:

            recommendations.append({

                "task_id": task.id,

                "title": task.title,

                "skill": skill,

                "gap_type": "skill_gap",

                "reason":
                    "This skill is required for "
                    "the target role but is missing.",

                "difficulty": task.difficulty,

                "estimated_minutes":
                    task.estimated_minutes

            })


    return {

        "candidate_id": candidate.id,

        "candidate_name": candidate.name,

        "target_role": candidate.target_role,

        "skill_gap": sorted(
            skill_gap_set
        ),

        "evidence_gap": sorted(
            evidence_gap_set
        ),

        "recommendations": recommendations

    }


# =========================================================
# GET ALL TASKS
# =========================================================

@router.get("/tasks")
def get_tasks(
    db: Session = Depends(get_db)
):

    tasks = (
        db.query(ExperienceTask)
        .filter(
            ExperienceTask.active == True
        )
        .all()
    )


    return [

        {

            "id": task.id,

            "title": task.title,

            "description": task.description,

            "role": task.role,

            "skill": task.skill.name,

            "skill_id": task.skill_id,

            "task_type": task.task_type,

            "difficulty": task.difficulty,

            "estimated_minutes":
                task.estimated_minutes

        }

        for task in tasks

    ]


# =========================================================
# GET ONE TASK
# =========================================================

@router.get("/tasks/{task_id}")
def get_task(
    task_id: int,
    db: Session = Depends(get_db)
):

    task = db.get(
        ExperienceTask,
        task_id
    )


    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )


    return {

        "id": task.id,

        "title": task.title,

        "description": task.description,

        "role": task.role,

        "skill": task.skill.name,

        "skill_id": task.skill_id,

        "task_type": task.task_type,

        "difficulty": task.difficulty,

        "estimated_minutes":
            task.estimated_minutes

    }


# =========================================================
# CREATE TASK
# =========================================================

@router.post("/tasks")
def create_task(
    data: TaskCreate,
    db: Session = Depends(get_db)
):

    task = ExperienceTask(

        title=data.title,

        description=data.description,

        role=data.role,

        skill_id=data.skill_id,

        task_type=data.task_type,

        difficulty=data.difficulty,

        estimated_minutes=data.estimated_minutes,

        active=True

    )


    db.add(task)

    db.commit()

    db.refresh(task)


    return task


# =========================================================
# ASSIGN TASK
# =========================================================

@router.post(
    "/candidates/{candidate_id}/tasks/{task_id}/assign"
)
def assign_task(
    candidate_id: int,
    task_id: int,
    db: Session = Depends(get_db)
):

    candidate = db.get(
        Candidate,
        candidate_id
    )


    if not candidate:

        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )


    task = db.get(
        ExperienceTask,
        task_id
    )


    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )


    existing = (
        db.query(CandidateTask)
        .filter(
            CandidateTask.candidate_id == candidate_id,

            CandidateTask.task_id == task_id
        )
        .first()
    )


    if existing:

        raise HTTPException(
            status_code=409,
            detail="Task already assigned"
        )


    candidate_task = CandidateTask(

        candidate_id=candidate_id,

        task_id=task_id,

        status="assigned"

    )


    db.add(candidate_task)

    db.commit()

    db.refresh(candidate_task)


    return {

        "message": "Task assigned",

        "candidate_task_id":
            candidate_task.id,

        "status":
            candidate_task.status

    }


# =========================================================
# GET CANDIDATE TASKS
# =========================================================

@router.get(
    "/candidates/{candidate_id}/tasks"
)
def get_candidate_tasks(
    candidate_id: int,
    db: Session = Depends(get_db)
):

    candidate = db.get(
        Candidate,
        candidate_id
    )


    if not candidate:

        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )


    return [

        {

            "candidate_task_id":
                item.id,

            "task":
                item.task.title,

            "status":
                item.status,

            "skill":
                item.task.skill.name

        }

        for item in candidate.assigned_tasks

    ]


# =========================================================
# GET CANDIDATE TASK DETAIL
# =========================================================

@router.get(
    "/candidate-tasks/{candidate_task_id}"
)
def get_candidate_task(
    candidate_task_id: int,
    db: Session = Depends(get_db)
):

    record = db.get(
        CandidateTask,
        candidate_task_id
    )


    if not record:

        raise HTTPException(
            status_code=404,
            detail="Candidate task not found"
        )


    result = {

        "id": record.id,

        "status": record.status,

        "candidate_id":
            record.candidate_id,

        "task": {

            "id":
                record.task.id,

            "title":
                record.task.title,

            "description":
                record.task.description,

            "role":
                record.task.role,

            "skill":
                record.task.skill.name,

            "difficulty":
                record.task.difficulty,

            "estimated_minutes":
                record.task.estimated_minutes

        },

        "submission": None,

        "assessment": None

    }


    if record.submission:

        result["submission"] = {

            "id":
                record.submission.id,

            "submission_text":
                record.submission.submission_text,

            "submission_url":
                record.submission.submission_url,

            "submission_notes":
                record.submission.submission_notes,

            "submitted_at":
                record.submission.submitted_at

        }


    if record.assessment:

        result["assessment"] = {

            "technical_score":
                record.assessment.technical_score,

            "process_score":
                record.assessment.process_score,

            "troubleshooting_score":
                record.assessment.troubleshooting_score,

            "explanation_score":
                record.assessment.explanation_score,

            "total_score":
                record.assessment.total_score,

            "assessment_status":
                record.assessment.assessment_status,

            "assessor_notes":
                record.assessment.assessor_notes

        }


    return result


# =========================================================
# START TASK
# =========================================================

@router.post(
    "/candidate-tasks/{candidate_task_id}/start"
)
def start_task(
    candidate_task_id: int,
    db: Session = Depends(get_db)
):

    record = db.get(
        CandidateTask,
        candidate_task_id
    )


    if not record:

        raise HTTPException(
            status_code=404,
            detail="Candidate task not found"
        )


    if record.status != "assigned":

        raise HTTPException(
            status_code=400,
            detail="Only assigned tasks can be started"
        )


    record.status = "in_progress"

    record.started_at = datetime.utcnow()


    db.commit()


    return {

        "message": "Task started",

        "status":
            record.status

    }


# =========================================================
# SUBMIT TASK
# =========================================================

@router.post(
    "/candidate-tasks/{candidate_task_id}/submit"
)
def submit_task(
    candidate_task_id: int,
    data: SubmissionCreate,
    db: Session = Depends(get_db)
):

    record = db.get(
        CandidateTask,
        candidate_task_id
    )


    if not record:

        raise HTTPException(
            status_code=404,
            detail="Candidate task not found"
        )


    if record.status not in [
        "assigned",
        "in_progress"
    ]:

        raise HTTPException(
            status_code=400,
            detail="Task cannot be submitted"
        )


    if record.submission:

        raise HTTPException(
            status_code=409,
            detail="Task already submitted"
        )


    if not any([
        data.submission_text,
        data.submission_url,
        data.submission_notes
    ]):

        raise HTTPException(
            status_code=400,
            detail="Submission cannot be empty"
        )


    submission = TaskSubmission(

        candidate_task_id=
            record.id,

        submission_text=
            data.submission_text,

        submission_url=
            data.submission_url,

        submission_notes=
            data.submission_notes

    )


    record.status = "submitted"

    record.submitted_at = datetime.utcnow()


    db.add(submission)

    db.commit()

    db.refresh(submission)


    return {

        "message":
            "Practical evidence submitted",

        "submission_id":
            submission.id,

        "status":
            record.status

    }


# =========================================================
# ASSESS TASK
# =========================================================

@router.post(
    "/candidate-tasks/{candidate_task_id}/assess"
)
def assess_task(
    candidate_task_id: int,
    data: AssessmentCreate,
    db: Session = Depends(get_db)
):

    record = db.get(
        CandidateTask,
        candidate_task_id
    )


    if not record:

        raise HTTPException(
            status_code=404,
            detail="Candidate task not found"
        )


    if record.status != "submitted":

        raise HTTPException(
            status_code=400,
            detail="Task must be submitted before assessment"
        )


    if record.assessment:

        raise HTTPException(
            status_code=409,
            detail="Task already assessed"
        )


    total_score = (
        data.technical_score
        +
        data.process_score
        +
        data.troubleshooting_score
        +
        data.explanation_score
    )


    assessment_status = (
        "passed"
        if total_score >= 70
        else "needs_improvement"
    )


    assessment = TaskAssessment(

        candidate_task_id=
            record.id,

        technical_score=
            data.technical_score,

        process_score=
            data.process_score,

        troubleshooting_score=
            data.troubleshooting_score,

        explanation_score=
            data.explanation_score,

        total_score=
            total_score,

        assessment_status=
            assessment_status,

        assessor_notes=
            data.assessor_notes

    )


    record.status = "assessed"


    db.add(assessment)

    db.commit()

    db.refresh(assessment)


    return {

        "candidate_task_id":
            record.id,

        "technical_score":
            data.technical_score,

        "process_score":
            data.process_score,

        "troubleshooting_score":
            data.troubleshooting_score,

        "explanation_score":
            data.explanation_score,

        "total_score":
            total_score,

        "assessment_status":
            assessment_status

    }