import re
from rest_framework import serializers
from django.utils.html import strip_tags
from .models import Contacts


class ContactSerializer(serializers.ModelSerializer):
    """
    Serializer for Contact model with enhanced validation and sanitization
    """

    class Meta:
        model = Contacts
        fields = [
            'id', 'email', 'name', 'message',
            'created_at', 'updated_at', 'is_processed'
        ]
        read_only_fields = [
            'id', 'created_at', 'updated_at',
            'ip_address', 'user_agent', 'is_processed', 'processed_at'
        ]

    def validate_name(self, value):
        """
        Validate and sanitize name field
        """
        # Strip HTML tags
        value = strip_tags(value).strip()

        # Check length
        if len(value) < 2:
            raise serializers.ValidationError(
                "Name must be at least 2 characters long"
            )
        if len(value) > 100:
            raise serializers.ValidationError(
                "Name must not exceed 100 characters"
            )

        # Check for valid characters (letters, spaces, hyphens, apostrophes)
        if not re.match(r"^[a-zA-Z\s\-']+$", value):
            raise serializers.ValidationError(
                "Name can only contain letters, spaces, hyphens, and apostrophes"
            )

        return value

    def validate_email(self, value):
        """
        Validate and sanitize email field
        """
        # Convert to lowercase and strip whitespace
        value = value.lower().strip()

        # Additional email validation
        if len(value) > 254:
            raise serializers.ValidationError(
                "Email address is too long"
            )

        # Check for common disposable email domains (optional)
        disposable_domains = [
            'tempmail.com', 'throwaway.email', '10minutemail.com',
            'guerrillamail.com', 'mailinator.com'
        ]
        domain = value.split('@')[-1]
        if domain in disposable_domains:
            raise serializers.ValidationError(
                "Please use a permanent email address"
            )

        return value

    def validate_message(self, value):
        """
        Validate and sanitize message field
        """
        # Strip HTML tags
        value = strip_tags(value).strip()

        # Check length
        if len(value) < 10:
            raise serializers.ValidationError(
                "Message must be at least 10 characters long"
            )
        if len(value) > 5000:
            raise serializers.ValidationError(
                "Message must not exceed 5000 characters"
            )

        # Check for spam patterns (basic detection)
        spam_patterns = [
            r'(viagra|cialis|lottery|prize)',  # Common spam words
            r'http[s]?://[^\s]{50,}',  # Very long URLs
            r'(\$\$\$|!!!{3,})',  # Excessive symbols
        ]

        for pattern in spam_patterns:
            if re.search(pattern, value, re.IGNORECASE):
                raise serializers.ValidationError(
                    "Message contains prohibited content"
                )

        return value

    def validate(self, attrs):
        """
        Object-level validation
        """
        # Ensure all required fields are present
        required_fields = ['email', 'name', 'message']
        for field in required_fields:
            if not attrs.get(field):
                raise serializers.ValidationError(
                    f"{field.capitalize()} is required"
                )

        return attrs


class ContactAdminSerializer(ContactSerializer):
    """
    Extended serializer for admin use with all fields
    """
    class Meta(ContactSerializer.Meta):
        fields = ContactSerializer.Meta.fields + [
            'ip_address', 'user_agent', 'processed_at'
        ]
        read_only_fields = [
            'id', 'created_at', 'updated_at',
            'ip_address', 'user_agent', 'processed_at'
        ]
