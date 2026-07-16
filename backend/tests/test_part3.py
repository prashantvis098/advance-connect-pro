"""Part 3 backend tests: /api/chat streaming, /api/newsletter, and regression on /api/leads."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://advance-connect-pro.preview.emergentagent.com').rstrip('/')


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- /api/newsletter ----------
def test_newsletter_valid(api):
    email = f"test_news_{uuid.uuid4().hex[:8]}@example.com"
    r = api.post(f"{BASE_URL}/api/newsletter", json={"email": email})
    assert r.status_code == 200, r.text
    assert r.json().get("status") == "subscribed"


def test_newsletter_duplicate_is_idempotent(api):
    email = f"test_dup_{uuid.uuid4().hex[:8]}@example.com"
    r1 = api.post(f"{BASE_URL}/api/newsletter", json={"email": email})
    r2 = api.post(f"{BASE_URL}/api/newsletter", json={"email": email})
    assert r1.status_code == 200
    assert r2.status_code == 200
    assert r2.json().get("status") == "subscribed"


def test_newsletter_invalid_email(api):
    r = api.post(f"{BASE_URL}/api/newsletter", json={"email": "not-an-email"})
    assert r.status_code == 422


# ---------- /api/chat (streaming) ----------
def test_chat_stream_returns_text(api):
    session_id = f"test-{uuid.uuid4().hex[:12]}"
    with api.post(
        f"{BASE_URL}/api/chat",
        json={"session_id": session_id, "message": "What services do you provide for Amazon sellers?"},
        stream=True,
        timeout=60,
    ) as r:
        assert r.status_code == 200, r.text
        chunks = []
        for chunk in r.iter_content(chunk_size=None, decode_unicode=True):
            if chunk:
                chunks.append(chunk)
        body = "".join(chunks)
        assert len(body) > 20, f"Response too short: {body!r}"
        # Should mention marketplace/amazon/audit context
        low = body.lower()
        assert any(k in low for k in ["amazon", "marketplace", "audit", "advance connect", "ppc", "listing"]), body


def test_chat_context_persists_in_session(api):
    session_id = f"test-{uuid.uuid4().hex[:12]}"

    def send(msg):
        with api.post(
            f"{BASE_URL}/api/chat",
            json={"session_id": session_id, "message": msg},
            stream=True,
            timeout=60,
        ) as r:
            assert r.status_code == 200
            return "".join(c for c in r.iter_content(chunk_size=None, decode_unicode=True) if c)

    a1 = send("I sell handmade candles on Flipkart.")
    a2 = send("What should I do first?")
    assert len(a1) > 10 and len(a2) > 10


def test_chat_invalid_payload(api):
    r = api.post(f"{BASE_URL}/api/chat", json={"session_id": "x", "message": ""})
    assert r.status_code == 422


# ---------- /api/leads regression ----------
def test_leads_regression(api):
    payload = {
        "full_name": "TEST_Part3 Regression",
        "phone": "+919999900010",
        "email": f"test_p3_{uuid.uuid4().hex[:6]}@example.com",
        "business_name": "TEST_P3 Biz",
        "marketplace": "Amazon",
        "source": "contact_form",
    }
    r = api.post(f"{BASE_URL}/api/leads", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["source"] == "contact_form"
    assert "id" in data
