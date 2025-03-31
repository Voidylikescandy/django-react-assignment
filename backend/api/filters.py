import django_filters
from .models import Item

class ItemFilter(django_filters.FilterSet):
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr='lte')
    created_after = django_filters.DateTimeFilter(field_name="created_at", lookup_expr='gte')
    created_before = django_filters.DateTimeFilter(field_name="created_at", lookup_expr='lte')
    
    class Meta:
        model = Item
        fields = {
            'category': ['exact'],
            'in_stock': ['exact'],
            'name': ['icontains'],
        } 