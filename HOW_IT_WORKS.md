# How the Django + Next.js Integration Works

## Overview
Your existing contact form in `page.tsx` now submits to your Django backend API.

## What I Changed

### 1. Backend (Django) - Created the API

**Installed packages:**
```bash
pip install djangorestframework django-cors-headers
```

**Modified `core/settings.py`:**
- Added `rest_framework` and `corsheaders` to INSTALLED_APPS
- Added CORS middleware (allows Next.js to make requests to Django)
- Configured CORS to accept requests from `http://localhost:3000`
- Set up REST Framework defaults

**Created API files:**
- `contact/serializers.py` - Converts Contact model to/from JSON
- `contact/views.py` - Handles API requests (GET, POST, etc.)
- `contact/urls.py` - Routes for `/api/contacts/`
- Updated `core/urls.py` - Mounts contact API at `/api/`

**API Endpoint:**
- `POST http://localhost:8000/api/contacts/` - Submit contact form

### 2. Frontend (Next.js) - Connected the Form

**Created `lib/api.ts`:**
- API client that handles communication with Django
- Type-safe methods for submitting contacts
- Automatic error handling

**Modified `app/page.tsx`:**
- Imported the API client
- Added form state management:
  - `contactForm` - stores email, name, message
  - `isSubmitting` - shows loading state
  - `submitStatus` - shows success/error messages
- Added `handleContactSubmit()` function that:
  1. Prevents page reload
  2. Calls Django API
  3. Shows success/error message
  4. Clears form on success
- Connected all inputs to state with `value` and `onChange`
- Added `required` and `disabled` attributes
- Added submit button loading state ("Sending...")
- Added success/error message display

**Created `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## How It Works - Step by Step

### When User Submits Form:

1. **User fills out form** (email, name, message) and clicks "Get Started"

2. **Form submission** triggers `handleContactSubmit()`
   - Prevents page reload with `e.preventDefault()`
   - Sets loading state: button shows "Sending..."

3. **API Client** (`lib/api.ts`)
   - Calls `apiClient.submitContact(contactForm)`
   - Sends POST request to `http://localhost:8000/api/contacts/`
   - Includes JSON data: `{ email, name, message }`

4. **Django Backend** receives request
   - **CORS Middleware** checks: "Is this from localhost:3000?" → Yes → Allow
   - **URL Router** routes to `ContactViewSet`
   - **Serializer** validates the data
   - **Django ORM** saves to database: `Contacts.objects.create(...)`
   - **Response** returns JSON: `{ message: "Success", data: {...} }`

5. **Next.js receives response**
   - Success → Shows green success message, clears form
   - Error → Shows red error message

6. **User sees result** in the UI

## Data Flow Diagram

```
User fills form
    ↓
Clicks "Get Started"
    ↓
handleContactSubmit() in page.tsx
    ↓
apiClient.submitContact() in lib/api.ts
    ↓
fetch() POST to http://localhost:8000/api/contacts/
    ↓
Django CORS Middleware (allows request)
    ↓
Django URL Router → ContactViewSet
    ↓
ContactSerializer validates data
    ↓
Django saves to database
    ↓
Django returns JSON response
    ↓
apiClient returns to page.tsx
    ↓
Shows success/error message
    ↓
Form cleared (on success)
```

## Key Concepts

### CORS (Cross-Origin Resource Sharing)
- **Problem:** Browser blocks requests between different origins (ports)
  - Next.js: `localhost:3000` (frontend)
  - Django: `localhost:8000` (backend)
- **Solution:** Django adds special headers telling browser "localhost:3000 is allowed"
- **Code:** `CORS_ALLOWED_ORIGINS = ['http://localhost:3000']` in settings.py

### API (Application Programming Interface)
- A way for frontend and backend to communicate
- Uses standard HTTP methods:
  - `POST /api/contacts/` → Create new contact
  - `GET /api/contacts/` → List all contacts
- Data format: JSON (JavaScript Object Notation)

### Serialization
- Converting between Python objects and JSON
- **Django model** → **JSON** → **JavaScript object**
- Example:
  ```python
  # Django model
  Contacts(id=1, name="John", email="john@email.com")

  # Serializer converts to JSON
  {"id": 1, "name": "John", "email": "john@email.com"}

  # Next.js receives as JavaScript object
  const data = { id: 1, name: "John", email: "john@email.com" }
  ```

### State Management (React)
- `useState()` tracks form data in real-time
- When user types → state updates → form re-renders
- Example:
  ```typescript
  const [contactForm, setContactForm] = useState({ email: '', name: '', message: '' })

  // User types in email field
  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}

  // State updates: { email: 'john@email.com', name: '', message: '' }
  ```

## How to Run

### Terminal 1 - Django Backend:
```bash
cd averon_backend
source venv/bin/activate
python manage.py runserver
```
Backend runs at `http://localhost:8000`

### Terminal 2 - Next.js Frontend:
```bash
cd averon-nextjs
npm run dev
```
Frontend runs at `http://localhost:3000`

## Testing

1. Open `http://localhost:3000` in browser
2. Scroll to contact section
3. Fill out: email, name, message
4. Click "Get Started"
5. See "Sending..." button text
6. See green success message
7. Form should clear

## View Submissions

### Option 1: Django Admin
```bash
cd averon_backend
source venv/bin/activate
python manage.py createsuperuser  # Only needed once
python manage.py runserver
```
Visit `http://localhost:8000/admin/` → Login → Click "Contacts"

### Option 2: API Direct
Visit `http://localhost:8000/api/contacts/` in browser (shows JSON)

## File Changes Summary

### Backend Files:
- ✓ `core/settings.py` - Added CORS and REST Framework config
- ✓ `core/urls.py` - Added `/api/` route
- ✓ `contact/serializers.py` - NEW: JSON converter
- ✓ `contact/views.py` - NEW: API endpoints
- ✓ `contact/urls.py` - NEW: Contact routes
- ✓ `contact/admin.py` - Admin interface for viewing contacts

### Frontend Files:
- ✓ `lib/api.ts` - NEW: API client
- ✓ `app/page.tsx` - MODIFIED: Connected form to API
- ✓ `.env.local` - NEW: API URL configuration

## Troubleshooting

**Form not submitting?**
- Check browser console (F12) for errors
- Make sure Django server is running
- Verify API URL in `.env.local`

**CORS error?**
- Restart Django server
- Check `CORS_ALLOWED_ORIGINS` in settings.py
- Verify Next.js is on port 3000

**Data not saving?**
- Check Django terminal for errors
- Run migrations: `python manage.py migrate`
- Check database: Django admin panel

## What Happens to Form Data?

1. Stored in SQLite database at `averon_backend/db.sqlite3`
2. Accessible via Django admin panel
3. Accessible via API at `/api/contacts/`
4. Can be exported, emailed, or processed further

## Next Steps

- Add email notifications when form is submitted
- Add reCAPTCHA for spam protection
- Style success/error messages to match your design
- Add form validation (e.g., email format, message length)
- Set up production deployment
