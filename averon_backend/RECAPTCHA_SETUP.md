# Google reCAPTCHA v3 Setup Guide

## Overview

Google reCAPTCHA v3 has been integrated into the contact form to protect against spam and bot submissions. Unlike v2, reCAPTCHA v3 runs invisibly in the background and assigns a score (0.0 - 1.0) to each request based on how likely it is to be legitimate.

## Features

✅ **Invisible Protection**: No "I'm not a robot" checkbox
✅ **Score-Based**: Returns a risk score (0.0 = bot, 1.0 = human)
✅ **Configurable Threshold**: Adjust sensitivity (default: 0.5)
✅ **Logging**: All verifications are logged for monitoring
✅ **Graceful Degradation**: If reCAPTCHA is not configured, it's skipped

## Backend Implementation

### What's Been Added

1. **`contact/recaptcha.py`**: reCAPTCHA verification utility
   - `verify_recaptcha()`: Verifies token with Google servers
   - `check_recaptcha_score()`: Validates score against threshold

2. **Updated `contact/serializers.py`**:
   - Added `recaptcha_token` field (write-only, optional)

3. **Updated `contact/views.py`**:
   - Integrated reCAPTCHA verification in `create()` method
   - Logs verification results
   - Returns appropriate errors for failed verification

4. **Updated `core/settings.py`**:
   - Added `RECAPTCHA_SECRET_KEY` configuration
   - Added `RECAPTCHA_SITE_KEY` configuration

5. **Updated `requirements.txt`**:
   - Added `requests` library for API calls

## Setup Instructions

### Step 1: Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Sign in with your Google account
3. Click "+" to create a new site
4. Fill in the form:
   - **Label**: Averon Contact Form
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**: Add your domains:
     - `averon.al`
     - `www.averon.al`
     - `localhost` (for development)
   - **Owners**: Add additional Google accounts if needed
   - Accept the terms
5. Click "Submit"
6. Copy your **Site Key** and **Secret Key**

### Step 2: Configure Backend

Add the keys to your `.env` file:

```bash
# Google reCAPTCHA v3
RECAPTCHA_SECRET_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxAA
RECAPTCHA_SITE_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxBB
```

**Important**: Never commit these keys to git! They're already in `.gitignore`.

### Step 3: Configure Frontend

Add reCAPTCHA to your Next.js app:

#### 3.1. Install the reCAPTCHA library

```bash
cd averon-nextjs
npm install react-google-recaptcha-v3
```

#### 3.2. Add reCAPTCHA Provider to `app/layout.tsx`

```tsx
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          scriptProps={{
            async: true,
            defer: true,
            appendTo: 'head',
          }}
        >
          {children}
        </GoogleReCaptchaProvider>
      </body>
    </html>
  );
}
```

#### 3.3. Update Contact Form Component

```tsx
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.log('reCAPTCHA not yet available');
      return;
    }

    // Get reCAPTCHA token
    const token = await executeRecaptcha('contact_form');

    // Submit form data with token
    const response = await fetch('http://localhost:8000/api/contacts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        recaptcha_token: token, // Include the token
      }),
    });

    // Handle response...
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

#### 3.4. Add Environment Variable

Create/update `averon-nextjs/.env.local`:

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxBB
```

## Score Thresholds

The default threshold is **0.5**. You can adjust it in `contact/views.py`:

```python
if not check_recaptcha_score(score, threshold=0.5):  # Adjust this value
    # Reject submission
```

### Recommended Thresholds

| Threshold | Description | Use Case |
|-----------|-------------|----------|
| 0.3 | Very permissive | Allow most submissions, catch obvious bots |
| 0.5 | **Balanced** (default) | Good balance between security and UX |
| 0.7 | Strict | Block more suspicious activity, may reject some humans |
| 0.9 | Very strict | Maximum security, higher false positives |

### Score Interpretation

- **0.0 - 0.3**: Very likely a bot
- **0.3 - 0.5**: Suspicious activity
- **0.5 - 0.7**: Uncertain, could be bot or human
- **0.7 - 1.0**: Very likely a legitimate human

## Testing

### Test reCAPTCHA Integration

1. **Without reCAPTCHA** (graceful degradation):
   ```bash
   # Don't set RECAPTCHA_SECRET_KEY
   curl -X POST http://localhost:8000/api/contacts/ \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
   ```
   Should succeed (reCAPTCHA is skipped if not configured)

