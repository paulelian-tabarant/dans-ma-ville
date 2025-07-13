from fastapi.testclient import TestClient
from pydantic import BaseModel

from main import api


class RequestBodyAttendu(BaseModel):
    prenom: str
    age: int
    est_actif: bool


def endpoint_pour_test(body: RequestBodyAttendu) -> None:
    return


api.add_api_route(path="/test", endpoint=endpoint_pour_test, methods=["POST"])

client = TestClient(api)


def test_doit_fournir_toutes_les_erreurs_de_validation_du_request_body() -> None:
    response = client.post("/test", json={})

    assert response.status_code == 400
    assert response.json() == {
        "message": "Field required: prenom; Field required: age; Field required: est_actif"
    }


def test_doit_fournir_seulement_le_message_quand_pas_plus_de_details() -> None:
    response = client.post("/test", json="")

    assert response.status_code == 400
    assert response.json() == {
        "message": "Input should be a valid dictionary or object to extract fields from"
    }
