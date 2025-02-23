from fastapi import FastAPI

app = FastAPI(title="Dans ma ville")

@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}