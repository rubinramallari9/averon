from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Contacts
from .serializers import ContactSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contacts.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Send email notification
        try:
            contact_data = serializer.data
            subject = f"New Contact Form Submission from {contact_data['name']}"
            message = f"""
New contact form submission received:

Name: {contact_data['name']}
Email: {contact_data['email']}
Message:
{contact_data['message']}

---
Submission ID: {contact_data['id']}
            """

            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL_RECIPIENT],
                fail_silently=False,
            )
        except Exception as e:
            # Log the error but don't fail the request
            print(f"Error sending email: {str(e)}")

        return Response(
            {
                'message': 'Contact form submitted successfully',
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED
        )
