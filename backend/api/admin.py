from django.contrib import admin
from .models import Item

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'in_stock', 'created_at')
    list_filter = ('category', 'in_stock')
    search_fields = ('name', 'description')
    ordering = ('-created_at',)
