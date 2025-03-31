import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def setup_database():
    """
    Create PostgreSQL database if it doesn't exist
    """
    try:
        # Connect to PostgreSQL server
        conn = psycopg2.connect(
            user="postgres",
            password="postgres",
            host="localhost",
            port="5432"
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        
        # Create a cursor
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'django_react_db'")
        exists = cursor.fetchone()
        
        if not exists:
            # Create database
            cursor.execute("CREATE DATABASE django_react_db")
            print("Database 'django_react_db' created successfully.")
        else:
            print("Database 'django_react_db' already exists.")
            
        # Close cursor and connection
        cursor.close()
        conn.close()
        
        return True
    except Exception as e:
        print(f"An error occurred while setting up the database: {e}")
        return False

if __name__ == "__main__":
    setup_database() 