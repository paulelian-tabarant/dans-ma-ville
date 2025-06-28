from fastapi import FastAPI

from routers import bonjour

app = FastAPI(title="Dans ma ville")
app.include_router(bonjour.router)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}
