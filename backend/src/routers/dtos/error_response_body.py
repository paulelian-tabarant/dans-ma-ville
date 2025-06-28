from pydantic import BaseModel


class ErreurValidationResponseBody(BaseModel):
    message: list[str]
