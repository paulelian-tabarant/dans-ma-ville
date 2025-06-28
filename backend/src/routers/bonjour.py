from fastapi import APIRouter
from pydantic import BaseModel

from errors.error_response_body import ErreurResponseBody

router = APIRouter(
    prefix="/bonjour",
    tags=["Hello, World"],
)


class BonjourRequestBody(BaseModel):
    prenom: str


class BonjourResponseBody(BaseModel):
    message: str


@router.post(
    "/",
    response_model=BonjourResponseBody,
    responses={400: {"model": ErreurResponseBody}},
)
async def post_bonjour(personne: BonjourRequestBody) -> BonjourResponseBody:
    return BonjourResponseBody(message="Bonjour, " + personne.prenom + " !")
