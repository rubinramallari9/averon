# Database Backup & Restore Guide

## Overview

This guide explains how to backup and restore your PostgreSQL database for the Averon project. Both manual and automated backup solutions are provided.

## Quick Start

### Manual Backup

```bash
cd averon_backend/scripts
chmod +x backup_database.sh
./backup_database.sh
```

### Manual Restore

```bash
cd averon_backend/scripts
chmod +x restore_database.sh

# Restore latest backup
./restore_database.sh latest

# Restore specific backup
./restore_database.sh averon_db_20241228_120000.sql.gz
```

## Backup Script Features

### What Gets Backed Up?
- Complete database schema
- All table data
- Indexes and constraints
- Sequences and views

### What's NOT Backed Up?
- User permissions (--no-acl flag)
- Database owner (--no-owner flag)
- PostgreSQL server configuration

### Backup File Format
- Compressed with gzip (.sql.gz)
- Plain SQL format (easy to inspect/edit)
- Timestamp-based naming: `averon_db_YYYYMMDD_HHMMSS.sql.gz`

### Automatic Cleanup
- Default retention: 7 days
- Older backups are automatically deleted
- Configurable via `BACKUP_RETENTION_DAYS` env variable

## Configuration

### Environment Variables

Add these to your `.env` file or export them before running scripts:

```bash
# Required (from existing .env)
DB_NAME=averon_db
DB_USER=averon_user
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432

# Backup-specific (optional)
BACKUP_DIR=/var/backups/postgresql/averon  # Where to store backups
BACKUP_RETENTION_DAYS=7  # How many days to keep backups
```

### Default Values

If not specified:
- `BACKUP_DIR`: `/var/backups/postgresql/averon`
- `BACKUP_RETENTION_DAYS`: `7`
- `DB_HOST`: `localhost`
- `DB_PORT`: `5432`

## Automated Backups

### Option 1: Cron Job (Linux/Mac)

1. Make scripts executable:
```bash
chmod +x scripts/backup_database.sh
chmod +x scripts/restore_database.sh
```

2. Edit crontab:
```bash
crontab -e
```

3. Add one of these schedules:

```bash
# Daily backup at 2 AM
0 2 * * * cd /path/to/averon_backend && ./scripts/backup_database.sh >> /var/log/averon_backup.log 2>&1

# Twice daily (2 AM and 2 PM)
0 2,14 * * * cd /path/to/averon_backend && ./scripts/backup_database.sh >> /var/log/averon_backup.log 2>&1

# Every 6 hours
0 */6 * * * cd /path/to/averon_backend && ./scripts/backup_database.sh >> /var/log/averon_backup.log 2>&1

# Weekly (Sunday at 3 AM)
0 3 * * 0 cd /path/to/averon_backend && ./scripts/backup_database.sh >> /var/log/averon_backup.log 2>&1
```

4. View cron logs:
```bash
tail -f /var/log/averon_backup.log
```

### Option 2: Systemd Timer (Linux)

1. Create service file `/etc/systemd/system/averon-backup.service`:

```ini
[Unit]
Description=Averon Database Backup
After=postgresql.service

[Service]
Type=oneshot
User=postgres
WorkingDirectory=/path/to/averon_backend
ExecStart=/path/to/averon_backend/scripts/backup_database.sh
StandardOutput=journal
StandardError=journal
```

2. Create timer file `/etc/systemd/system/averon-backup.timer`:

```ini
[Unit]
Description=Daily Averon Database Backup
Requires=averon-backup.service

[Timer]
OnCalendar=daily
OnCalendar=02:00
Persistent=true

[Install]
WantedBy=timers.target
```

3. Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable averon-backup.timer
sudo systemctl start averon-backup.timer
sudo systemctl status averon-backup.timer
```

### Option 3: Docker Compose

Add this service to your `docker-compose.yml`:

```yaml
services:
  db-backup:
    image: postgres:16-alpine
    container_name: averon_backup
    depends_on:
      - db
    env_file:
      - ./averon_backend/.env
    volumes:
      - ./backups:/backups
      - ./averon_backend/scripts:/scripts
    command: >
      sh -c "
        while true; do
          /scripts/backup_database.sh
          sleep 86400  # 24 hours
        done
      "
    restart: unless-stopped
