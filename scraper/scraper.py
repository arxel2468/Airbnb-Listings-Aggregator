import requests
from bs4 import BeautifulSoup
import time
import random
import logging
from typing import Dict, List, Optional
from datetime import datetime, date
import re
from dataclasses import dataclass

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class SearchParams:
    location: str
    check_in: date
    check_out: date
    guests: int

class AirbnbScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.base_url = "https://www.airbnb.com"
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def _get_random_delay(self) -> float:
        """Return a random delay between 2 and 5 seconds to avoid rate limiting."""
        return random.uniform(2, 5)

    def _build_search_url(self, params: SearchParams) -> str:
        """Build the search URL with the given parameters."""
        return f"{self.base_url}/s/{params.location}/homes?checkin={params.check_in}&checkout={params.check_out}&adults={params.guests}"

    def _validate_price(self, price_str: str) -> Optional[float]:
        """Validate and convert price string to float."""
        try:
            # Remove currency symbols and commas
            price = re.sub(r'[^\d.]', '', price_str)
            return float(price)
        except (ValueError, TypeError):
            logger.warning(f"Invalid price format: {price_str}")
            return None

    def _validate_rating(self, rating_str: str) -> Optional[float]:
        """Validate and convert rating string to float."""
        try:
            return float(rating_str)
        except (ValueError, TypeError):
            logger.warning(f"Invalid rating format: {rating_str}")
            return None

    def _validate_reviews(self, reviews_str: str) -> Optional[int]:
        """Validate and convert reviews string to integer."""
        try:
            # Extract numbers from string like "150 reviews"
            num = re.search(r'\d+', reviews_str)
            return int(num.group()) if num else None
        except (ValueError, TypeError):
            logger.warning(f"Invalid reviews format: {reviews_str}")
            return None

    def _extract_amenities(self, soup: BeautifulSoup) -> List[str]:
        """Extract amenities from the listing page."""
        amenities = []
        try:
            amenities_section = soup.find('div', {'class': '_1byskwn'})
            if amenities_section:
                for amenity in amenities_section.find_all('div', {'class': '_1nlbjeu'}):
                    amenities.append(amenity.text.strip())
        except Exception as e:
            logger.warning(f"Error extracting amenities: {str(e)}")
        return amenities

    def _extract_host_info(self, soup: BeautifulSoup) -> Dict[str, any]:
        """Extract host information from the listing page."""
        host_info = {'name': None, 'superhost': False}
        try:
            host_section = soup.find('div', {'class': '_1byskwn'})
            if host_section:
                name_elem = host_section.find('div', {'class': '_1nlbjeu'})
                if name_elem:
                    host_info['name'] = name_elem.text.strip()
                superhost_elem = host_section.find('div', {'class': '_1nlbjeu'})
                host_info['superhost'] = bool(superhost_elem)
        except Exception as e:
            logger.warning(f"Error extracting host info: {str(e)}")
        return host_info

    def scrape_listing(self, url: str) -> Optional[Dict]:
        """Scrape a single Airbnb listing."""
        try:
            time.sleep(self._get_random_delay())
            response = self.session.get(url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract listing details
            title = soup.find('h1', {'class': '_1byskwn'}).text.strip()
            location = soup.find('div', {'class': '_1nlbjeu'}).text.strip()
            price_str = soup.find('span', {'class': '_1byskwn'}).text.strip()
            price = self._validate_price(price_str)
            
            if not price:
                logger.warning(f"Skipping listing due to invalid price: {url}")
                return None

            # Extract images
            image_urls = []
            for img in soup.find_all('img', {'class': '_1byskwn'}):
                if img.get('src'):
                    image_urls.append(img['src'])

            # Extract ratings and reviews
            rating_str = soup.find('div', {'class': '_1byskwn'}).text.strip()
            rating = self._validate_rating(rating_str)
            reviews_str = soup.find('div', {'class': '_1nlbjeu'}).text.strip()
            num_reviews = self._validate_reviews(reviews_str)

            # Extract description
            description = soup.find('div', {'class': '_1byskwn'}).text.strip()

            # Extract additional details
            amenities = self._extract_amenities(soup)
            host_info = self._extract_host_info(soup)

            return {
                'title': title,
                'location': location,
                'price_per_night': price,
                'currency': 'USD',  # Default to USD, can be extracted if needed
                'total_price': price * 30,  # Assuming 30-day stay
                'image_urls': image_urls,
                'ratings': rating,
                'description': description,
                'num_reviews': num_reviews,
                'amenities': amenities,
                'host_info': host_info,
                'property_type': self._determine_property_type(title, description),
                'scraped_at': datetime.now().isoformat()
            }

        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed for {url}: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Error scraping {url}: {str(e)}")
            return None

    def scrape_listings(self, params: SearchParams) -> List[Dict]:
        """Scrape multiple Airbnb listings based on search parameters."""
        listings = []
        try:
            search_url = self._build_search_url(params)
            response = self.session.get(search_url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract listing URLs from search results
            listing_urls = []
            for link in soup.find_all('a', {'class': '_1byskwn'}):
                if link.get('href'):
                    listing_urls.append(f"{self.base_url}{link['href']}")

            # Scrape each listing
            for url in listing_urls:
                listing = self.scrape_listing(url)
                if listing:
                    listings.append(listing)
                time.sleep(self._get_random_delay())

        except requests.exceptions.RequestException as e:
            logger.error(f"Search request failed: {str(e)}")
        except Exception as e:
            logger.error(f"Error during scraping: {str(e)}")

        return listings

    def _determine_property_type(self, title: str, description: str) -> str:
        """Determine property type based on title and description."""
        property_types = {
            'apartment': ['apartment', 'flat', 'condo'],
            'house': ['house', 'home', 'villa'],
            'cabin': ['cabin', 'cottage', 'chalet'],
            'room': ['room', 'private room', 'shared room'],
            'unique': ['unique', 'special', 'unusual']
        }

        text = (title + ' ' + description).lower()
        for prop_type, keywords in property_types.items():
            if any(keyword in text for keyword in keywords):
                return prop_type.capitalize()
        return 'Other'

if __name__ == "__main__":
    scraper = AirbnbScraper()
    # Example usage
    params = SearchParams(
        location="New-York--NY",
        check_in=date(2024, 5, 1),
        check_out=date(2024, 5, 7),
        guests=2
    )
    listings = scraper.scrape_listings(params)
    logger.info(f"Successfully scraped {len(listings)} listings") 