# Airbnb Listings Scraper

A comprehensive web scraper for collecting Airbnb listings data, built with both Scrapy and Python requests.

## 🚀 Features

- **Advanced Web Scraping**:
  - Scrapy spider for efficient crawling
  - Handling of pagination for complete data collection
  - Extraction of detailed listing information
  - Automatic submission to backend API

- **Data Collection**:
  - Listing title, location, and description
  - Price information (per night, total)
  - Ratings and number of reviews
  - Image URLs
  - Property type and amenities
  - Host information

- **Reliability**:
  - Error handling and rate limiting
  - Data validation
  - Robust logging

## 🛠️ Tech Stack

- Python 3.8+
- Scrapy framework
- Requests library
- BeautifulSoup4 (for data parsing)

## 📋 Prerequisites

- Python 3.8+
- pip
- Virtual environment (recommended)
- Backend API running (Django server)

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

## 📝 Usage

### Using the Scrapy Spider

1. Make sure the backend server is running at `http://localhost:8000`

2. Run the spider with parameters:
   ```bash
   cd scraper
   scrapy crawl airbnb -a location="New-York--NY" -a checkin="2024-05-01" -a checkout="2024-05-07" -a guests=2
   ```

   You can customize the following parameters:
   - `location`: The location to search for listings
   - `checkin`: Check-in date (YYYY-MM-DD)
   - `checkout`: Check-out date (YYYY-MM-DD)
   - `guests`: Number of guests

### Using the Sample Data Loader

If you don't want to run the scraper to collect real data, you can use the sample data loader:

```bash
python load_sample.py
```

This will load pre-defined sample listings into your database through the backend API.

### Using the Direct Scraper

You can also use the direct scraper implementation (non-Scrapy):

```python
from scraper import AirbnbScraper
from datetime import date

scraper = AirbnbScraper()
params = SearchParams(
    location="New-York--NY",
    check_in=date(2024, 5, 1),
    check_out=date(2024, 5, 7),
    guests=2
)
listings = scraper.scrape_listings(params)
```

## 🔄 Data Flow

1. The scraper collects data from Airbnb's website
2. It processes and formats the data
3. Each listing is sent to the Django backend via a POST request
4. The backend stores the data in the MySQL database
5. The frontend can then display this data to users

## ⚠️ Important Notes

- This scraper is for educational purposes only
- Respect Airbnb's robots.txt and terms of service
- Use rate limiting to avoid being blocked
- The scraper needs to be updated if Airbnb changes their website structure

## 🤝 Project Architecture

The scraper is one component of a three-part architecture:

1. **Scraper**: Collects data from Airbnb (this component)
2. **Backend**: Django REST API that stores and serves data
3. **Frontend**: React application that displays the data to users

Each component can operate independently, with the scraper feeding data to the backend, which in turn serves the frontend.

## 📊 Data Structure

The scraper returns listings in the following format:
```python
{
    'title': str,
    'location': str,
    'price_per_night': float,
    'currency': str,
    'total_price': float,
    'image_urls': List[str],
    'ratings': float,
    'description': str,
    'num_reviews': int,
    'amenities': List[str],
    'host_info': Dict[str, any],
    'property_type': str,
    'scraped_at': str
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 