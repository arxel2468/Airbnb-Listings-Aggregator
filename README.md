# Airbnb Listings Aggregator

A full-stack web application that aggregates and displays Airbnb-style listings with a modern tech stack.

## 🚀 Features

- **Data Collection**
  - Web scraping of Airbnb-style listings
  - Sample data loading option
- **Backend**
  - Django REST Framework API
  - MySQL database
  - RESTful endpoints
- **Frontend**
  - React.js with modern UI
  - Tailwind CSS for styling
  - Responsive design
- **Search & Filter**
  - Location-based search
  - Price range filtering
  - Rating-based sorting
  - Advanced filtering options

## 🛠️ Tech Stack

- **Backend**
  - Django
  - Django REST Framework
  - MySQL
- **Frontend**
  - React.js
  - Tailwind CSS
- **Data Collection**
  - Scrapy
  - Requests

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

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Data Collection Setup

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
   pip install scrapy requests
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
| `/api/listings/` | GET | List all listings |
| `/api/add_listing/` | POST | Add a new listing |
| `/api/listings/<id>/` | GET | Get specific listing details |

## 📸 Screenshots

### Search Results Page
![Search Results](screenshots/search-results.png)

### Listing Details Page
![Listing Page](screenshots/listing-page.png)

## ⚠️ Notes

- If you encounter issues with web scraping due to Airbnb restrictions, use the sample data loader script
- Make sure all services (MySQL, Django, React) are running before using the application
- The application is configured to run on default ports (Django: 8000, React: 3000)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **3. Push All Changes**

```bash
git add .
git commit -m "Add screenshots and README for submission"
git push origin main