2. **With invalid token**:
   ```bash
   curl -X POST http://localhost:8000/api/contacts/ \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test","recaptcha_token":"invalid"}'
   ```
   Should return 400 error with reCAPTCHA verification failure

3. **With valid token** (from frontend):
   - Fill out the contact form on your website
   - Check the server logs for reCAPTCHA score
   - Verify submission succeeds

### View reCAPTCHA Analytics

1. Go to [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click on your site
3. View analytics:
   - Request volume
   - Score distribution
   - Suspicious activity patterns

## Monitoring & Logging

All reCAPTCHA verifications are logged to `logs/security.log`:

```
[INFO] reCAPTCHA verification successful - Score: 0.87
[WARNING] reCAPTCHA score too low (0.32) from IP 192.168.1.100
[WARNING] reCAPTCHA verification failed from IP 192.168.1.101: ['invalid-input-response']
```

## Troubleshooting

### Common Issues

#### 1. "missing-input-secret" error
- **Cause**: RECAPTCHA_SECRET_KEY not set
- **Fix**: Add the secret key to your `.env` file

#### 2. "invalid-input-secret" error
- **Cause**: Wrong secret key
- **Fix**: Double-check your secret key from reCAPTCHA admin

#### 3. "timeout-or-duplicate" error
- **Cause**: Token expired or was already used
- **Fix**: Generate a new token for each submission

#### 4. Score always 0.0
- **Cause**: Domain mismatch or test keys
- **Fix**: Ensure your domain is registered in reCAPTCHA admin

#### 5. Network errors
- **Cause**: Can't reach Google's servers
- **Fix**: Check firewall/proxy settings

### Debug Mode

Enable debug logging in reCAPTCHA verification:

```python
# In contact/recaptcha.py
logger.info(f"reCAPTCHA verification request: {data}")
logger.info(f"reCAPTCHA verification response: {result}")
```

## Security Considerations

### Best Practices

1. **Never expose secret key**: Only use in backend
2. **Use HTTPS**: reCAPTCHA requires HTTPS in production
3. **Validate on backend**: Always verify tokens server-side
4. **Monitor scores**: Adjust threshold based on actual traffic
5. **Rate limiting**: reCAPTCHA complements, doesn't replace rate limiting
6. **Log everything**: Keep logs for security audits

### Score Manipulation

- Scores cannot be manipulated by the client
- Tokens are signed and verified by Google
- Each token is single-use and expires after 2 minutes
- Domain verification prevents token reuse across sites

## Cost & Limits

- **Free tier**: 1,000,000 assessments/month
- **Pricing**: Free for most websites
- **Enterprise**: Available for high-volume sites

## Advanced Configuration

### Custom Actions

Track different forms separately:

```tsx
// In frontend
const token = await executeRecaptcha('contact_form');
const token2 = await executeRecaptcha('newsletter_signup');
```

### Dynamic Threshold

Adjust threshold based on time of day or IP reputation:

```python
# In views.py
threshold = 0.7 if is_peak_hours() else 0.5
if not check_recaptcha_score(score, threshold=threshold):
    # Reject
```

### Fallback for Network Errors

```python
# In contact/recaptcha.py
except requests.RequestException as e:
    logger.error(f"reCAPTCHA verification failed: {str(e)}")
    # Option 1: Allow (permissive)
    return True, 0.5, []
    # Option 2: Reject (strict)
    return False, 0.0, ['network-error']
```

## Migration from reCAPTCHA v2

If you're upgrading from v2:

1. Create a new v3 site in reCAPTCHA admin
2. Update environment variables
3. Remove the checkbox from your frontend
4. Implement the useGoogleReCaptcha hook
5. Test thoroughly before deploying

## Support

- **Google reCAPTCHA Docs**: https://developers.google.com/recaptcha/docs/v3
- **React Library Docs**: https://github.com/dozoisch/react-google-recaptcha-v3
- **Implementation**: Check `contact/recaptcha.py` and `contact/views.py`

## Next Steps

1. ✅ Backend integration complete
2. ⏳ Install `react-google-recaptcha-v3` in frontend
3. ⏳ Add reCAPTCHA provider to layout
4. ⏳ Update contact form to use reCAPTCHA
5. ⏳ Test with real form submissions
6. ⏳ Monitor scores and adjust threshold
7. ⏳ Review analytics weekly
