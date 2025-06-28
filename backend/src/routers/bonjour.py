from fastapi import APIRouter
from pydantic import BaseModel

from routers.dtos.error_response_body import ErrorResponseBody

router = APIRouter(
    prefix="/bonjour",
    tags=["Hello, World"],
)


class BonjourRequestBody(BaseModel):
    prenom: str


class BonjourResponseBody(BaseModel):
    message: str


@router.post("/",
             response_model=BonjourResponseBody,
             responses={
                 400: {"model": ErrorResponseBody}
             })
async def post_bonjour(personne: BonjourRequestBody) -> BonjourResponseBody:
    return BonjourResponseBody(message="Bonjour, " + personne.prenom + " !")
