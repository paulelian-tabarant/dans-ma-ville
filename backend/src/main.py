import os
import sys

from starlette.requests import Request

# Nécessaire pour que la racine du projet puisse être résolue en termes d'imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError

from routers import bonjour

app = FastAPI(title="Dans ma ville")
app.include_router(bonjour.router)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    _: Request, error: RequestValidationError
) -> None:
    raise HTTPException(status_code=400, detail=error.errors())
