from http import HTTPStatus

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_health_check() -> None:
    response = client.get("/health")
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {"status": "healthy"}