```

## Cloud Backup Integration

### AWS S3

1. Install AWS CLI:
```bash
pip install awscli
aws configure
```

2. Modify `backup_database.sh` (uncomment the AWS section):
```bash
aws s3 cp "${BACKUP_DIR}/${BACKUP_FILE}" "s3://your-bucket/backups/database/"
```

3. Test upload:
```bash
./scripts/backup_database.sh
```

### Google Cloud Storage

1. Install gsutil:
```bash
pip install gsutil
```

2. Add to `backup_database.sh`:
```bash
gsutil cp "${BACKUP_DIR}/${BACKUP_FILE}" "gs://your-bucket/backups/database/"
```

### Rclone (Multiple Cloud Providers)

1. Install and configure rclone:
```bash
curl https://rclone.org/install.sh | sudo bash
rclone config  # Follow interactive setup
```

2. Add to `backup_database.sh` (uncomment the rclone section):
```bash
rclone copy "${BACKUP_DIR}/${BACKUP_FILE}" remote:backups/database/
```

Supports: AWS S3, Google Drive, Dropbox, Azure, and 40+ more providers.

## Restore Procedures

### Pre-Restore Checklist

Before restoring a backup:

1. ✅ Stop the Django application
2. ✅ Verify backup file integrity
3. ✅ Create a backup of the current database (just in case!)
4. ✅ Ensure you have the correct backup file
5. ✅ Have database credentials ready

### Restore from Backup

```bash
# 1. List available backups
ls -lh /var/backups/postgresql/averon/

# 2. Restore latest backup
./scripts/restore_database.sh latest

# 3. Restore specific backup
./scripts/restore_database.sh averon_db_20241228_120000.sql.gz

# 4. Run migrations (if needed)
python manage.py migrate

# 5. Restart Django application
sudo systemctl restart gunicorn  # or your process manager
```

### Partial Restore (Specific Tables)

If you only need to restore specific tables:

```bash
# Extract backup
gunzip -c /var/backups/postgresql/averon/averon_db_20241228_120000.sql.gz > /tmp/backup.sql

# Extract specific table
grep -A 10000 "CREATE TABLE contact_contacts" /tmp/backup.sql > /tmp/contacts_table.sql

# Restore specific table
PGPASSWORD="$DB_PASSWORD" psql -U averon_user -d averon_db < /tmp/contacts_table.sql

# Cleanup
rm /tmp/backup.sql /tmp/contacts_table.sql
```

## Testing Backup Integrity

### Regular Verification

Test your backups monthly:

```bash
# 1. Create a test database
PGPASSWORD="$DB_PASSWORD" psql -U averon_user -d postgres -c "CREATE DATABASE averon_test;"

# 2. Restore backup to test database
gunzip -c /var/backups/postgresql/averon/averon_db_20241228_120000.sql.gz | \
  PGPASSWORD="$DB_PASSWORD" psql -U averon_user -d averon_test

# 3. Verify data
PGPASSWORD="$DB_PASSWORD" psql -U averon_user -d averon_test -c "SELECT COUNT(*) FROM contact_contacts;"

# 4. Cleanup
PGPASSWORD="$DB_PASSWORD" psql -U averon_user -d postgres -c "DROP DATABASE averon_test;"
```

### Automated Verification Script

```bash
#!/bin/bash
# test_backup.sh

LATEST_BACKUP=$(ls -t /var/backups/postgresql/averon/averon_db_*.sql.gz | head -1)
TEST_DB="averon_test_$(date +%s)"

# Create test database
PGPASSWORD="$DB_PASSWORD" psql -U averon_user -d postgres -c "CREATE DATABASE $TEST_DB;"

# Restore
gunzip -c "$LATEST_BACKUP" | PGPASSWORD="$DB_PASSWORD" psql -U averon_user -d "$TEST_DB" > /dev/null 2>&1

