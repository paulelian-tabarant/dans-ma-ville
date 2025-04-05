from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_doit_dire_bonjour_avec_le_nom_de_la_personne():
    response = client.post('/bonjour', json={"nom": "Jean-Pierre"})
    assert response.status_code == 200
    assert response.json() == {"message": "Bonjour Jean-Pierre !"}
