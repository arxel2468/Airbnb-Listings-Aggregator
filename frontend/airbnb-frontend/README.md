# Airbnb Listings Frontend

A modern, responsive React application that displays Airbnb listings with search and filtering capabilities, styled to closely resemble the actual Airbnb website.

## 🚀 Features

- **Modern UI**:
  - Pixel-perfect recreation of Airbnb's interface
  - Responsive design for all devices
  - Clean, intuitive user experience

- **Search & Filtering**:
  - Location-based search
  - Date-range selection (check-in/check-out)
  - Guest count filtering
  - Price range filtering
  - Ratings filtering
  - Property type categories

- **Listing Display**:
  - Grid layout for search results
  - Detailed listing pages
  - Image galleries
  - Pricing and rating information
  - Amenities and property details

- **User Experience**:
  - Loading states and animations
  - Error handling
  - Responsive feedback
  - Toast notifications

## 🛠️ Tech Stack

- React.js (Create React App)
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- React-Toastify for notifications

## 🚀 Installation & Setup

1. Install dependencies:
   ```bash
   cd frontend/airbnb-frontend
   npm install
   ```

2. Configure API endpoint (if needed):
   - By default, the application connects to `http://localhost:8000`
   - To change this, you can set the `REACT_APP_API_URL` environment variable

3. Start the development server:
   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📚 Project Structure

- `src/components/`: React components
  - `SearchBar.js`: Search functionality with filters
  - `ListingsGrid.js`: Grid display of listings
  - `ListingCard.js`: Individual listing card
  - `ListingDetails.js`: Detailed view of a listing

- `src/services/`: API services
  - `api.js`: Functions for API requests

- `src/App.js`: Main application with routing

## 🔄 Integration with Backend

This frontend application fetches data from the Django REST Framework backend. Key integration points:

- **Listings Data**: Fetched from `/api/listings/` with query parameters
- **Listing Details**: Fetched from `/api/listings/<id>/`
- **Error Handling**: Manages API failures gracefully

## 📱 Pages

1. **Home/Search Results Page**:
   - Search bar for filtering
   - Category filters
   - Grid of listing cards
   - Price toggle

2. **Listing Details Page**:
   - Photo gallery
   - Property information
   - Pricing details
   - Amenities
   - Host information

## 🔧 Customization

You can customize various aspects of the UI:

- Colors: Update Tailwind theme in `tailwind.config.js`
- Layout: Modify grid settings in `ListingsGrid.js`
- Filters: Adjust available filters in `SearchBar.js`

## ⚠️ Important Notes

- Ensure the backend API is running before starting the frontend
- For production deployment, build the app and serve it with a proper web server
- Images are served from the API, so ensure proper CORS configuration