# Check if successful
if [ $? -eq 0 ]; then
    echo "✓ Backup verification successful: $(basename $LATEST_BACKUP)"
    PGPASSWORD="$DB_PASSWORD" psql -U averon_user -d postgres -c "DROP DATABASE $TEST_DB;"
    exit 0
else
    echo "✗ Backup verification failed: $(basename $LATEST_BACKUP)"
    exit 1
fi
```

## Monitoring & Alerts

### Email Notifications

Add to the end of `backup_database.sh`:

```bash
# Send email notification
if [ $? -eq 0 ]; then
    echo "Backup successful: ${BACKUP_FILE}" | mail -s "Averon Backup Success" admin@averon.al
else
    echo "Backup failed!" | mail -s "Averon Backup FAILURE" admin@averon.al
fi
```

### Slack Notifications

```bash
# Add to backup_database.sh
SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

if [ $? -eq 0 ]; then
    curl -X POST -H 'Content-type: application/json' \
      --data "{\"text\":\"✓ Averon backup successful: ${BACKUP_FILE}\"}" \
      "$SLACK_WEBHOOK"
else
    curl -X POST -H 'Content-type: application/json' \
      --data "{\"text\":\"✗ Averon backup FAILED!\"}" \
      "$SLACK_WEBHOOK"
fi
```

## Troubleshooting

### Permission Denied

```bash
chmod +x scripts/backup_database.sh
chmod +x scripts/restore_database.sh
```

### pg_dump: command not found

Install PostgreSQL client tools:
```bash
# Ubuntu/Debian
sudo apt-get install postgresql-client

# macOS
brew install postgresql
```

### Out of Disk Space

Check available space:
```bash
df -h /var/backups/postgresql/averon/
```

Reduce retention or cleanup old backups:
```bash
# Delete backups older than 3 days
find /var/backups/postgresql/averon/ -name "*.sql.gz" -mtime +3 -delete
```

### Backup Too Large

Enable compression level:
```bash
# In backup_database.sh, change gzip to:
gzip -9  # Maximum compression (slower but smaller)
```

## Security Best Practices

1. **Encrypt Backups**:
   ```bash
   # Encrypt backup
   gpg --symmetric --cipher-algo AES256 backup.sql.gz

   # Decrypt backup
   gpg --decrypt backup.sql.gz.gpg > backup.sql.gz
   ```

2. **Secure Backup Directory**:
   ```bash
   chmod 700 /var/backups/postgresql/averon/
   chown postgres:postgres /var/backups/postgresql/averon/
   ```

3. **Store Passwords Securely**:
   - Use `.pgpass` file instead of environment variables
   - Never commit backup scripts with hardcoded credentials

4. **Offsite Backups**:
   - Always maintain at least one offsite backup (cloud storage)
   - Follow the 3-2-1 rule: 3 copies, 2 different media, 1 offsite

## Disaster Recovery Plan

### RTO (Recovery Time Objective): 1 hour
### RPO (Recovery Point Objective): 24 hours

In case of total database loss:

1. **Immediate Actions** (5 minutes):
   - Alert team
   - Stop application to prevent data inconsistency
   - Identify latest valid backup

2. **Recovery** (30-45 minutes):
   - Download backup from cloud storage (if needed)
   - Verify backup integrity
   - Restore database using restore script
   - Run migrations if needed

3. **Verification** (10 minutes):
   - Test critical application functions
   - Verify data integrity
   - Check application logs

4. **Resume Operations** (5 minutes):
   - Restart application
   - Monitor for errors
   - Notify stakeholders

## Backup Checklist

### Daily:
- [ ] Automated backup runs successfully
- [ ] Backup file created and compressed
- [ ] Old backups cleaned up

### Weekly:
- [ ] Verify backup file integrity
- [ ] Check available disk space
- [ ] Review backup logs for errors

### Monthly:
- [ ] Test restore procedure
- [ ] Verify cloud backups (if configured)
- [ ] Update disaster recovery plan
- [ ] Review and adjust retention policy

## Support

For backup-related issues:
- Check logs: `/var/log/averon_backup.log`
- Review script output for error messages
- Verify PostgreSQL service is running: `sudo systemctl status postgresql`
- Check disk space: `df -h`
