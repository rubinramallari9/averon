import pytest
from django.test import TestCase
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock
from .models import Contacts
from .serializers import ContactSerializer, ContactAdminSerializer
from .views import get_client_ip, get_user_agent

User = get_user_model()


class ContactModelTests(TestCase):
    """Test cases for the Contacts model"""

    def setUp(self):
        """Set up test data"""
        self.valid_contact_data = {
            'name': 'John Doe',
            'email': 'john.doe@example.com',
            'message': 'This is a test message with sufficient length.',
            'ip_address': '192.168.1.1',
            'user_agent': 'Mozilla/5.0 Test Browser'
        }

    def test_create_contact_with_valid_data(self):
        """Test creating a contact with valid data"""
        contact = Contacts.objects.create(**self.valid_contact_data)

        self.assertEqual(contact.name, 'John Doe')
        self.assertEqual(contact.email, 'john.doe@example.com')
        self.assertFalse(contact.is_processed)
        self.assertIsNone(contact.processed_at)
        self.assertIsNotNone(contact.created_at)
        self.assertIsNotNone(contact.updated_at)

    def test_contact_string_representation(self):
        """Test the string representation of a contact"""
        contact = Contacts.objects.create(**self.valid_contact_data)
        expected_str = f"John Doe (john.doe@example.com) - {contact.created_at.strftime('%Y-%m-%d %H:%M')}"
        self.assertEqual(str(contact), expected_str)

    def test_mark_as_processed(self):
        """Test marking a contact as processed"""
        contact = Contacts.objects.create(**self.valid_contact_data)

        # Initially not processed
        self.assertFalse(contact.is_processed)
        self.assertIsNone(contact.processed_at)

        # Mark as processed
        contact.mark_as_processed()

        # Refresh from database
        contact.refresh_from_db()

        self.assertTrue(contact.is_processed)
        self.assertIsNotNone(contact.processed_at)
        self.assertLessEqual(
            (timezone.now() - contact.processed_at).total_seconds(),
            2  # Within 2 seconds
        )

    def test_contact_ordering(self):
        """Test that contacts are ordered by created_at descending"""
        contact1 = Contacts.objects.create(
            name='First Contact',
            email='first@example.com',
            message='First message with sufficient length.'
        )
        contact2 = Contacts.objects.create(
            name='Second Contact',
            email='second@example.com',
            message='Second message with sufficient length.'
        )

        contacts = Contacts.objects.all()
        self.assertEqual(contacts[0].id, contact2.id)
        self.assertEqual(contacts[1].id, contact1.id)

    def test_email_validation(self):
        """Test email field validation"""
        # Invalid email should raise ValidationError
        contact = Contacts(
            name='Test User',
            email='invalid-email',
            message='This is a test message with sufficient length.'
        )
        with self.assertRaises(ValidationError):
            contact.full_clean()

    def test_name_min_length_validation(self):
        """Test name minimum length validation"""
        contact = Contacts(
            name='A',  # Too short
            email='test@example.com',
            message='This is a test message with sufficient length.'
        )
        with self.assertRaises(ValidationError):
            contact.full_clean()

    def test_message_min_length_validation(self):
        """Test message minimum length validation"""
        contact = Contacts(
            name='John Doe',
            email='test@example.com',
            message='Short'  # Too short
        )
        with self.assertRaises(ValidationError):
            contact.full_clean()


