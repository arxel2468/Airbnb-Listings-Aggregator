import requests
import time
from typing import List, Dict
import logging
import sys
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# API URL
API_URL = "http://localhost:8000/api/add_listing/"

# Sample listings data
SAMPLE_LISTINGS = [
    {
        "title": "Cozy Apartment in NYC",
        "location": "New York, USA",
        "price_per_night": 120,
        "currency": "USD",
        "total_price": 3600,
        "image_urls": [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
        ],
        "ratings": 4.8,
        "description": "A cozy apartment in the heart of NYC with amazing views and modern amenities.",
        "num_reviews": 150,
        "amenities": ["WiFi", "Kitchen", "Air Conditioning", "TV", "Washer"],
        "host_info": {"name": "John Doe", "superhost": True},
        "property_type": "Apartment"
    },
    {
        "title": "Luxury Villa in Bali",
        "location": "Bali, Indonesia",
        "price_per_night": 250,
        "currency": "USD",
        "total_price": 7500,
        "image_urls": [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
        ],
        "ratings": 4.9,
        "description": "Experience luxury in this beautiful villa with private pool and ocean views.",
        "num_reviews": 89,
        "amenities": ["Pool", "WiFi", "Kitchen", "Air Conditioning", "TV", "Washer", "Gym"],
        "host_info": {"name": "Sarah Smith", "superhost": True},
        "property_type": "Villa"
    },
    {
        "title": "Mountain Cabin Retreat",
        "location": "Colorado, USA",
        "price_per_night": 180,
        "currency": "USD",
        "total_price": 5400,
        "image_urls": [
            "https://images.unsplash.com/photo-1475855581690-80accde3ae2b",
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"
        ],
        "ratings": 4.7,
        "description": "Escape to this peaceful mountain cabin with stunning views and hiking trails.",
        "num_reviews": 112,
        "amenities": ["WiFi", "Kitchen", "Fireplace", "TV", "Washer", "Hot Tub"],
        "host_info": {"name": "Mike Johnson", "superhost": False},
        "property_type": "Cabin"
    }
]

def check_backend_connection():
    """Check if the backend server is running and accessible."""
    try:
        response = requests.get("http://localhost:8000/api/listings/")
        return response.status_code == 200
    except requests.exceptions.ConnectionError:
        return False

def load_sample_listings(listings: List[Dict]) -> None:
    """Load sample listings into the database."""
    if not check_backend_connection():
        logger.error("Backend server is not running. Please start the backend server first.")
        sys.exit(1)

    for listing in listings:
        try:
            response = requests.post(API_URL, json=listing)
            response.raise_for_status()
            logger.info(f"Successfully added listing: {listing['title']}")
            time.sleep(1)  # Avoid overwhelming the server
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to add listing {listing['title']}: {str(e)}")
            if hasattr(e.response, 'text'):
                logger.error(f"Response: {e.response.text}")
        except Exception as e:
            logger.error(f"Unexpected error while adding listing {listing['title']}: {str(e)}")

if __name__ == "__main__":
    # Check if running in virtual environment
    if not hasattr(sys, 'real_prefix') and not (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        logger.warning("Not running in a virtual environment. It's recommended to use a virtual environment.")

    logger.info("Starting to load sample listings...")
    load_sample_listings(SAMPLE_LISTINGS)
    logger.info("Finished loading sample listings.")