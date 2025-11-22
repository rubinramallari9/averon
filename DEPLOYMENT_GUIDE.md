# 🚀 Complete Deployment Guide - Averon Digital

## Overview

This guide will walk you through deploying:
- **Next.js Frontend** → Vercel (recommended) or Netlify
- **Django Backend** → Railway, Render, or DigitalOcean
- **Database** → PostgreSQL (production-ready)
- **Caching** → Redis (for performance)
- **Domain** → Custom domain setup
- **SSL** → HTTPS configuration

---

## TABLE OF CONTENTS

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Next.js Deployment (Vercel)](#nextjs-deployment-vercel)
3. [Django Deployment (Railway)](#django-deployment-railway)
4. [Database Setup (PostgreSQL)](#database-setup-postgresql)
5. [Redis Setup](#redis-setup)
6. [Domain & DNS Configuration](#domain--dns-configuration)
7. [Environment Variables](#environment-variables)
8. [Post-Deployment Testing](#post-deployment-testing)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Troubleshooting](#troubleshooting)

---

## PRE-DEPLOYMENT CHECKLIST

### Frontend (Next.js)

- [ ] Production build works: `npm run build && npm start`
- [ ] No console errors or warnings
- [ ] All images optimized (WebP/AVIF)
- [ ] Environment variables documented
- [ ] SEO meta tags configured
- [ ] Analytics set up (Google Analytics)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

### Backend (Django)

- [ ] Production settings configured
- [ ] Database migrations run: `python manage.py migrate`
- [ ] Static files collected: `python manage.py collectstatic`
- [ ] SECRET_KEY is secure and stored in environment
- [ ] DEBUG=False for production
- [ ] ALLOWED_HOSTS configured
- [ ] CORS_ALLOWED_ORIGINS updated for production domain
- [ ] Email backend configured
- [ ] Admin superuser created

### General

- [ ] Git repository clean (no sensitive files committed)
- [ ] `.env` files in `.gitignore`
- [ ] Domain name purchased (if using custom domain)
- [ ] SSL certificate ready (automatic with Vercel/Railway)

---

## NEXT.JS DEPLOYMENT (VERCEL)

### Why Vercel?
- ✅ Built by Next.js creators (best integration)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Edge functions
- ✅ Zero configuration
- ✅ Free tier available

### Step 1: Prepare Your Repository

**1.1 Create `.gitignore` (if not exists):**

```bash
# .gitignore
node_modules/
.next/
out/
.env.local
.env.production
.DS_Store
*.log
.vercel
```

**1.2 Commit your code:**

```bash
cd averon-nextjs
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

**2.1 Install Vercel CLI (optional but recommended):**

```bash
npm i -g vercel
```

**2.2 Deploy via Vercel Dashboard (Easiest):**

1. Go to https://vercel.com/
2. Click "Add New" → "Project"
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `averon-nextjs` (if in subdirectory)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

5. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

6. Click "Deploy"

**2.3 Or Deploy via CLI:**

```bash
cd averon-nextjs
vercel

# Follow prompts:
# - Set up and deploy: Yes
# - Which scope: Your account
# - Link to existing project: No
# - Project name: averon-nextjs
# - Directory: ./
# - Override settings: No

# Deploy to production:
vercel --prod
```

### Step 3: Configure Custom Domain (Optional)

**3.1 In Vercel Dashboard:**

1. Go to your project → Settings → Domains
2. Add your domain: `averon.al`
3. Follow DNS instructions (see Domain Configuration section)

**3.2 Configure DNS:**

Add these records to your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 4: Verify Deployment

**4.1 Check deployment:**

```bash
# Your site will be available at:
https://averon-nextjs.vercel.app  # Vercel subdomain
https://your-domain.com           # Custom domain (if configured)
```

**4.2 Test:**

- ✅ Site loads correctly
- ✅ Images display
- ✅ Forms work
- ✅ API calls work (to Django backend)
- ✅ SEO meta tags present
- ✅ Analytics tracking

---

## DJANGO DEPLOYMENT (RAILWAY)

### Why Railway?
- ✅ Simple deployment
- ✅ Automatic PostgreSQL
- ✅ Automatic Redis
- ✅ Free tier ($5/month credit)
- ✅ Easy scaling
- ✅ Great developer experience

### Step 1: Prepare Django for Production

**1.1 Create `requirements.txt`:**

```bash
cd averon_backend
pip freeze > requirements.txt
```

**1.2 Create `runtime.txt`:**

```txt
python-3.11.5
```

**1.3 Create `Procfile`:**

```
web: gunicorn core.wsgi:application --config gunicorn.conf.py
release: python manage.py migrate --noinput
```

**1.4 Update `.gitignore`:**

```bash
# .gitignore
*.pyc
__pycache__/
db.sqlite3
.env
venv/
staticfiles/
media/
*.log
.DS_Store
```

**1.5 Install production dependencies:**

```bash
pip install gunicorn psycopg2-binary django-environ whitenoise
pip freeze > requirements.txt
```

**1.6 Create production settings:**

Create `core/settings_prod.py`:

```python
from .settings import *
import os
import dj_database_url

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost').split(',')

# Database
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,
        conn_health_checks=True,
    )
}

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# Whitenoise for static files
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Security
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# CORS for production
CORS_ALLOWED_ORIGINS = [
    'https://averon.al',
    'https://www.averon.al',
    os.environ.get('FRONTEND_URL', 'http://localhost:3000'),
]

# Redis Cache
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': os.environ.get('REDIS_URL', 'redis://localhost:6379/1'),
    }
}
```

**1.7 Update `wsgi.py`:**

```python
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings_prod')

application = get_wsgi_application()
```

**1.8 Commit changes:**

```bash
git add .
git commit -m "Prepare Django for production deployment"
git push origin main
```

### Step 2: Deploy to Railway

**2.1 Sign up for Railway:**

1. Go to https://railway.app/
2. Sign up with GitHub

**2.2 Create New Project:**

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Select your repository
4. Choose `averon_backend` as root directory

**2.3 Add PostgreSQL:**

1. In your project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create DATABASE_URL

**2.4 Add Redis:**

1. Click "New" → "Database" → "Redis"
2. Railway will automatically create REDIS_URL

**2.5 Configure Environment Variables:**

Click on your Django service → Variables:

```bash
DJANGO_SETTINGS_MODULE=core.settings_prod
SECRET_KEY=your-super-secret-key-here-generate-new-one
DEBUG=False
ALLOWED_HOSTS=your-app.railway.app,averon.al,www.averon.al
FRONTEND_URL=https://averon.al
CONTACT_EMAIL_RECIPIENT=info@averon.al
EMAIL_HOST_USER=averonagencyal@gmail.com
EMAIL_HOST_PASSWORD=jcxa neiv mkcy lxqy
```

**Generate a new SECRET_KEY:**

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**2.6 Deploy:**

Railway will automatically deploy. Watch the logs:

```
Building...
Installing dependencies...
Running release command...
Starting server...
✅ Deployment successful
```

**2.7 Run migrations:**

In Railway dashboard → your Django service → click terminal icon:

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic --noinput
```

### Step 3: Verify Django Deployment

**3.1 Test endpoints:**

```bash
# Health check
curl https://your-app.railway.app/api/

# Admin panel
https://your-app.railway.app/admin/

# API endpoints
https://your-app.railway.app/api/contacts/
```

**3.2 Update Next.js environment variable:**

In Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-app.railway.app/api
```

Redeploy Next.js for changes to take effect.

---

## ALTERNATIVE: RENDER DEPLOYMENT

### Django on Render

**1. Create `render.yaml`:**

```yaml
services:
  - type: web
    name: averon-backend
    env: python
    buildCommand: "pip install -r requirements.txt && python manage.py collectstatic --noinput"
    startCommand: "gunicorn core.wsgi:application"
    envVars:
      - key: DJANGO_SETTINGS_MODULE
        value: core.settings_prod
      - key: SECRET_KEY
        generateValue: true
      - key: DEBUG
        value: "False"
      - key: DATABASE_URL
        fromDatabase:
          name: averon-db
          property: connectionString

databases:
  - name: averon-db
    databaseName: averon
    user: averon
```

**2. Deploy:**

1. Go to https://render.com/
2. New → Web Service
3. Connect GitHub repo
4. Follow prompts
5. Add environment variables

---

## DATABASE SETUP (POSTGRESQL)

### Migration from SQLite to PostgreSQL

**1. Backup SQLite data:**

```bash
cd averon_backend
python manage.py dumpdata > backup.json
```

**2. Update settings for PostgreSQL:**

Already configured in `settings_prod.py` above.

**3. Run migrations on new database:**

```bash
# This happens automatically on Railway/Render
python manage.py migrate
```

**4. Load data (optional):**

```bash
python manage.py loaddata backup.json
```

**5. Create superuser:**

```bash
python manage.py createsuperuser
```

---

## REDIS SETUP

### Railway/Render Redis

Both platforms provide managed Redis. It's automatically configured via `REDIS_URL` environment variable.

**Verify Redis connection:**

```bash
# In Railway terminal
python manage.py shell

>>> from django.core.cache import cache
>>> cache.set('test', 'Hello Redis!')
>>> cache.get('test')
'Hello Redis!'
```

---

## DOMAIN & DNS CONFIGURATION

### Step 1: Purchase Domain

Recommended registrars:
- Namecheap
- Google Domains
- Cloudflare

Example: `averon.al` (Albania domain)

### Step 2: Configure DNS for Next.js (Vercel)

**In your domain registrar DNS settings:**

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**In Vercel:**

1. Project → Settings → Domains
2. Add domain: `averon.al`
3. Add domain: `www.averon.al`
4. Wait for DNS propagation (up to 48 hours, usually 10 minutes)

### Step 3: Configure DNS for Django (Railway)

**Option A: Use Railway subdomain**

Your API will be at: `https://your-app.railway.app/api`

**Option B: Use custom subdomain**

```
Type: CNAME
Name: api
Value: your-app.railway.app
TTL: 3600
```

Then in Railway → Settings → Domains → Add `api.averon.al`

### Step 4: Update CORS Settings

Update Django `settings_prod.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'https://averon.al',
    'https://www.averon.al',
]

ALLOWED_HOSTS = [
    'averon.al',
    'www.averon.al',
    'api.averon.al',
    'your-app.railway.app',
]
```

---

## ENVIRONMENT VARIABLES

### Next.js (.env.production)

```bash
# API
NEXT_PUBLIC_API_URL=https://api.averon.al/api
NEXT_PUBLIC_SITE_URL=https://averon.al

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

### Django (Railway/Render Environment Variables)

```bash
# Django
DJANGO_SETTINGS_MODULE=core.settings_prod
SECRET_KEY=your-super-secret-key
DEBUG=False

# Hosts
ALLOWED_HOSTS=averon.al,www.averon.al,api.averon.al,your-app.railway.app
FRONTEND_URL=https://averon.al

# Database (auto-configured by Railway/Render)
DATABASE_URL=postgresql://user:pass@host:5432/db

# Redis (auto-configured by Railway/Render)
REDIS_URL=redis://host:6379

# Email
EMAIL_HOST_USER=averonagencyal@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
CONTACT_EMAIL_RECIPIENT=info@averon.al

# Security (optional)
SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## POST-DEPLOYMENT TESTING

### Checklist

- [ ] **Homepage loads:** https://averon.al
- [ ] **HTTPS works:** Green padlock in browser
- [ ] **Images load:** Check all portfolio images
- [ ] **Contact form works:** Submit test form
- [ ] **Receive email:** Check inbox for notification
- [ ] **API responds:** Test API endpoints
- [ ] **Admin works:** https://api.averon.al/admin/
- [ ] **SEO tags present:** View page source
- [ ] **Analytics tracking:** Check Real-Time in GA
- [ ] **Mobile responsive:** Test on phone
- [ ] **Performance:** Run PageSpeed Insights

### Testing Commands

```bash
# Test Next.js
curl -I https://averon.al

# Test Django API
curl https://api.averon.al/api/

# Test contact form
curl -X POST https://api.averon.al/api/contacts/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'

# Check SSL
curl -vI https://averon.al 2>&1 | grep SSL
```

---

## MONITORING & MAINTENANCE

### Set Up Monitoring

**1. Vercel Analytics (Free):**

Already included in Vercel deployment. View in dashboard.

**2. Railway Metrics:**

View in Railway dashboard → your service → Metrics

**3. Google Analytics:**

Already configured. View real-time users.

**4. Uptime Monitoring (Optional):**

Use services like:
- UptimeRobot (free)
- Pingdom
- Better Uptime

Add monitors for:
- https://averon.al (Next.js)
- https://api.averon.al/api/ (Django API)

**5. Error Tracking (Optional - Recommended):**

Install Sentry:

```bash
# Next.js
npm install @sentry/nextjs

# Django
pip install sentry-sdk
```

### Regular Maintenance

**Weekly:**
- [ ] Check uptime status
- [ ] Review error logs
- [ ] Monitor disk usage
- [ ] Check email deliverability

**Monthly:**
- [ ] Update dependencies
- [ ] Review security alerts
- [ ] Check SSL certificate expiry
- [ ] Backup database
- [ ] Review analytics

**Quarterly:**
- [ ] Performance audit
- [ ] Security audit
- [ ] Update documentation
- [ ] Review and optimize costs

---

## TROUBLESHOOTING

### Common Issues

#### Issue: "502 Bad Gateway" on Next.js

**Cause:** Build failed or deployment error

**Fix:**
```bash
# Check build logs in Vercel dashboard
# Rebuild locally to find issues
npm run build

# Check for errors in logs
```

#### Issue: Django API returning 500 errors

**Cause:** Database connection, missing migrations, or configuration error

**Fix:**
```bash
# Check Railway logs
# Run migrations
python manage.py migrate

# Check environment variables
# Verify DATABASE_URL is set
```

#### Issue: Contact form not sending emails

**Cause:** Email configuration or Gmail app password

**Fix:**
- Verify `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD`
- Check Gmail app password is correct
- Check Django logs for error messages

#### Issue: Images not loading

**Cause:** CORS or path issues

**Fix:**
- Verify images exist in `public/` folder
- Check Next.js build includes images
- Verify image paths don't have typos

#### Issue: "Application Error" on Railway

**Cause:** Procfile missing or gunicorn not installed

**Fix:**
```bash
# Verify Procfile exists
cat Procfile

# Verify gunicorn in requirements.txt
grep gunicorn requirements.txt

# Add if missing
pip install gunicorn
pip freeze > requirements.txt
```

#### Issue: CORS errors in browser console

**Cause:** CORS_ALLOWED_ORIGINS doesn't include frontend domain

**Fix:**

Update Django settings:
```python
CORS_ALLOWED_ORIGINS = [
    'https://averon.al',
    'https://www.averon.al',
]
```

Redeploy Django.

---

## DEPLOYMENT COMMANDS QUICK REFERENCE

### Vercel (Next.js)

```bash
# Install CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls
```

### Railway (Django)

```bash
# Install CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
git push origin main  # Automatic deployment

# Run commands
railway run python manage.py migrate
railway run python manage.py createsuperuser

# View logs
railway logs

# Open in browser
railway open
```

---

## ESTIMATED DEPLOYMENT TIME

### First-Time Deployment:

| Task | Time |
|------|------|
| Preparation | 30 min |
| Next.js to Vercel | 15 min |
| Django to Railway | 30 min |
| Database setup | 15 min |
| Redis setup | 10 min |
| Domain configuration | 20 min |
| Testing | 30 min |
| **Total** | **2.5 hours** |

### Subsequent Deployments:

- Next.js update: 2 minutes (automatic)
- Django update: 5 minutes (automatic)

---

## COSTS ESTIMATE

### Free Tier (Development/Testing):

- **Vercel:** Free (Hobby plan)
- **Railway:** $5/month credit (enough for small app)
- **Domain:** $10-15/year

**Total:** ~$0-5/month + domain

### Production (Recommended):

- **Vercel Pro:** $20/month (better performance, analytics)
- **Railway Starter:** $5-20/month (depending on usage)
- **Domain:** $10-15/year

**Total:** ~$30-45/month

### Enterprise:

- **Vercel Enterprise:** Custom pricing
- **Railway Pro:** $20+/month
- **AWS/DigitalOcean:** $50-200/month

**Total:** ~$100-500/month

---

## NEXT STEPS AFTER DEPLOYMENT

1. ✅ **Verify everything works**
2. ✅ **Set up monitoring**
3. ✅ **Configure backups**
4. ✅ **Submit to Google Search Console**
5. ✅ **Set up Google My Business**
6. ✅ **Start SEO optimization**
7. ✅ **Begin content marketing**
8. ✅ **Collect user feedback**

---

**You're ready to deploy! 🚀**

Follow this guide step-by-step and you'll have a production-ready website in 2-3 hours.
