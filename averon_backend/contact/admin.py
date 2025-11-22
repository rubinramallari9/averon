from django.contrib import admin
from django.utils.html import format_html
from .models import Contacts


@admin.register(Contacts)
class ContactsAdmin(admin.ModelAdmin):
    """
    Enhanced admin interface for Contact model with security features
    """
    list_display = [
        'id', 'name', 'email', 'created_at',
        'is_processed', 'colored_status', 'ip_address'
    ]
    list_filter = [
        'is_processed', 'created_at', 'updated_at'
    ]
    search_fields = [
        'name', 'email', 'message', 'ip_address'
    ]
    readonly_fields = [
        'id', 'created_at', 'updated_at',
        'ip_address', 'user_agent', 'processed_at'
    ]
    ordering = ['-created_at']
    date_hierarchy = 'created_at'
    list_per_page = 25

    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'message')
        }),
        ('Status', {
            'fields': ('is_processed', 'processed_at')
        }),
        ('Audit Information', {
            'fields': ('id', 'created_at', 'updated_at', 'ip_address', 'user_agent'),
            'classes': ('collapse',)
        }),
    )

    actions = ['mark_as_processed', 'mark_as_unprocessed']

    def colored_status(self, obj):
        """Display colored status indicator"""
        if obj.is_processed:
            return format_html(
                '<span style="color: green; font-weight: bold;">✓ Processed</span>'
            )
        return format_html(
            '<span style="color: orange; font-weight: bold;">⧗ Pending</span>'
        )
    colored_status.short_description = 'Status'

    def mark_as_processed(self, request, queryset):
        """Bulk action to mark contacts as processed"""
        count = 0
        for contact in queryset:
            if not contact.is_processed:
                contact.mark_as_processed()
                count += 1
        self.message_user(
            request,
            f'{count} contact(s) marked as processed.'
        )
    mark_as_processed.short_description = 'Mark selected contacts as processed'

    def mark_as_unprocessed(self, request, queryset):
        """Bulk action to mark contacts as unprocessed"""
        count = queryset.update(is_processed=False, processed_at=None)
        self.message_user(
            request,
            f'{count} contact(s) marked as unprocessed.'
        )
    mark_as_unprocessed.short_description = 'Mark selected contacts as unprocessed'
