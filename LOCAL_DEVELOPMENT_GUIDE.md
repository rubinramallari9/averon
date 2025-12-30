# Local Development Setup Guide

## Prerequisites

Before you start, make sure you have these installed:

- **Python 3.8+** (check: `python3 --version`)
- **Node.js 18+** (check: `node --version`)
- **npm or yarn** (check: `npm --version`)
- **Git** (check: `git --version`)

---

## 🚀 Quick Start (5 minutes)

### Step 1: Backend Setup (Django)

```bash
# Navigate to backend directory
cd /Users/rubinramallari/averon/averon_backend

# Activate virtual environment
source venv/bin/activate

# Install dependencies (if not already installed)
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create a superuser for admin access (optional but recommended)
python manage.py createsuperuser
# Enter username, email, and password when prompted

# Start the Django development server
python manage.py runserver
```

✅ **Backend should now be running at:** `http://localhost:8000`

### Step 2: Frontend Setup (Next.js)

Open a **new terminal window/tab** and run:

```bash
# Navigate to frontend directory
cd /Users/rubinramallari/averon/averon-nextjs

# Install dependencies (if not already installed)
npm install

# Start the Next.js development server
npm run dev
```

✅ **Frontend should now be running at:** `http://localhost:3000`

### Step 3: Test Everything

Open your browser and visit:
- **Frontend**: http://localhost:3000
- **Backend Admin**: http://localhost:8000/admin/
- **API Docs**: http://localhost:8000/api/docs/
- **API Endpoint**: http://localhost:8000/api/contacts/

---

## 📋 Detailed Setup Instructions

### Backend (Django) - Detailed

#### 1. Activate Virtual Environment

```bash
cd /Users/rubinramallari/averon/averon_backend
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

#### 2. Check/Install Dependencies

```bash
pip install -r requirements.txt
```

#### 3. Configure Environment Variables

Your `.env` file should already exist. Verify it has these settings for local development:

```bash
cat .env
```

Should show something like:
```
DEBUG=True
SECRET_KEY=django-insecure-dev-key-change-in-production
ALLOWED_HOSTS=localhost,127.0.0.1
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3
# ... etc
```

#### 4. Database Setup

```bash
# Run migrations to create database tables
python manage.py migrate

# Create admin user (if you haven't already)
python manage.py createsuperuser
```

When prompted, enter:
- **Username**: admin (or your choice)
- **Email**: your@email.com
- **Password**: (choose a secure password)
- **Password (again)**: (repeat)

#### 5. Start Django Server

```bash
python manage.py runserver
```

You should see:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

#### 6. Test Backend

Open in browser:
- Admin panel: http://localhost:8000/admin/
- API docs: http://localhost:8000/api/docs/
- API endpoint: http://localhost:8000/api/contacts/

### Frontend (Next.js) - Detailed

#### 1. Navigate to Frontend Directory

Open a **new terminal** (keep Django running in the other one):

```bash
cd /Users/rubinramallari/averon/averon-nextjs
```

#### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

This might take a few minutes the first time.

#### 3. Configure Environment Variables

Check if `.env.local` exists:

```bash
cat .env.local
```

If it doesn't exist or needs updating, create/update it:

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF
```

#### 4. Start Next.js Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 16.0.1
- Local:        http://localhost:3000
- Ready in X.Xs
```

#### 5. Test Frontend

Open http://localhost:3000 in your browser.

You should see your Averon website!

---

## 🧪 Testing the Contact Form

1. Go to http://localhost:3000
2. Scroll to the contact form
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message
4. Click Submit
5. Check backend terminal - you should see logs
6. Go to http://localhost:8000/admin/contact/contacts/ to see the submission

---

## 🛠️ Common Issues & Solutions

### Issue 1: Port Already in Use

**Error**: `Error: That port is already in use`

**Solution**:
```bash
# For Django (port 8000)
lsof -ti:8000 | xargs kill -9

# For Next.js (port 3000)
lsof -ti:3000 | xargs kill -9
```

Or use different ports:
```bash
# Django on different port
python manage.py runserver 8080

# Next.js on different port
PORT=3001 npm run dev
```

### Issue 2: Virtual Environment Not Found

**Error**: `source venv/bin/activate` fails

**Solution**:
```bash
cd /Users/rubinramallari/averon/averon_backend

