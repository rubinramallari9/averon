# 🚀 Copy-Paste Ready Performance Code

## DJANGO BACKEND OPTIMIZATION

### Step 1: Install Performance Dependencies

```bash
cd averon_backend
source venv/bin/activate
pip install django-redis django-compression-middleware django-cors-headers
```

### Step 2: Update Django Settings

`averon_backend/core/settings.py`:

```python
# Add at the top
import os
from pathlib import Path

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'django-insecure-&woes$q)z%-p3wumk+!gbac!^+(&h(wt=z^itrhmy_w6ek8$oz')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third party apps
    'rest_framework',
    'corsheaders',

    # Added apps
    'contact'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Must be before CommonMiddleware
    'django.middleware.gzip.GZipMiddleware',  # Enable compression
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'core.seo_middleware.SEOMiddleware',  # Custom SEO middleware
]

# Cache Configuration (Production-ready)
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': os.environ.get('REDIS_URL', 'redis://127.0.0.1:6379/1'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        },
        'KEY_PREFIX': 'averon',
        'TIMEOUT': 300,  # 5 minutes default
    }
}

# Session Cache
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'

# REST Framework Optimization
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour'
    }
}

# CORS Configuration (Production-ready)
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://averon.al',  # Add your production domain
    'https://www.averon.al',
]

CORS_ALLOW_CREDENTIALS = True

# Security Settings (Production)
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'SAMEORIGIN'

if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

# Static and Media Files Optimization
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Database Connection Pooling (Add django-db-pool if using PostgreSQL)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
        'CONN_MAX_AGE': 600,  # Keep connections alive for 10 minutes
    }
}

# Logging Configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO' if DEBUG else 'WARNING',
    },
}
```

### Step 3: Create Optimized Contact ViewSet with Caching

`averon_backend/contact/views.py`:

```python
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.core.cache import cache
from .models import Contacts
from .serializers import ContactSerializer, ContactListSerializer
import logging

logger = logging.getLogger(__name__)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contacts.objects.all()
    serializer_class = ContactSerializer

    def get_serializer_class(self):
        """Use different serializers for list and detail views"""
        if self.action == 'list':
            return ContactListSerializer  # Lighter serializer
        return ContactSerializer

    @method_decorator(cache_page(60 * 15))  # Cache for 15 minutes
    def list(self, request, *args, **kwargs):
        """Cached list endpoint"""
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """Optimized create with async email sending"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Save to database
        self.perform_create(serializer)

        # Send email asynchronously (in production, use Celery)
        try:
            self._send_notification_email(serializer.data)
        except Exception as e:
            logger.error(f"Error sending email: {str(e)}")
            # Don't fail the request if email fails

        # Invalidate list cache
        cache.delete('contact_list')

        return Response(
            {
                'message': 'Contact form submitted successfully',
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    def _send_notification_email(self, contact_data):
        """Send notification email (should be async in production)"""
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
            fail_silently=True,  # Don't crash if email fails
        )

    @action(detail=False, methods=['get'])
    @method_decorator(cache_page(60 * 60))  # Cache for 1 hour
    def stats(self, request):
        """Get contact statistics (cached)"""
        total = self.queryset.count()
        return Response({'total_contacts': total})
```

### Step 4: Create Lightweight Serializers

`averon_backend/contact/serializers.py`:

```python
from rest_framework import serializers
from .models import Contacts


class ContactSerializer(serializers.ModelSerializer):
    """Full serializer for detail views"""
    class Meta:
        model = Contacts
        fields = ['id', 'email', 'name', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class ContactListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""
    class Meta:
        model = Contacts
        fields = ['id', 'name', 'email']  # Only essential fields
        read_only_fields = ['id']
```

### Step 5: Update Contact Model with Timestamps

`averon_backend/contact/models.py`:

```python
from django.db import models


class Contacts(models.Model):
    email = models.EmailField(max_length=255, db_index=True)
    name = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['email']),
        ]

    def __str__(self):
        return f"{self.name} - {self.email}"
```

### Step 6: Add Compression Middleware

`averon_backend/core/compression_middleware.py`:

```python
from django.utils.deprecation import MiddlewareMixin
import gzip
import io


class BrotliMiddleware(MiddlewareMixin):
    """
    Middleware to compress responses using Brotli or Gzip
    """
    def process_response(self, request, response):
        # Don't compress if already compressed
        if response.has_header('Content-Encoding'):
            return response

        # Don't compress small responses
        if len(response.content) < 200:
            return response

        # Check Accept-Encoding header
        accept_encoding = request.META.get('HTTP_ACCEPT_ENCODING', '')

        # Compress with Gzip (Brotli requires additional library)
        if 'gzip' in accept_encoding.lower():
            compressed_content = gzip.compress(response.content)
            response.content = compressed_content
            response['Content-Encoding'] = 'gzip'
            response['Content-Length'] = str(len(compressed_content))

        return response
```

### Step 7: Production-Ready Gunicorn Configuration

Create `averon_backend/gunicorn.conf.py`:

```python
import multiprocessing

# Server socket
bind = '0.0.0.0:8000'
backlog = 2048

# Worker processes
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = 'sync'
worker_connections = 1000
timeout = 30
keepalive = 2

# Server mechanics
daemon = False
pidfile = None
umask = 0
user = None
group = None
tmp_upload_dir = None

# Logging
errorlog = '-'
loglevel = 'info'
accesslog = '-'
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# Process naming
proc_name = 'averon_backend'

# Server hooks
def on_starting(server):
    pass

def on_reload(server):
    pass

def when_ready(server):
    pass

def pre_fork(server, worker):
    pass

def post_fork(server, worker):
    pass

def post_worker_init(worker):
    pass

def worker_int(worker):
    pass

def worker_abort(worker):
    pass

def pre_exec(server):
    pass

def pre_request(worker, req):
    worker.log.debug("%s %s" % (req.method, req.path))

def post_request(worker, req, environ, resp):
    pass

def child_exit(server, worker):
    pass

def worker_exit(server, worker):
    pass

def nworkers_changed(server, new_value, old_value):
    pass

def on_exit(server):
    pass
```

---

## NEXT.JS PRODUCTION CONFIGURATION

### Update next.config.ts (Production-Ready)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* SEO & Performance Optimizations */

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'code.visualstudio.com',
        pathname: '/assets/**',
      },
    ],
  },

  // Output configuration
  output: 'standalone', // For Docker deployment

  // Compression
  compress: true,

  // PoweredBy header removal for security
  poweredByHeader: false,

  // Trailing slash preference
  trailingSlash: false,

  // React strict mode
  reactStrictMode: true,

  // SWC minification
  swcMinify: true,

  // Redirects
  async redirects() {
    return [
      // Add your redirects here
    ];
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Webpack optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle these on client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Optimize bundle
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    };

    return config;
  },
};

export default nextConfig;
```

---

## TAILWIND CSS OPTIMIZATION

### Update tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Enable JIT mode
  mode: 'jit',
  // Purge unused styles
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: [
        // Keep these classes even if not detected
        'animate-pulse',
        'animate-text-shine',
      ],
    },
  },
}
```

---

## BUNDLE ANALYZER SETUP

### Install bundle analyzer

```bash
npm install --save-dev @next/bundle-analyzer
```

### Update next.config.ts

```typescript
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
```

### Add script to package.json

```json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build"
  }
}
```

---

*Continued in CORE_WEB_VITALS_FIXES.md...*