class ContactSerializerTests(TestCase):
    """Test cases for ContactSerializer"""

    def setUp(self):
        """Set up test data"""
        self.valid_data = {
            'name': 'Jane Smith',
            'email': 'jane.smith@example.com',
            'message': 'This is a valid test message with more than ten characters.'
        }

    def test_serializer_with_valid_data(self):
        """Test serializer with valid data"""
        serializer = ContactSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        contact = serializer.save()

        self.assertEqual(contact.name, 'Jane Smith')
        self.assertEqual(contact.email, 'jane.smith@example.com')

    def test_name_html_stripping(self):
        """Test that HTML tags are stripped from name"""
        data = self.valid_data.copy()
        data['name'] = '<b>John</b> <i>Doe</i>'

        serializer = ContactSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['name'], 'John Doe')

    def test_name_invalid_characters(self):
        """Test name with invalid characters"""
        data = self.valid_data.copy()
        data['name'] = 'John123'  # Numbers not allowed

        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)

    def test_name_too_short(self):
        """Test name that is too short"""
        data = self.valid_data.copy()
        data['name'] = 'A'

        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)

    def test_name_too_long(self):
        """Test name that is too long"""
        data = self.valid_data.copy()
        data['name'] = 'A' * 101

        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)

    def test_email_normalization(self):
        """Test that email is normalized to lowercase"""
        data = self.valid_data.copy()
        data['email'] = 'TEST@EXAMPLE.COM'

        serializer = ContactSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['email'], 'test@example.com')

    def test_email_too_long(self):
        """Test email that exceeds maximum length"""
        data = self.valid_data.copy()
        data['email'] = 'a' * 250 + '@example.com'  # Over 254 chars

        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

    def test_disposable_email_rejection(self):
        """Test that disposable email domains are rejected"""
        data = self.valid_data.copy()
        data['email'] = 'test@tempmail.com'

        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

    def test_message_html_stripping(self):
        """Test that HTML tags are stripped from message"""
        data = self.valid_data.copy()
        data['message'] = '<p>This is a message</p> with HTML tags that should be stripped.'

        serializer = ContactSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertNotIn('<p>', serializer.validated_data['message'])
        self.assertNotIn('</p>', serializer.validated_data['message'])

    def test_message_too_short(self):
        """Test message that is too short"""
        data = self.valid_data.copy()
        data['message'] = 'Short'

        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('message', serializer.errors)

    def test_message_too_long(self):
        """Test message that exceeds maximum length"""
        data = self.valid_data.copy()
        data['message'] = 'A' * 5001

        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('message', serializer.errors)

    def test_message_spam_detection_viagra(self):
        """Test spam detection for prohibited words"""
        data = self.valid_data.copy()
        data['message'] = 'Buy viagra now for cheap prices and free delivery!'

        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('message', serializer.errors)

    def test_message_spam_detection_excessive_symbols(self):
        """Test spam detection for excessive symbols"""
        data = self.valid_data.copy()
        data['message'] = 'This is urgent!!!! Please respond $$$$$'

        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('message', serializer.errors)

    def test_required_fields_validation(self):
        """Test that all required fields are validated"""
        # Missing name
        data = {'email': 'test@example.com', 'message': 'Test message here'}
        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())

        # Missing email
        data = {'name': 'Test User', 'message': 'Test message here'}
        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())

        # Missing message
        data = {'name': 'Test User', 'email': 'test@example.com'}
        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())


