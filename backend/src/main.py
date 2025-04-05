from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Dans ma ville")


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}


class Personne(BaseModel):
    prenom: str


@app.post('/bonjour')
async def bonjour(personne: Personne) -> dict[str, str]:
    return {"message": "Bonjour, " + personne.prenom + " !"}
