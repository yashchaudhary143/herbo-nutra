from app.services import notifications


def test_list_categories(client):
    response = client.get("/api/categories")
    assert response.status_code == 200
    categories = response.json()
    assert len(categories) >= 3
    assert categories[0]["product_count"] >= 1


def test_search_products(client):
    response = client.get("/api/products", params={"search": "ashwagandha"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] >= 1
    assert payload["items"][0]["common_name"] == "Ashwagandha Extract"


def test_category_products(client):
    response = client.get("/api/categories/herbal-extracts/products")
    assert response.status_code == 200
    payload = response.json()
    assert payload["category"]["slug"] == "herbal-extracts"
    assert payload["items"]


def test_submit_inquiry_with_notification_fallback(client, monkeypatch):
    monkeypatch.setattr(notifications, "send_email_notification", lambda *args, **kwargs: "failed")
    monkeypatch.setattr(notifications, "send_whatsapp_notification", lambda *args, **kwargs: "failed")

    response = client.post(
        "/api/inquiries",
        json={
            "source": "contact",
            "name": "Riya Sharma",
            "company_name": "Wellness Labs",
            "email": "riya@example.com",
            "phone": "+91 99000 00000",
            "product_requirement": "Turmeric Extract",
            "message": "Looking for MOQ and export compliance details for turmeric extract.",
        },
    )
    assert response.status_code == 201
    payload = response.json()
    assert payload["inquiry"]["company_name"] == "Wellness Labs"
    assert payload["email_status"] == "failed"
    assert payload["whatsapp_status"] == "failed"

