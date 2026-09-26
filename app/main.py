from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import jobs
from app.routers import candidates
from app.routers import roles


app = FastAPI(
    title="SWAMARGA API",
    description="Skill & Workforce Alignment through Market Analysis, Readiness, Guidance & Advancement",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    jobs.router
)

app.include_router(
    candidates.router
)

app.include_router(
    roles.router
)


@app.get("/")
def root():

    return {
        "message": "SWAMARGA backend is working",
        "status": "online"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }