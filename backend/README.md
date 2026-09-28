# SWAMARGA Backend MVP

FastAPI + SQLite backend for the SIH-style SWAMARGA demonstration.

## Data policy

- Candidate/company/job records are SYNTHETIC.
- Job descriptions are illustrative and are not copied from a real vacancy.
- District/dashboard numbers are ILLUSTRATIVE and explicitly labelled as such.
- The skill taxonomy is a practical normalized taxonomy; public occupational sources are used as supporting references, not as claims that the demo data is official.
- Research/source references are listed below.

## Run on Windows PowerShell

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python seed.py
uvicorn app.main:app --reload --port 8000
```

Open:
http://127.0.0.1:8000/docs

## Core demo flow

1. `GET /jobs`
2. `GET /candidates/1`
3. `GET /candidates/1/skill-gap?role=Cloud%20Support%20Associate`
4. `GET /candidates/1/evidence-gap`
5. `GET /tasks/recommended/1`
6. `POST /tasks/1/submit`
7. `POST /submissions/{id}/assess`
8. `POST /evidence/{id}/validate`
9. `GET /candidates/1/passport`
10. `GET /analytics/skill-gaps`
11. `GET /recommendations`

## Demo login

candidate@swamarga.demo / demo123
employer@swamarga.demo / demo123
institute@swamarga.demo / demo123
government@swamarga.demo / demo123

## Public supporting sources

- O*NET Computer User Support Specialists: https://www.onetonline.org/link/details/15-1232.00
- ESCO digital skills / occupations: https://esco.ec.europa.eu/
- World Economic Forum Future of Jobs 2025: https://www.weforum.org/publications/future-of-jobs-report-2025/

These sources support the general occupational/skills framing. They do NOT validate the synthetic candidate, employer, vacancy, scores, or district figures in this prototype.
