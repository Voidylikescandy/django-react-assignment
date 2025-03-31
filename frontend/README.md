# React Frontend for Item Management

This frontend provides a user interface for managing items with filtering, sorting, and category grouping.

## Setup Instructions

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Development Server

Start the development server:
```
npm run dev
```

The frontend will be available at `http://localhost:5173/`

## Features

- **Item List Page**: Main page with a data table showing all items
  - Filtering by name, category, price range, and stock status
  - Sorting by clicking column headers
  - Pagination
  - CRUD operations through modals

- **Category Groups Page**: View items grouped by category with summary statistics
  - Total count per category
  - In-stock count
  - Total value
  - Average price

## Project Structure

- `src/components/`: Reusable React components
- `src/pages/`: Page components for different routes
- `src/services/`: API service for backend communication
- `src/utils/`: Utility functions and helpers

## Technologies Used

- React
- React Router for navigation
- Axios for API requests
- React Bootstrap for UI components
- Formik and Yup for form validation
- Font Awesome for icons
