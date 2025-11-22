from django.db import models
from django.core.validators import EmailValidator, MinLengthValidator
from django.utils import timezone


class Contacts(models.Model):
    """
    Contact form submissions with security and audit fields
    """
    # Contact Information
    email = models.EmailField(
        max_length=254,
        validators=[EmailValidator(message="Please provide a valid email address")],
        help_text="Contact's email address"
    )
    name = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(2, message="Name must be at least 2 characters")],
        help_text="Contact's full name"
    )
    message = models.TextField(
        max_length=5000,
        validators=[MinLengthValidator(10, message="Message must be at least 10 characters")],
        help_text="Contact's message"
    )

    # Audit Fields
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when the contact was created"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text="Timestamp when the contact was last updated"
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text="IP address of the submitter"
    )
    user_agent = models.TextField(
        blank=True,
        default='',
        help_text="User agent string of the submitter"
    )

    # Status tracking
    is_processed = models.BooleanField(
        default=False,
        help_text="Whether the contact has been processed"
    )
    processed_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When the contact was processed"
    )

    class Meta:
        verbose_name = "Contact"
        verbose_name_plural = "Contacts"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['email']),
            models.Index(fields=['is_processed']),
        ]

    def __str__(self):
        return f"{self.name} ({self.email}) - {self.created_at.strftime('%Y-%m-%d %H:%M')}"

    def mark_as_processed(self):
        """Mark the contact as processed"""
        self.is_processed = True
        self.processed_at = timezone.now()
        self.save(update_fields=['is_processed', 'processed_at'])