# Django React Item Management

A full-stack web application for managing items with filtering, sorting, and category grouping capabilities.

## Project Structure

This project consists of two main parts:

- **Backend**: Django REST API with PostgreSQL database (`/backend` directory)
- **Frontend**: React application with Bootstrap UI (`/frontend` directory)

## Features

- RESTful CRUD APIs
- Interactive data table with sorting and filtering
- Category-based data visualization
- Form validation
- Responsive design

## Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL (or SQLite for development)

## Quick Start

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create a superuser (optional)
python manage.py createsuperuser

# Generate sample data (optional)
python generate_sample_data.py

# Run server
python manage.py runserver
```

The backend API will be available at `http://localhost:8000/api/`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend application will be available at `http://localhost:5173/`

## Deployment

See individual README files in backend and frontend directories for detailed deployment instructions.

## License

MIT

## Acknowledgments

- Django Rest Framework
- React
- Bootstrap
- Vite 