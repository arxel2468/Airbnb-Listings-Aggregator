# Airbnb Listings Scraper

A Python-based web scraper for collecting Airbnb-style listings data.

## 🚀 Features

- Web scraping of Airbnb listings
- Sample data loading
- Error handling and rate limiting
- Data validation
- Logging support

## 🛠️ Tech Stack

- Python 3.8+
- Requests
- BeautifulSoup4
- Scrapy (optional)

## 📋 Prerequisites

- Python 3.8+
- pip
- Virtual environment (recommended)

## 🚀 Installation & Setup

1. Create and activate virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On Unix or MacOS
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## 📝 Usage

### Using the Sample Data Loader

1. Make sure the backend server is running
2. Run the sample data loader:
   ```bash
   python load_sample.py
   ```

### Using the Scraper

1. Import the scraper in your Python code:
   ```python
   from scraper import AirbnbScraper

   scraper = AirbnbScraper()
   ```

2. Scrape a single listing:
   ```python
   listing = scraper.scrape_listing("https://www.airbnb.com/rooms/example")
   ```

3. Scrape multiple listings:
   ```python
   urls = [
       "https://www.airbnb.com/rooms/example1",
       "https://www.airbnb.com/rooms/example2"
   ]
   listings = scraper.scrape_listings(urls)
   ```

## ⚠️ Notes

- The scraper includes rate limiting to avoid being blocked
- All scraped data is validated before being returned
- Error handling is implemented for network issues and invalid data
- Logging is enabled by default for debugging

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