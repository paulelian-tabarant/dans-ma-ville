from pydantic import BaseModel


class ErreurResponseBody(BaseModel):
    message: str
