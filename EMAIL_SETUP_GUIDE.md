# Gmail SMTP Setup Guide

## What I've Done

I've configured your Django backend to send you an email every time someone submits the contact form.

**Email includes:**
- Submitter's name
- Submitter's email
- Their message
- Submission ID

## Setup Steps (5 minutes)

### Step 1: Get Your Gmail App Password

Google requires you to use an "App Password" instead of your regular Gmail password for security.

**Follow these steps:**

1. **Go to your Google Account:**
   - Visit: https://myaccount.google.com/

2. **Enable 2-Step Verification** (if not already enabled):
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup process

3. **Create an App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - OR search "App Passwords" in your Google Account settings
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Name it: "Django Averon Backend"
   - Click "Generate"
   - **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### Step 2: Update Django Settings

Open the file: `averon_backend/core/settings.py`

Find these lines (around line 155-160):

```python
EMAIL_HOST_USER = 'your-email@gmail.com'  # Replace with your Gmail address
EMAIL_HOST_PASSWORD = 'your-app-password'  # Replace with your Gmail App Password
...
CONTACT_EMAIL_RECIPIENT = 'your-email@gmail.com'  # Email where you want to receive contact form submissions
```

**Replace with your actual values:**

```python
EMAIL_HOST_USER = 'youractual@gmail.com'  # Your Gmail address
EMAIL_HOST_PASSWORD = 'abcd efgh ijkl mnop'  # The 16-char app password from Step 1
...
CONTACT_EMAIL_RECIPIENT = 'youractual@gmail.com'  # Where you want to receive emails
```

**Note:** You can send emails FROM one Gmail account and receive them at a DIFFERENT email if you want:
```python
EMAIL_HOST_USER = 'sender@gmail.com'  # Gmail account that sends
CONTACT_EMAIL_RECIPIENT = 'receiver@anydomain.com'  # Where you receive notifications
```

### Step 3: Restart Django Server

Stop your Django server (Ctrl+C) and restart it:

```bash
cd averon_backend
source venv/bin/activate
python manage.py runserver
```

### Step 4: Test It!

1. Go to your Next.js site: `http://localhost:3000`
2. Scroll to the contact form
3. Fill it out with test data
4. Click "Get Started"
5. **Check your email inbox!** (might take 10-30 seconds)

## Email Format

You'll receive an email like this:

```
Subject: New Contact Form Submission from John Doe

New contact form submission received:

Name: John Doe
Email: john@example.com
Message:
I'm interested in your web development services. Can we schedule a call?

---
Submission ID: 5
```

## Troubleshooting

### "Authentication failed" error

**Problem:** Wrong email or password

**Solution:**
1. Double-check your Gmail address in `EMAIL_HOST_USER`
2. Make sure you're using the **App Password** (16 characters), NOT your regular Gmail password
3. Remove any spaces from the app password

### "Connection refused" error

**Problem:** Firewall or network blocking SMTP

**Solution:**
1. Make sure you're not on a restricted network
2. Try with a VPN or different network
3. Check if port 587 is open: `telnet smtp.gmail.com 587`

### Not receiving emails

**Problem:** Email might be in spam or wrong recipient

**Solution:**
1. Check your spam/junk folder
2. Verify `CONTACT_EMAIL_RECIPIENT` is correct
3. Check Django terminal for error messages
4. Try sending a test email manually (see below)

### Test email manually

Open Django shell and test:

```bash
cd averon_backend
source venv/bin/activate
python manage.py shell
```

Then run:

```python
from django.core.mail import send_mail
from django.conf import settings

send_mail(
    subject='Test Email from Django',
    message='This is a test email. If you receive this, your SMTP is working!',
    from_email=settings.EMAIL_HOST_USER,
    recipient_list=[settings.CONTACT_EMAIL_RECIPIENT],
    fail_silently=False,
)
```

If this works, you'll receive a test email!

### Gmail "Less secure app access" (Old method - deprecated)

Google has deprecated this. You MUST use App Passwords now (Steps above).

## Security Notes

### For Development (Current Setup)

Your email credentials are in `settings.py`. This is fine for development.

### For Production (Important!)

**Never commit email credentials to Git!**

Use environment variables instead:

1. Install python-decouple:
```bash
pip install python-decouple
```

2. Create `.env` file in `averon_backend/`:
```env
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
CONTACT_EMAIL_RECIPIENT=your-email@gmail.com
```

3. Update `settings.py`:
```python
from decouple import config

EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
CONTACT_EMAIL_RECIPIENT = config('CONTACT_EMAIL_RECIPIENT')
```

4. Add `.env` to `.gitignore`:
```bash
echo ".env" >> .gitignore
```

## Alternative: Use SendGrid (Recommended for Production)

SendGrid is more reliable for production:

1. Sign up: https://sendgrid.com (free tier: 100 emails/day)
2. Get API key
3. Update settings:

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'apikey'
EMAIL_HOST_PASSWORD = 'your-sendgrid-api-key'
```

## Custom Email Template (Optional Enhancement)

Want HTML emails with better formatting? Let me know and I can set that up!

Current: Plain text email
Optional: HTML email with styling, logo, etc.

## Summary

✅ Email notification configured
✅ Sends email on every form submission
✅ Includes all contact details
✅ Data still saved to database

**Next step:** Follow Step 1 & 2 above to add your Gmail credentials!
