from fastapi.testclient import TestClient
from fastapi import status
from . import ensure_authentication


def test_endpoint_authentication(client: TestClient):
    ensure_authentication(client, "post", "/imports/clearcuts")


def test_post_clearcut_success(imports_client: TestClient):
    clearcut_data = {
        "department_code": "75",
        "cut_date": "2024-01-01",
        "slope_percentage": 15,
        "location": "POINT(2.3522 48.8566)",
        "boundary": "MULTIPOLYGON(((2.3522 48.8566, 2.3622 48.8566, 2.3622 48.8666, 2.3522 48.8566)))",
        "name_natura": "Test Nature",
        "number_natura": "123",
        "address": "Test Address",
    }

    response = imports_client.post("/imports/clearcuts", json=clearcut_data)

    data = response.json()
    print(data)
    assert response.status_code == status.HTTP_200_OK

    assert "id" in data
    assert isinstance(data["department_code"], str)
    assert isinstance(data["cut_date"], str)
    assert isinstance(data["slope_percentage"], float)
    assert data["location"].startswith("POINT")
    assert data["boundary"].startswith("MULTIPOLYGON")


def test_post_clearcut_invalid_data(imports_client: TestClient):
    invalid_data = {}

    response = imports_client.post("/imports/clearcuts", json=invalid_data)

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
