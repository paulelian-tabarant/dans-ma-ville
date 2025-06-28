from fastapi.testclient import TestClient
from pydantic import BaseModel

from main import app


class RequestBodyAttendu(BaseModel):
    prenom: str
    age: int
    est_actif: bool


def endpoint_pour_test(body: RequestBodyAttendu) -> None:
    return


app.add_api_route(path="/test", endpoint=endpoint_pour_test, methods=["POST"])

client = TestClient(app)


def test_doit_fournir_toutes_les_erreurs_de_validation_du_request_body() -> None:
    response = client.post("/test", json={})
    assert response.status_code == 400
    assert response.json() == {"message": "Field required: prenom; Field required: age; Field required: est_actif"}
