# Django Backend API for Item Management

This backend provides RESTful APIs for managing items with filtering and pagination capabilities.

## Setup Instructions

### Prerequisites
- Python 3.8+
- PostgreSQL

### Installation

1. Clone the repository
2. Create and activate a virtual environment:
   ```
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Set up the database:
   ```
   python setup_db.py
   ```
5. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Create a superuser:
   ```
   python manage.py createsuperuser
   ```
7. Optional: Generate sample data:
   ```
   python generate_sample_data.py
   ```

## Running the Server

Start the development server:
```
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

- **Items**: `/api/items/`
  - GET: List all items (paginated)
  - POST: Create a new item
  - PUT/PATCH: Update an item
  - DELETE: Delete an item

## Filtering Options

The API supports the following filters:
- Category: `/api/items/?category=electronics`
- In Stock: `/api/items/?in_stock=true`
- Price Range: `/api/items/?price_min=100&price_max=500`
- Date Range: `/api/items/?created_after=2023-01-01&created_before=2023-12-31`
- Search: `/api/items/?search=keyword`
- Ordering: `/api/items/?ordering=price` or `/api/items/?ordering=-price` (descending) 