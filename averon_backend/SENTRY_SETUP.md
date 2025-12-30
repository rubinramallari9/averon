# Sentry Error Tracking Setup Guide

## Overview

Sentry has been integrated into the Averon backend for real-time error tracking and performance monitoring. This guide explains how to set it up and use it.

## What is Sentry?

Sentry is an error tracking and performance monitoring platform that:
- Captures and tracks errors in real-time
- Provides detailed stack traces and context
- Monitors application performance
- Alerts you when issues occur
- Helps identify and fix bugs faster

## Setup Instructions

### 1. Create a Sentry Account

1. Go to [https://sentry.io](https://sentry.io)
2. Sign up for a free account (Free tier includes 5,000 errors/month)
3. Create a new project and select "Django" as the platform
4. Copy your DSN (Data Source Name) - it looks like: `https://abc123@o123456.ingest.sentry.io/789012`

### 2. Configure Environment Variables

Add the following to your `.env` file:

```bash
# Sentry Configuration
SENTRY_DSN=https://your-actual-dsn@sentry.io/your-project-id
SENTRY_ENVIRONMENT=production  # or 'staging', 'development'
SENTRY_TRACES_SAMPLE_RATE=0.1  # 10% sampling for performance monitoring
```

**Important:**
- Never commit your SENTRY_DSN to git (it's already in .gitignore)
- Use different Sentry projects for development, staging, and production
- Adjust `SENTRY_TRACES_SAMPLE_RATE` based on your traffic (0.1 = 10% of requests)

### 3. Install Sentry SDK

The Sentry SDK is already added to `requirements.txt`. Install it with:

```bash
pip install -r requirements.txt
```

### 4. Test the Integration

#### Option A: Use the Django Shell

```bash
python manage.py shell
```

Then run:

```python
from sentry_sdk import capture_message, capture_exception

# Test a simple message
capture_message("Sentry is configured correctly!")

# Test an exception
try:
    1 / 0
except Exception as e:
    capture_exception(e)
```

#### Option B: Trigger a Test Error via API

```bash
# This endpoint intentionally raises an error for testing
curl http://localhost:8000/api/sentry-debug/
```

Check your Sentry dashboard - you should see the error appear within seconds!

## Configuration Details

### Current Sentry Settings

Located in `core/settings.py`:

```python
- **DSN**: Loaded from SENTRY_DSN environment variable
- **Environment**: Distinguishes between dev/staging/production
- **Traces Sample Rate**: Performance monitoring (10% by default)
- **PII**: Disabled by default for privacy
- **Integrations**:
  - DjangoIntegration: Automatic Django error capture
  - LoggingIntegration: Captures WARNING+ logs as events
```

### What Gets Tracked Automatically?

1. **Uncaught Exceptions**: Any unhandled errors in your Django app
2. **HTTP Errors**: 500 errors and other server errors
3. **Database Errors**: SQL errors, connection issues
4. **Performance**: Slow database queries, slow views (with traces enabled)
5. **Warnings**: Log messages at WARNING level and above

### What's Excluded?

- User passwords and sensitive data (PII disabled)
- Request bodies over 'medium' size
- Development errors (when SENTRY_DSN is not set)

## Usage in Code

### Manual Error Capture

```python
from sentry_sdk import capture_exception, capture_message

try:
    risky_operation()
except Exception as e:
    capture_exception(e)
```

### Adding Context

```python
import sentry_sdk

with sentry_sdk.push_scope() as scope:
    scope.set_tag("payment_method", "credit_card")
    scope.set_context("payment_info", {
        "amount": 99.99,
        "currency": "USD",
    })
    capture_message("Payment processed successfully")
```

### User Context (if you add authentication)

```python
sentry_sdk.set_user({
    "id": user.id,
    "email": user.email,
    "username": user.username
})
```

## Sentry Dashboard Features

### Issues Tab
- View all errors grouped by type
- See frequency, affected users, and first/last occurrence
- Stack traces with code context
- Breadcrumbs showing actions leading to the error

### Performance Tab
- View slow transactions
- Database query performance
- Endpoint response times
- Identify bottlenecks

### Alerts
Set up alerts to notify you when:
- A new error occurs
- An error affects > X users
- Error rate exceeds threshold
- Performance degrades

## Best Practices

1. **Use Different Projects**: Separate Sentry projects for dev/staging/prod
2. **Set Sample Rates**: Adjust `SENTRY_TRACES_SAMPLE_RATE` for high-traffic apps
3. **Add Context**: Use tags and context for better debugging
4. **Review Regularly**: Check Sentry dashboard weekly
5. **Fix Issues**: Resolve or ignore issues to keep dashboard clean
6. **Set Alerts**: Configure notifications for critical errors

## Costs

- **Free Tier**: 5,000 errors/month + 10,000 performance units/month
- **Paid Plans**: Start at $26/month for 50,000 errors
- Errors are counted when similar issues are grouped

## Disabling Sentry

To disable Sentry (for local development):

1. Remove or comment out `SENTRY_DSN` in your `.env` file
2. Sentry will automatically be disabled when DSN is empty

## Troubleshooting

### Errors Not Appearing in Sentry

1. Check that `SENTRY_DSN` is set correctly in `.env`
2. Verify the DSN is valid in your Sentry project settings
3. Check network connectivity to sentry.io
4. Look for Sentry errors in console output (if `DEBUG=True`)

### Too Many Errors

1. Reduce `SENTRY_TRACES_SAMPLE_RATE` to lower performance monitoring
2. Filter out noisy errors using Sentry's Inbound Filters
3. Set up proper error handling to catch expected errors

### Performance Impact

Sentry has minimal performance impact:
- Async error sending (non-blocking)
- Configurable sampling rates
- Smart rate limiting

## Support

- Sentry Documentation: https://docs.sentry.io/platforms/python/guides/django/
- Sentry Community: https://forum.sentry.io/
- Our Implementation: Check `core/settings.py` lines 342-380
