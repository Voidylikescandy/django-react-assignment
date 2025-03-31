import os
import django
import random
from decimal import Decimal

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Item

def generate_items(num_items=30):
    """
    Generate sample items for the database
    """
    categories = [choice[0] for choice in Item.CATEGORY_CHOICES]
    
    for i in range(num_items):
        name = f"Item {i+1}"
        description = f"This is a description for item {i+1}. It contains various details about the item."
        price = Decimal(random.uniform(10.0, 1000.0)).quantize(Decimal('0.01'))
        category = random.choice(categories)
        in_stock = random.choice([True, False])
        
        item = Item(
            name=name,
            description=description,
            price=price,
            category=category,
            in_stock=in_stock
        )
        item.save()
        
        print(f"Created item: {name} - {category} - ${price}")
    
    print(f"Successfully generated {num_items} items.")

if __name__ == "__main__":
    generate_items() 