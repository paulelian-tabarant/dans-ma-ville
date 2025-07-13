import os
import sys

from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

# Nécessaire pour que la racine du projet puisse être résolue en termes d'imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError

from errors.error_handlers import validation_error_handler
from routers import bonjour

api = FastAPI()
api.include_router(bonjour.router)
api.exception_handler(RequestValidationError)(validation_error_handler)

# TODO: remplacer allow_origins par URL front en prod
#  quand proxy en place dans l'environnement de dev
api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"]
)


@api.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}


app = FastAPI(title="Dans Ma Ville")

app.mount("/api", api)
# L'application front est servie par l'application backend directement
app.mount("/", StaticFiles(directory="static", html=True), name="static")
