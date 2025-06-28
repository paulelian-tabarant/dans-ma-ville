from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/bonjour",
    tags=["bonjour"],
)


class Personne(BaseModel):
    prenom: str


@router.post("/")
async def post_bonjour(personne: Personne):
    return {"message": "Bonjour, " + personne.prenom + " !"}
