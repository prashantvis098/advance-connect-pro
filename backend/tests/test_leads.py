import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://advance-connect-pro.preview.emergentagent.com').rstrip('/')


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_root(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert "message" in r.json()


def test_create_lead_valid(api):
    payload = {
        "full_name": "TEST_Rahul Kumar",
        "phone": "+919999900001",
        "email": "test_rahul@example.com",
        "business_name": "TEST_Rahul Sellers",
        "marketplace": "Amazon",
        "monthly_sales": "1L-5L",
        "challenge": "Ranking issues",
    }
    r = api.post(f"{BASE_URL}/api/leads", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and len(data["id"]) >= 8
    assert data["full_name"] == payload["full_name"]
    assert data["email"] == payload["email"]
    assert data["marketplace"] == "Amazon"
    assert "created_at" in data

    # verify persistence via GET
    r2 = api.get(f"{BASE_URL}/api/leads")
    assert r2.status_code == 200
    leads = r2.json()
    assert any(l["id"] == data["id"] for l in leads)


def test_create_lead_invalid_email(api):
    payload = {
        "full_name": "TEST_Bad Email",
        "phone": "+919999900002",
        "email": "not-an-email",
        "business_name": "TEST_biz",
        "marketplace": "Flipkart",
    }
    r = api.post(f"{BASE_URL}/api/leads", json=payload)
    assert r.status_code == 422


def test_create_lead_missing_fields(api):
    payload = {"full_name": "TEST_x", "email": "x@example.com"}
    r = api.post(f"{BASE_URL}/api/leads", json=payload)
    assert r.status_code == 422


def test_create_lead_short_name(api):
    payload = {
        "full_name": "A",
        "phone": "+919999900003",
        "email": "a@example.com",
        "business_name": "TEST_biz",
        "marketplace": "Meesho",
    }
    r = api.post(f"{BASE_URL}/api/leads", json=payload)
    assert r.status_code == 422
