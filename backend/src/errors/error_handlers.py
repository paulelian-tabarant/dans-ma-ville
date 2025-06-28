from fastapi.exceptions import RequestValidationError
from starlette.requests import Request
from starlette.responses import JSONResponse


async def validation_error_handler(
    _: Request, error: RequestValidationError
) -> JSONResponse:
    messages = list(map(lambda erreur: convertir_en_message(erreur), error.errors()))

    return JSONResponse({"message": "; ".join(messages)}, status_code=400)


def convertir_en_message(erreur: dict[str, str]) -> str:
    return f"{erreur['msg']}: {erreur['loc'][1]}"
