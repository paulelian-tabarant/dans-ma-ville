import os
import sys

from fastapi.exceptions import RequestValidationError

from exception_handler import validation_exception_handler

# Nécessaire pour que la racine du projet puisse être résolue en termes d'imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI

from routers import bonjour

app = FastAPI(title="Dans ma ville")
app.include_router(bonjour.router)
app.exception_handler(RequestValidationError)(validation_exception_handler)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}
