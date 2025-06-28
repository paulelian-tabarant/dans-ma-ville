from pydantic import BaseModel


class ErreurValidationResponseBody(BaseModel):
    detail: list[str]
