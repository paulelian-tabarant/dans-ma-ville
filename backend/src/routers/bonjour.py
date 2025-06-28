from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/bonjour",
    tags=["Hello, World"],
)


class BonjourRequestBody(BaseModel):
    prenom: str


class BonjourResponseBody(BaseModel):
    message: str


@router.post("/")
async def post_bonjour(personne: BonjourRequestBody) -> BonjourResponseBody:
    return BonjourResponseBody(message="Bonjour, " + personne.prenom + " !")
