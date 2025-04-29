import scrapy
import json
import requests

class AirbnbSpider(scrapy.Spider):
    name = "airbnb"
    allowed_domains = ["airbnb.com"]

    def __init__(self, location="", checkin="", checkout="", guests="1", *args, **kwargs):
        super(AirbnbSpider, self).__init__(*args, **kwargs)
        self.location = location
        self.checkin = checkin
        self.checkout = checkout
        self.guests = guests

    def start_requests(self):
        search_url = (
            f"https://www.airbnb.com/s/{self.location}/homes?"
            f"checkin={self.checkin}&checkout={self.checkout}&adults={self.guests}"
        )
        yield scrapy.Request(search_url, callback=self.parse)

    def parse(self, response):
        listings = response.css('div[data-testid="property-card"]')
        for listing in listings:
            try:
                title = listing.css('div[aria-label]::attr(aria-label)').get() or ""
                location = self.location
                price_text = listing.css("span[data-testid='price-string']::text").get() or ""
                price_per_night = (
                    float(''.join([c for c in price_text if c.isdigit() or c == "."])) if price_text else 0
                )
                currency = "".join([c for c in price_text if not c.isdigit() and c != "."])
                image_urls = listing.css("img::attr(src)").getall()
                ratings = None
                rating_text = listing.css("span[aria-label*='rating']::text").get()
                if rating_text:
                    try:
                        ratings = float(rating_text.split()[0])
                    except:
                        ratings = None
                description = listing.css("meta[name='description']::attr(content)").get() or ""
                num_reviews = None
                review_text = listing.css("span[aria-label*='reviews']::text").get()
                if review_text:
                    try:
                        num_reviews = int("".join([c for c in review_text if c.isdigit()]))
                    except:
                        num_reviews = None
                
                amenities = []
                property_type = listing.css('div[data-testid="listing-card-title"]::text').get() or ""
                host_info = {}

                data = {
                    "title": title,
                    "location": location,
                    "price_per_night": price_per_night,
                    "currency": currency.strip(),
                    "total_price": price_per_night,  # Could be multiplied by nights
                    "image_urls": image_urls,
                    "ratings": ratings,
                    "description": description,
                    "num_reviews": num_reviews,
                    "amenities": amenities,
                    "host_info": host_info,
                    "property_type": property_type,
                }

                # POST to backend
                headers = {"Content-Type": "application/json"}
                response_backend = requests.post(
                    "http://localhost:8000/api/add_listing/",
                    data=json.dumps(data),
                    headers=headers,
                    timeout=10
                )
                print(f"POSTED: {title} - Status: {response_backend.status_code}")

            except Exception as e:
                self.logger.error(f"Error processing listing: {e}")

        # Pagination
        next_page = response.css("a[aria-label='Next']::attr(href)").get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)