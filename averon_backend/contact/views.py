import logging
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from .models import Contacts
from .serializers import ContactSerializer, ContactAdminSerializer
from .throttles import ContactSubmitThrottle

# Configure logger
logger = logging.getLogger('django')
security_logger = logging.getLogger('django.security')


def get_client_ip(request):
    """
    Get the client's IP address from the request
    """
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def get_user_agent(request):
    """
    Get the user agent from the request
    """
    return request.META.get('HTTP_USER_AGENT', '')[:500]  # Limit length


class ContactViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing contact form submissions with security features
    """
    queryset = Contacts.objects.all()
    serializer_class = ContactSerializer
    throttle_classes = [ContactSubmitThrottle]

    def get_permissions(self):
        """
        Set permissions based on action
        - create: Allow anyone (public contact form)
        - list, retrieve, update, destroy: Admin only
        """
        if self.action == 'create':
            # Public contact form - no authentication required
            return [AllowAny()]
        elif self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            # Only admins can view/edit existing contacts
            return [IsAuthenticated(), IsAdminUser()]
        # Default: require authentication for any other actions
        return [IsAuthenticated()]

    def get_serializer_class(self):
        """
        Use admin serializer for admin users
        """
        if self.request.user and self.request.user.is_staff:
            return ContactAdminSerializer
        return ContactSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new contact with security tracking and comprehensive error handling
        """
        try:
            # Get client information
            ip_address = get_client_ip(request)
            user_agent = get_user_agent(request)

            # Log the submission attempt
            security_logger.info(
                f"Contact form submission attempt from IP: {ip_address}"
            )

            # Validate data
            serializer = self.get_serializer(data=request.data)

            if not serializer.is_valid():
                # Return validation errors with 400 status
                logger.warning(
                    f"Contact form validation failed from IP {ip_address}: {serializer.errors}"
                )
                return Response(
                    {
                        'message': 'Validation failed',
                        'errors': serializer.errors
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Save with audit information
            contact = serializer.save(
                ip_address=ip_address,
                user_agent=user_agent
            )

            # Log successful submission
            logger.info(
                f"Contact form submitted successfully: {contact.id} "
                f"from {contact.email} (IP: {ip_address})"
            )

            # Send email notification (non-blocking)
            email_sent = False
            try:
                self._send_notification_email(contact)
                email_sent = True
                logger.info(f"Notification email sent for contact {contact.id}")
            except Exception as e:
                # Log the error but don't fail the request
                logger.error(
                    f"Error sending notification email for contact {contact.id}: {str(e)}",
                    exc_info=True
                )

            return Response(
                {
                    'message': 'Contact form submitted successfully. We will get back to you soon!',
                    'data': {
                        'id': contact.id,
                        'email': contact.email,
                        'name': contact.name,
                        'created_at': contact.created_at,
                    },
                    'email_sent': email_sent  # Informational only
                },
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            # Catch any unexpected errors
            logger.error(
                f"Unexpected error in contact form submission: {str(e)}",
                exc_info=True
            )
            return Response(
                {
                    'message': 'An error occurred while processing your request. Please try again later.',
                    'error': str(e) if settings.DEBUG else 'Internal server error'
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def _send_notification_email(self, contact):
        """
        Send email notification for new contact submission
        Handles missing email configuration gracefully
        """
        # Check if email is configured
        if not settings.CONTACT_EMAIL_RECIPIENT:
            logger.warning("Email recipient not configured. Skipping email notification.")
            return

        if not settings.DEFAULT_FROM_EMAIL:
            logger.warning("Default from email not configured. Skipping email notification.")
            return

        # Customize subject line
        subject = f"🔔 Averon.al - New Contact from {contact.name}"

        # Customize email body
        message = f"""
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  AVERON.AL - NEW CONTACT FORM SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:    {contact.name}
Email:   {contact.email}

💬 MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{contact.message}

🔍 SUBMISSION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ID:            {contact.id}
Submitted:     {contact.created_at.strftime('%B %d, %Y at %I:%M %p UTC')}
IP Address:    {contact.ip_address}
User Agent:    {contact.user_agent[:100]}...

🔗 QUICK ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
View in Admin: http://{settings.ALLOWED_HOSTS[0] if settings.ALLOWED_HOSTS else 'localhost'}:8000/admin/contact/contacts/{contact.id}/
Reply to:      {contact.email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated notification from Averon.al
        """

        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL_RECIPIENT],
                fail_silently=False,  # We catch exceptions in the caller
            )
        except Exception as e:
            # Re-raise with more context
            logger.error(f"send_mail failed: {str(e)}")
            raise

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated, IsAdminUser])
    def mark_processed(self, request, pk=None):
        """
        Mark a contact as processed (admin only)
        """
        contact = self.get_object()
        contact.mark_as_processed()

        logger.info(
            f"Contact {contact.id} marked as processed by {request.user.username}"
        )

        return Response({
            'message': 'Contact marked as processed',
            'processed_at': contact.processed_at
        })

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, IsAdminUser])
    def unprocessed(self, request):
        """
        Get all unprocessed contacts (admin only)
        """
        contacts = self.queryset.filter(is_processed=False)
        serializer = self.get_serializer(contacts, many=True)
        return Response(serializer.data)
