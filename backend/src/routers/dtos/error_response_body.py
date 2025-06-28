from pydantic import BaseModel


class ErrorResponseBody(BaseModel):
    detail: list[str]