class ContactAPITests(APITestCase):
    """Test cases for Contact API endpoints"""

    def setUp(self):
        """Set up test client and data"""
        self.client = APIClient()
        self.contact_url = '/api/contacts/'

        # Create admin user
        self.admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='adminpass123'
        )

        # Valid contact data
        self.valid_contact_data = {
            'name': 'API Test User',
            'email': 'apitest@example.com',
            'message': 'This is an API test message with sufficient length.'
        }

    def test_create_contact_public_access(self):
        """Test that anyone can create a contact (public form)"""
        response = self.client.post(
            self.contact_url,
            self.valid_contact_data,
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)
        self.assertIn('data', response.data)
        self.assertEqual(response.data['data']['email'], 'apitest@example.com')

        # Verify contact was created in database
        self.assertEqual(Contacts.objects.count(), 1)
        contact = Contacts.objects.first()
        self.assertEqual(contact.name, 'API Test User')

    def test_create_contact_with_ip_tracking(self):
        """Test that IP address is tracked on contact creation"""
        response = self.client.post(
            self.contact_url,
            self.valid_contact_data,
            format='json',
            REMOTE_ADDR='192.168.1.100'
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        contact = Contacts.objects.first()
        self.assertEqual(contact.ip_address, '192.168.1.100')

    def test_create_contact_with_x_forwarded_for(self):
        """Test IP extraction from X-Forwarded-For header"""
        response = self.client.post(
            self.contact_url,
            self.valid_contact_data,
            format='json',
            HTTP_X_FORWARDED_FOR='203.0.113.1, 198.51.100.1'
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        contact = Contacts.objects.first()
        self.assertEqual(contact.ip_address, '203.0.113.1')

    def test_create_contact_with_user_agent(self):
        """Test that user agent is tracked"""
        response = self.client.post(
            self.contact_url,
            self.valid_contact_data,
            format='json',
            HTTP_USER_AGENT='Mozilla/5.0 Test Browser'
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        contact = Contacts.objects.first()
        self.assertEqual(contact.user_agent, 'Mozilla/5.0 Test Browser')

    def test_create_contact_invalid_data(self):
        """Test creating contact with invalid data"""
        invalid_data = {
            'name': 'A',  # Too short
            'email': 'invalid-email',
            'message': 'Short'
        }

        response = self.client.post(
            self.contact_url,
            invalid_data,
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)

    @patch('contact.views.send_mail')
    def test_email_notification_sent(self, mock_send_mail):
        """Test that email notification is sent on contact creation"""
        mock_send_mail.return_value = 1

        response = self.client.post(
            self.contact_url,
            self.valid_contact_data,
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['email_sent'])

        # Verify send_mail was called
        mock_send_mail.assert_called_once()

    @patch('contact.views.send_mail')
    def test_email_failure_does_not_break_submission(self, mock_send_mail):
        """Test that contact is still created even if email fails"""
        mock_send_mail.side_effect = Exception('Email server down')

        response = self.client.post(
            self.contact_url,
            self.valid_contact_data,
            format='json'
        )

        # Contact should still be created
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertFalse(response.data['email_sent'])
        self.assertEqual(Contacts.objects.count(), 1)

    def test_list_contacts_requires_admin(self):
        """Test that listing contacts requires admin authentication"""
        # Create a contact first
        Contacts.objects.create(**self.valid_contact_data)

        # Try to list without authentication
        response = self.client.get(self.contact_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Try with admin authentication
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(self.contact_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_contact_requires_admin(self):
        """Test that retrieving a contact requires admin authentication"""
        contact = Contacts.objects.create(**self.valid_contact_data)
        detail_url = f'{self.contact_url}{contact.id}/'

        # Try without authentication
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Try with admin authentication
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_mark_as_processed_admin_only(self):
        """Test marking contact as processed (admin only)"""
        contact = Contacts.objects.create(**self.valid_contact_data)
        mark_url = f'{self.contact_url}{contact.id}/mark_processed/'

        # Try without authentication
        response = self.client.post(mark_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Authenticate as admin and try again
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.post(mark_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify contact was marked as processed
        contact.refresh_from_db()
        self.assertTrue(contact.is_processed)
        self.assertIsNotNone(contact.processed_at)

    def test_unprocessed_contacts_admin_only(self):
        """Test getting unprocessed contacts (admin only)"""
        # Create processed and unprocessed contacts
        Contacts.objects.create(
            name='Processed',
            email='processed@example.com',
            message='Processed message',
            is_processed=True
        )
        Contacts.objects.create(**self.valid_contact_data)

        unprocessed_url = f'{self.contact_url}unprocessed/'

        # Try without authentication
        response = self.client.get(unprocessed_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Authenticate as admin
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(unprocessed_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Should only return unprocessed contact
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['email'], 'apitest@example.com')

    def test_admin_serializer_includes_extra_fields(self):
        """Test that admin serializer includes IP and user agent"""
        contact = Contacts.objects.create(
            **self.valid_contact_data,
            ip_address='192.168.1.1',
            user_agent='Test Agent'
        )

        # Authenticate as admin
        self.client.force_authenticate(user=self.admin_user)

        detail_url = f'{self.contact_url}{contact.id}/'
        response = self.client.get(detail_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('ip_address', response.data)
        self.assertIn('user_agent', response.data)
        self.assertEqual(response.data['ip_address'], '192.168.1.1')


class UtilityFunctionTests(TestCase):
    """Test utility functions"""

    def test_get_client_ip_from_remote_addr(self):
        """Test extracting IP from REMOTE_ADDR"""
        request = MagicMock()
        request.META = {'REMOTE_ADDR': '192.168.1.1'}

        ip = get_client_ip(request)
        self.assertEqual(ip, '192.168.1.1')

    def test_get_client_ip_from_x_forwarded_for(self):
        """Test extracting IP from X-Forwarded-For header"""
        request = MagicMock()
        request.META = {
            'HTTP_X_FORWARDED_FOR': '203.0.113.1, 198.51.100.1',
            'REMOTE_ADDR': '192.168.1.1'
        }

        ip = get_client_ip(request)
        self.assertEqual(ip, '203.0.113.1')

    def test_get_user_agent(self):
        """Test extracting user agent"""
        request = MagicMock()
        request.META = {'HTTP_USER_AGENT': 'Mozilla/5.0 Test Browser'}

        user_agent = get_user_agent(request)
        self.assertEqual(user_agent, 'Mozilla/5.0 Test Browser')

    def test_get_user_agent_truncation(self):
        """Test user agent truncation to 500 chars"""
        request = MagicMock()
        long_agent = 'A' * 600
        request.META = {'HTTP_USER_AGENT': long_agent}

        user_agent = get_user_agent(request)
        self.assertEqual(len(user_agent), 500)

    def test_get_user_agent_missing(self):
        """Test user agent when header is missing"""
        request = MagicMock()
        request.META = {}

        user_agent = get_user_agent(request)
        self.assertEqual(user_agent, '')
