from app.services import notifications


def test_list_categories(client):
    response = client.get("/api/categories")
    assert response.status_code == 200
    categories = response.json()
    assert len(categories) >= 3
    assert any(category["product_count"] >= 1 for category in categories)


def test_search_products(client):
    response = client.get("/api/products", params={"search": "ashwagandha"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] >= 1
    assert payload["items"][0]["common_name"] == "Ashwagandha Extract"
    assert isinstance(payload["items"][0]["forms"], list)


def test_category_products(client):
    response = client.get("/api/categories/herbal-extracts/products")
    assert response.status_code == 200
    payload = response.json()
    assert payload["category"]["slug"] == "herbal-extracts"
    assert payload["items"]
    assert "forms" in payload["items"][0]


def test_list_forms(client):
    response = client.get("/api/forms")
    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 8
    assert any(item["slug"] == "liposomal-technology" for item in payload)


def test_filter_products_by_form(client):
    response = client.get("/api/products", params={"form": "micronization-technology"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] >= 1
    assert all(
        any(form["slug"] == "micronization-technology" for form in item["forms"])
        for item in payload["items"]
    )


def test_filter_category_products_by_form(client):
    response = client.get(
        "/api/categories/herbal-extracts/products",
        params={"form": "phytosome-technology"},
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["items"]
    assert all(
        any(form["slug"] == "phytosome-technology" for form in item["forms"])
        for item in payload["items"]
    )


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
