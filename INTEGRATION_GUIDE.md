# Django + Next.js Integration Guide

This guide explains how the Django backend (averon_backend) is connected to the Next.js frontend (averon-nextjs).

## Backend Setup (Django)

### 1. Dependencies Installed
- **Django REST Framework**: For building RESTful APIs
- **django-cors-headers**: For handling Cross-Origin Resource Sharing (CORS)

### 2. Django Configuration (core/settings.py)

#### Installed Apps
```python
INSTALLED_APPS = [
    # ...
    'rest_framework',      # REST API framework
    'corsheaders',         # CORS handling
    'contact'              # Your contact app
]
```

#### Middleware Configuration
```python
MIDDLEWARE = [
    # ...
    'corsheaders.middleware.CorsMiddleware',  # Must be before CommonMiddleware
    # ...
]
```

#### CORS Settings
```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',    # Next.js dev server
    'http://127.0.0.1:3000',
]
CORS_ALLOW_CREDENTIALS = True
```

#### REST Framework Settings
```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}
```

### 3. API Structure

#### Contact Model (contact/models.py)
```python
class Contacts(models.Model):
    email = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    message = models.TextField()
```

#### Serializer (contact/serializers.py)
Converts Contact model instances to/from JSON format.

#### ViewSet (contact/views.py)
Handles API requests using Django REST Framework's ViewSet pattern.

#### URL Configuration
- **Main URLs** (core/urls.py): `api/` → includes contact app URLs
- **Contact URLs** (contact/urls.py): `/api/contacts/` → ContactViewSet

### 4. Available API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/contacts/` | List all contacts |
| POST   | `/api/contacts/` | Create a new contact |
| GET    | `/api/contacts/{id}/` | Get a specific contact |
| PUT    | `/api/contacts/{id}/` | Update a contact |
| DELETE | `/api/contacts/{id}/` | Delete a contact |

## Frontend Setup (Next.js)

### 1. API Client (lib/api.ts)

Created a reusable API client class that:
- Handles API base URL configuration
- Manages request headers
- Provides type-safe methods for API calls
- Handles errors consistently

```typescript
const apiClient = new ApiClient();
await apiClient.submitContact({ name, email, message });
```

### 2. Environment Variables (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

This allows you to change the API URL for different environments (development, staging, production).

### 3. Contact Form Component (components/ContactForm.tsx)

A ready-to-use React component that:
- Manages form state
- Handles form submission
- Shows loading states
- Displays success/error messages
- Uses Tailwind CSS for styling

## How to Run

### Start Django Backend

1. Navigate to backend directory:
```bash
cd averon_backend
```

2. Activate virtual environment:
```bash
source venv/bin/activate
```

3. Run the development server:
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

### Start Next.js Frontend

1. Navigate to frontend directory:
```bash
cd averon-nextjs
```

2. Install dependencies (if not done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Using the Contact Form

To use the ContactForm component in your Next.js pages:

```tsx
import ContactForm from '@/components/ContactForm';

export default function Page() {
  return (
    <div>
      <ContactForm />
    </div>
  );
}
```

## Testing the Integration

1. Make sure both servers are running
2. Open your browser to the Next.js app
3. Fill out the contact form
4. Submit the form
5. Check the Django admin panel or database to see the saved contact

## Viewing Submitted Contacts

### Django Admin
1. Create a superuser:
```bash
python manage.py createsuperuser
```

2. Register the Contact model in `contact/admin.py`:
```python
from django.contrib import admin
from .models import Contacts

@admin.register(Contacts)
class ContactsAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'id']
    search_fields = ['name', 'email']
```

3. Access admin at `http://localhost:8000/admin/`

### Direct API Access
Visit `http://localhost:8000/api/contacts/` in your browser to see all submitted contacts in JSON format.

## Key Concepts

### CORS (Cross-Origin Resource Sharing)
- Allows the Next.js app (localhost:3000) to make requests to the Django API (localhost:8000)
- Without CORS configuration, browsers block cross-origin requests for security

### REST API
- Uses standard HTTP methods (GET, POST, PUT, DELETE)
- Returns JSON responses
- Follows RESTful conventions

### API Client Pattern
- Centralizes API logic in one place
- Makes it easy to change API URL
- Provides consistent error handling
- Type-safe with TypeScript

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
- Verify `corsheaders` is in INSTALLED_APPS
- Check middleware order (CorsMiddleware before CommonMiddleware)
- Ensure your Next.js URL is in CORS_ALLOWED_ORIGINS

### Connection Refused
- Make sure Django server is running on port 8000
- Check the API URL in `.env.local` matches your Django server

### Form Not Submitting
- Open browser DevTools Network tab
- Check for error messages
- Verify the API endpoint is correct

## Next Steps

1. Add form validation on the backend
2. Implement rate limiting
3. Add authentication if needed
4. Set up production CORS settings
5. Configure environment variables for production
6. Add error logging and monitoring
