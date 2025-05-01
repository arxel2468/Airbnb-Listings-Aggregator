# Airbnb Listings Backend API

A powerful Django REST Framework API for managing Airbnb listings data, providing endpoints for retrieving and storing listing information.

## 🚀 Features

- **RESTful API**:
  - GET endpoints for listing retrieval
  - POST endpoint for adding new listings
  - Detailed listing information

- **Data Management**:
  - MySQL database integration
  - Comprehensive data model
  - Data validation and sanitization
  - Pagination for large datasets

- **Search & Filtering**:
  - Location-based search
  - Price range filtering
  - Rating-based filtering
  - Property type filtering
  - Check-in/check-out date filtering
  - Guests number filtering

## 🛠️ Tech Stack

- Python 3.8+
- Django 5.0.2
- Django REST Framework 3.14.0
- MySQL
- django-cors-headers (for frontend integration)

## 📋 Prerequisites

- Python 3.8+
- MySQL server
- pip
- Virtual environment (recommended)

## 🚀 Installation & Setup

1. Create and activate virtual environment:
   ```bash
   python -m venv .venv
   # On Windows
   .venv\Scripts\activate
   # On Unix or MacOS
   source .venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure MySQL database in `config/settings.py`:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'airbnb_db',
           'USER': 'your_mysql_user',
           'PASSWORD': 'your_mysql_password',
           'HOST': 'localhost',
           'PORT': '3306',
       }
   }
   ```

4. Apply migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Run the development server:
   ```bash
   python manage.py runserver
   ```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/listings/` | GET | List all listings with pagination and filtering |
| `/api/add_listing/` | POST | Add a new listing |
| `/api/listings/<id>/` | GET | Get specific listing details |

### Query Parameters for Listings Endpoint

- `search`: Text search across titles, locations, and descriptions
- `location`: Filter by location (case-insensitive)
- `property_type`: Filter by property type
- `min_price`: Minimum price per night
- `max_price`: Maximum price per night
- `min_rating`: Minimum rating
- `check_in_date`: Filter by check-in date availability
- `check_out_date`: Filter by check-out date availability
- `num_guests`: Filter by number of guests
- `page`: Page number for pagination
- `page_size`: Number of items per page (default: 12, max: 100)

### Add Listing Endpoint Request Format

```json
{
    "title": "Cozy Apartment in NYC",
    "location": "New York, USA",
    "address": "123 Main St",
    "price_per_night": 120,
    "currency": "USD",
    "total_price": 600,
    "image_urls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "ratings": 4.8,
    "description": "A beautiful apartment in the heart of NYC",
    "num_reviews": 150,
    "amenities": ["WiFi", "Kitchen", "Air Conditioning"],
    "host_info": {
        "name": "John Doe",
        "superhost": true
    },
    "property_type": "Apartment"
}
```

## 📊 Data Model

The `Listing` model includes:

- Basic information (title, location, address)
- Pricing details (price per night, currency, total price)
- Media (image URLs)
- Ratings and reviews
- Property details (description, amenities, property type)
- Host information
- Availability (check-in/out dates, number of guests)

## 🔄 Integration with Other Components

- **Scraper**: The backend receives listing data from the scraper component
- **Frontend**: The backend serves listing data to the frontend component

Each component can operate independently, with the backend acting as the central data store and API provider.

## ⚠️ Important Notes

- Ensure MySQL server is running before starting the backend
- Configure CORS settings appropriately for production
- For production deployment, update the `SECRET_KEY` and set `DEBUG=False`
- Consider implementing authentication for the POST endpoint in production 