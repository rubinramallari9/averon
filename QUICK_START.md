# Quick Start Guide

## Running the Application

### Option 1: Using the Start Scripts (Recommended)

**Terminal 1 - Backend:**
```bash
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
./start-frontend.sh
```

### Option 2: Manual Start

**Terminal 1 - Django Backend:**
```bash
cd averon_backend
source venv/bin/activate
python manage.py runserver
```
Backend will run at: `http://localhost:8000`

**Terminal 2 - Next.js Frontend:**
```bash
cd averon-nextjs
npm run dev
```
Frontend will run at: `http://localhost:3000`

## Test the Integration

1. Open your browser to `http://localhost:3000/contact`
2. Fill out the contact form
3. Submit and watch for the success message

## View Submitted Contacts

### Option 1: Django Admin Panel
1. Create a superuser (only needed once):
```bash
cd averon_backend
source venv/bin/activate
python manage.py createsuperuser
```

2. Visit `http://localhost:8000/admin/`
3. Login with your superuser credentials
4. Click on "Contacts" to view all submissions

### Option 2: Direct API
Visit `http://localhost:8000/api/contacts/` to see JSON data

## Project Structure

```
averon/
├── averon_backend/          # Django Backend
│   ├── core/                # Main Django settings
│   │   ├── settings.py      # ✓ CORS & REST configured
│   │   └── urls.py          # ✓ API routes configured
│   ├── contact/             # Contact app
│   │   ├── models.py        # ✓ Contact model
│   │   ├── serializers.py   # ✓ API serializer
│   │   ├── views.py         # ✓ API viewset
│   │   ├── urls.py          # ✓ Contact routes
│   │   └── admin.py         # ✓ Admin configuration
│   └── manage.py
│
├── averon-nextjs/           # Next.js Frontend
│   ├── app/
│   │   └── contact/
│   │       └── page.tsx     # ✓ Contact page
│   ├── components/
│   │   └── ContactForm.tsx  # ✓ Contact form component
│   ├── lib/
│   │   └── api.ts           # ✓ API client
│   └── .env.local           # ✓ Environment variables
│
└── INTEGRATION_GUIDE.md     # Detailed documentation
```

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/contacts/` | List all contacts |
| POST | `/api/contacts/` | Submit contact form |
| GET | `/api/contacts/{id}/` | Get specific contact |

## What Was Done

### Backend (Django)
1. ✓ Installed Django REST Framework & CORS headers
2. ✓ Configured CORS to allow Next.js frontend
3. ✓ Created Contact serializer for JSON conversion
4. ✓ Created Contact ViewSet for API endpoints
5. ✓ Set up URL routing for `/api/contacts/`
6. ✓ Configured admin panel for viewing contacts
7. ✓ Ran migrations to create database tables

### Frontend (Next.js)
1. ✓ Created type-safe API client (`lib/api.ts`)
2. ✓ Created reusable ContactForm component
3. ✓ Set up environment variables
4. ✓ Created contact page at `/contact`
5. ✓ Added proper error handling and loading states

### Integration
- Django backend serves REST API at `http://localhost:8000/api/`
- Next.js frontend consumes API from `http://localhost:3000`
- CORS configured to allow cross-origin requests
- Environment variables for flexible configuration

## Troubleshooting

**CORS Error?**
- Make sure Django server is running
- Check that `corsheaders` is in INSTALLED_APPS
- Verify Next.js URL is in CORS_ALLOWED_ORIGINS

**Connection Refused?**
- Ensure Django is running on port 8000
- Check `.env.local` has correct API URL

**Form Not Working?**
- Open browser DevTools → Network tab
- Check for error messages
- Verify both servers are running

## Next Steps

- Customize the ContactForm styling
- Add form validation
- Set up email notifications
- Add reCAPTCHA for spam protection
- Deploy to production

For detailed information, see `INTEGRATION_GUIDE.md`
