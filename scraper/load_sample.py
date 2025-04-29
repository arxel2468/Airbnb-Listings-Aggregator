import requests
sample = {
    "title": "Cozy Apartment in NYC",
    "location": "New York, USA",
    "price_per_night": 120,
    "currency": "USD",
    "total_price": 240,
    "image_urls": ["https://example.com/image1.jpg"],
    "ratings": 4.8,
    "description": "A cozy apartment in the heart of NYC.",
    "num_reviews": 150,
    "amenities": ["WiFi", "Kitchen", "Air Conditioning"],
    "host_info": {"name": "John Doe", "superhost": True},
    "property_type": "Apartment",
}
response = requests.post("http://localhost:8000/api/add_listing/", json=sample)
print(response.json())