# Create new virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Issue 3: Database Errors

**Error**: Database migration issues

**Solution**:
```bash
# Reset database (development only!)
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

### Issue 4: Module Not Found

**Error**: `ModuleNotFoundError: No module named 'xyz'`

**Solution**:
```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Issue 5: CORS Errors in Browser

**Error**: CORS policy blocking requests

**Solution**:
Check `averon_backend/.env` has:
```
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Issue 6: Next.js Module Not Found

**Error**: Cannot find module in Next.js

**Solution**:
```bash
cd /Users/rubinramallari/averon/averon-nextjs

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Development Workflow

### Typical Development Session

```bash
# Terminal 1 - Backend
cd /Users/rubinramallari/averon/averon_backend
source venv/bin/activate
python manage.py runserver

# Terminal 2 - Frontend
cd /Users/rubinramallari/averon/averon-nextjs
npm run dev

# Terminal 3 - For commands (optional)
# Use this for git, testing, etc.
```

### Making Changes

**Backend Changes:**
1. Edit Python files
2. Django auto-reloads (no restart needed)
3. If you change models, run: `python manage.py makemigrations && python manage.py migrate`

**Frontend Changes:**
1. Edit TypeScript/React files
2. Next.js auto-reloads (saves automatically)
3. Changes appear instantly in browser

### Running Tests

```bash
# Backend tests
cd /Users/rubinramallari/averon/averon_backend
source venv/bin/activate
python manage.py test contact

# Or with pytest
pytest contact/tests.py -v
```

---

## 🔧 Useful Commands

### Backend

```bash
# Run Django shell (interactive Python)
python manage.py shell

# Create new migration
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic

# Check for issues
python manage.py check

# View available commands
python manage.py help
```

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check  # if configured
```

---

## 🎯 Quick Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Main website |
| Backend API | http://localhost:8000/api/ | API endpoints |
| Admin Panel | http://localhost:8000/admin/ | Django admin |
| API Docs | http://localhost:8000/api/docs/ | Swagger UI |
| ReDoc | http://localhost:8000/api/redoc/ | Alternative API docs |

### Default Credentials

After creating superuser:
- **Username**: (what you entered)
- **Password**: (what you entered)

---

## 🔍 Debugging Tips

### View Backend Logs

Django logs are displayed in the terminal where you ran `python manage.py runserver`.

To see more detailed logs:
```bash
# Check log files
tail -f logs/django.log
tail -f logs/security.log
```

### View Frontend Logs

Next.js logs appear in the terminal where you ran `npm run dev`.

Browser console (F12) shows client-side errors.

### Database Inspection

```bash
# Django shell
python manage.py shell

# In the shell:
from contact.models import Contacts
Contacts.objects.all()  # View all contacts
Contacts.objects.count()  # Count contacts
```

Or use a GUI tool:
- **SQLite**: DB Browser for SQLite (https://sqlitebrowser.org/)
- **PostgreSQL**: pgAdmin or TablePlus

---

## 🚀 Next Steps

Once you have everything running locally:

1. **Explore the Admin Panel**:
   - Go to http://localhost:8000/admin/
   - Login with your superuser credentials
   - Browse contacts, users, etc.

2. **Test the API**:
   - Go to http://localhost:8000/api/docs/
   - Try out the API endpoints
   - Submit a test contact form

3. **Make Changes**:
   - Edit files in your code editor
   - See changes instantly with hot reload

4. **Read Documentation**:
   - Review the `*_SETUP.md` files
   - Check `DEPLOYMENT_READY_SUMMARY.md`

---

## 💡 Pro Tips

1. **Use two monitors/windows**: Backend terminal on one side, frontend on the other
2. **Keep logs visible**: Watch for errors in real-time
3. **Use browser DevTools**: Network tab shows API calls, Console shows errors
4. **Django Debug Toolbar**: Optionally add for more debugging info
5. **VS Code Extensions**: Python, Django, ESLint for better development experience

---

## 📞 Need Help?

If you encounter issues:

1. Check the error message carefully
2. Look in the "Common Issues" section above
3. Check logs: `logs/django.log`
4. Verify environment variables in `.env`
5. Make sure both servers are running

---

**Happy coding! 🎉**

Your development environment is ready. Both frontend and backend should be running smoothly on your local machine.
