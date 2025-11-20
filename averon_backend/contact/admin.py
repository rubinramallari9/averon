from django.contrib import admin
from .models import Contacts


@admin.register(Contacts)
class ContactsAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email']
    search_fields = ['name', 'email']
    list_filter = ['email']
    readonly_fields = ['id']
    
