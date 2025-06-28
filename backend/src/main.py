import os
import sys

# Nécessaire pour que la racine du projet puisse être résolue en termes d'imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError

from errors.error_handlers import validation_error_handler
from routers import bonjour

app = FastAPI(title="Dans ma ville")
app.include_router(bonjour.router)
app.exception_handler(RequestValidationError)(validation_error_handler)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}
