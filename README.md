# Airbnb Listings Aggregator

A full-stack web application that aggregates and displays Airbnb-style listings with a modern tech stack.

## 🚀 Features

- **Data Collection**
  - Web scraping of Airbnb-style listings
  - Sample data loading option
  - Rate limiting and error handling
  - Data validation and cleaning
- **Backend**
  - Django REST Framework API
  - MySQL database
  - RESTful endpoints
  - Pagination and filtering
- **Frontend**
  - React.js with modern UI
  - Tailwind CSS for styling
  - Responsive design
  - Error handling and loading states
- **Search & Filter**
  - Location-based search
  - Price range filtering
  - Rating-based sorting
  - Property type filtering
  - Advanced filtering options

## 🛠️ Tech Stack

- **Backend**
  - Django 5.0.2
  - Django REST Framework 3.14.0
  - MySQL
  - django-cors-headers
- **Frontend**
  - React.js
  - Tailwind CSS
  - React Router
  - Axios
- **Data Collection**
  - Python 3.8+
  - Requests
  - BeautifulSoup4
  - Scrapy (optional)

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+
- MySQL
- pip
- npm

## 🚀 Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On Unix or MacOS
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure MySQL database in `config/settings.py`

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Data Collection Setup

See [scraper/README.md](scraper/README.md) for detailed setup instructions.

1. Navigate to the scraper directory:
   ```bash
   cd scraper
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On Unix or MacOS
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Load sample data:
   ```bash
   python load_sample.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/airbnb-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/listings/` | GET | List all listings with pagination and filtering |
| `/api/add_listing/` | POST | Add a new listing |
| `/api/listings/<id>/` | GET | Get specific listing details |

### Query Parameters

- `search`: Text search in title, location, and description
- `location`: Filter by exact location
- `property_type`: Filter by property type
- `min_price`: Minimum price per night
- `max_price`: Maximum price per night
- `min_rating`: Minimum rating
- `page`: Page number for pagination
- `page_size`: Number of items per page (default: 12, max: 100)

## 📊 Data Structure

### Listing Object

```json
{
    "id": "integer",
    "title": "string",
    "location": "string",
    "address": "string",
    "price_per_night": "float",
    "currency": "string",
    "total_price": "float",
    "image_urls": ["string"],
    "ratings": "float",
    "description": "string",
    "num_reviews": "integer",
    "amenities": ["string"],
    "host_info": {
        "name": "string",
        "superhost": "boolean"
    },
    "property_type": "string",
    "created_at": "datetime",
    "updated_at": "datetime",
    "is_active": "boolean"
}
```

## 📸 Screenshots

### Search Results Page
![Search Results](screenshots/search-results.png)

### Listing Details Page
![Listing Page](screenshots/listing-page.png)

## ⚠️ Notes

- Make sure all services (MySQL, Django, React) are running before using the application
- The application is configured to run on default ports (Django: 8000, React: 3000)
- Use the sample data loader if you encounter issues with web scraping
- The scraper includes rate limiting to avoid being blocked
- All data is validated before being stored in the database

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
