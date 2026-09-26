from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return {
        "message": "SWAMARGA backend is working"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }