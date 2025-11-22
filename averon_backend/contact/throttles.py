"""
Custom throttling classes for contact form submission
"""
from rest_framework.throttling import AnonRateThrottle


class ContactSubmitThrottle(AnonRateThrottle):
    """
    Throttle for contact form submissions
    Allows 3 submissions per hour per IP address
    """
    scope = 'contact_submit'

    def get_cache_key(self, request, view):
        """
        Custom cache key to track by IP address
        """
        if request.user and request.user.is_authenticated:
            # Authenticated users get higher limits
            return None  # Use UserRateThrottle instead

        # For anonymous users, throttle by IP
        ident = self.get_ident(request)
        return self.cache_format % {
            'scope': self.scope,
            'ident': ident
        }
