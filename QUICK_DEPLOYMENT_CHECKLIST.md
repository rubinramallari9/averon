# ⚡ Quick Deployment Checklist - Averon Digital

## 🎯 30-Minute Quick Start

### Step 1: Get a Server (5 min)
- [ ] Sign up for DigitalOcean/Linode/Hetzner
- [ ] Create Ubuntu 22.04 droplet (2GB RAM minimum)
- [ ] Note server IP address

### Step 2: Configure Environment (10 min)

**Generate SECRET_KEY:**
```bash
python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**Backend .env** (`averon_backend/.env`):
```bash
SECRET_KEY=<generated-above>
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com,<server-ip>
DB_PASSWORD=<generate-strong-password>
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=<gmail-app-password>
```

**Frontend .env.local** (`averon-nextjs/.env.local`):
```bash
NEXT_PUBLIC_API_URL=https://your-domain.com/api
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Step 3: Deploy (10 min)
```bash
# SSH into server
ssh root@<server-ip>

# Install Docker
curl -fsSL https://get.docker.com | sh

# Clone repository
git clone <your-repo-url>
cd averon

# Start services
docker compose up -d

# Run migrations
docker compose exec django python manage.py migrate
docker compose exec django python manage.py createsuperuser
docker compose exec django python manage.py collectstatic --noinput
```

### Step 4: Configure DNS (5 min)
- [ ] Point domain A record to server IP
- [ ] Wait 5-15 minutes for DNS propagation
- [ ] Verify: `dig your-domain.com +short`

### Step 5: SSL Certificate
```bash
# Get SSL certificate
docker compose run --rm certbot certonly \
  --standalone \
  --email your-email@gmail.com \
  --agree-tos \
  -d your-domain.com \
  -d www.your-domain.com

# Update nginx.conf (uncomment SSL blocks)
nano nginx.conf

# Restart
docker compose restart nginx
```

---

## ✅ Final Verification

- [ ] Visit https://your-domain.com (loads correctly)
- [ ] Test contact form
- [ ] Check email received
- [ ] Access admin: https://your-domain.com/admin/
- [ ] API docs: https://your-domain.com/api/docs/
- [ ] SSL valid (green lock icon)

---

## 🔧 Essential Commands

```bash
# View logs
docker compose logs -f

# Restart service
docker compose restart django

# Rebuild
docker compose up -d --build

# Backup database
docker compose exec db pg_dump -U averon_user averon_db > backup.sql
```

---

## 🚨 If Something Goes Wrong

```bash
# Check service status
docker compose ps

# View specific logs
docker compose logs django
docker compose logs nextjs

# Restart everything
docker compose down
docker compose up -d
```

---

## 📞 Support Resources

- Full guide: `DEPLOYMENT_ANALYSIS_2026.md`
- Backend guide: `DEPLOYMENT_GUIDE.md`
- Docker: `docker-compose.yml`

---

**Total Time**: 30-60 minutes
**Cost**: $6-12/month
**Difficulty**: Intermediate

Good luck! 🚀
