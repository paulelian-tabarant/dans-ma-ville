from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_doit_dire_bonjour_avec_le_nom_de_la_personne() -> None:
    response = client.post("/bonjour", json={"prenom": "Jean-Pierre"})
    assert response.status_code == 200
    assert response.json() == {"message": "Bonjour, Jean-Pierre !"}


def test_doit_retourner_400_si_pas_de_nom_fourni() -> None:
    response = client.post("/bonjour", json={})
    assert response.status_code == 400
