def test_dashboard_requires_auth(client):
    response = client.get("/api/admin/dashboard")
    assert response.status_code == 401


def test_category_and_product_crud(client, admin_cookie):
    category_response = client.post(
        "/api/admin/categories",
        json={
            "name": "Botanical Powders",
            "slug": "botanical-powders",
            "description": "Spray-dried botanicals",
            "sort_order": 10,
            "is_active": True,
        },
        cookies=admin_cookie,
    )
    assert category_response.status_code == 201
    category = category_response.json()

    product_response = client.post(
        "/api/admin/products",
        json={
            "category_id": category["id"],
            "common_name": "Moringa Powder",
            "botanical_name": "Moringa oleifera",
            "specification": "80 mesh, low moisture",
            "sort_order": 1,
            "is_active": True,
        },
        cookies=admin_cookie,
    )
    assert product_response.status_code == 201
    product = product_response.json()
    assert product["category"]["slug"] == "botanical-powders"

    update_response = client.put(
        f"/api/admin/products/{product['id']}",
        json={"specification": "100 mesh, low moisture"},
        cookies=admin_cookie,
    )
    assert update_response.status_code == 200
    assert update_response.json()["specification"] == "100 mesh, low moisture"


def test_inquiry_status_update(client, admin_cookie):
    create_response = client.post(
        "/api/inquiries",
        json={
            "source": "inquiry",
            "name": "Aman Verma",
            "company_name": "Nutra World",
            "email": "aman@example.com",
            "phone": "+91 98111 11111",
            "product_requirement": "Vitamin C",
            "message": "Need pricing for export shipment to UAE.",
        },
    )
    assert create_response.status_code == 201
    inquiry_id = create_response.json()["inquiry"]["id"]

    update_response = client.patch(
        f"/api/admin/inquiries/{inquiry_id}",
        json={"status": "contacted"},
        cookies=admin_cookie,
    )
    assert update_response.status_code == 200
    assert update_response.json()["status"] == "contacted"

