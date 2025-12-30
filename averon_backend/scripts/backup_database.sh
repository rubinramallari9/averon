#!/bin/bash

##############################################################################
# PostgreSQL Database Backup Script for Averon
##############################################################################
# This script creates compressed backups of the PostgreSQL database
# and maintains a rotation of backup files
##############################################################################

set -e  # Exit on error

# Load environment variables
if [ -f ../.env ]; then
    export $(grep -v '^#' ../.env | xargs)
fi

# Configuration
BACKUP_DIR="${BACKUP_DIR:-/var/backups/postgresql/averon}"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="averon_db_${DATE}.sql.gz"

# Database credentials from environment
DB_NAME="${DB_NAME:-averon_db}"
DB_USER="${DB_USER:-averon_user}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Averon Database Backup ===${NC}"
echo "Date: $(date)"
echo "Database: $DB_NAME"
echo "Host: $DB_HOST"
echo ""

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    echo -e "${YELLOW}Creating backup directory: $BACKUP_DIR${NC}"
    mkdir -p "$BACKUP_DIR"
    chmod 700 "$BACKUP_DIR"
fi

# Create backup
echo -e "${GREEN}Creating backup...${NC}"
PGPASSWORD="$DB_PASSWORD" pg_dump \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d "$DB_NAME" \
    --no-owner \
    --no-acl \
    -F p \
    | gzip > "${BACKUP_DIR}/${BACKUP_FILE}"

# Check if backup was successful
if [ $? -eq 0 ]; then
    BACKUP_SIZE=$(du -h "${BACKUP_DIR}/${BACKUP_FILE}" | cut -f1)
    echo -e "${GREEN}✓ Backup created successfully${NC}"
    echo "  File: ${BACKUP_FILE}"
    echo "  Size: ${BACKUP_SIZE}"
    echo "  Path: ${BACKUP_DIR}/${BACKUP_FILE}"
else
    echo -e "${RED}✗ Backup failed!${NC}"
    exit 1
fi

# Verify backup integrity
echo -e "${GREEN}Verifying backup integrity...${NC}"
gunzip -t "${BACKUP_DIR}/${BACKUP_FILE}"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backup verification passed${NC}"
else
    echo -e "${RED}✗ Backup verification failed!${NC}"
    exit 1
fi

# Cleanup old backups
echo -e "${GREEN}Cleaning up old backups (keeping last ${RETENTION_DAYS} days)...${NC}"
find "$BACKUP_DIR" -name "averon_db_*.sql.gz" -type f -mtime +${RETENTION_DAYS} -delete
REMAINING=$(find "$BACKUP_DIR" -name "averon_db_*.sql.gz" -type f | wc -l)
echo -e "${GREEN}✓ Cleanup complete${NC}"
echo "  Remaining backups: ${REMAINING}"

# List recent backups
echo ""
echo -e "${GREEN}Recent backups:${NC}"
ls -lh "$BACKUP_DIR" | tail -5

# Optional: Upload to cloud storage (uncomment and configure)
# echo -e "${GREEN}Uploading to cloud storage...${NC}"
# aws s3 cp "${BACKUP_DIR}/${BACKUP_FILE}" "s3://your-bucket/backups/database/"
# OR
# rclone copy "${BACKUP_DIR}/${BACKUP_FILE}" remote:backups/database/

echo ""
echo -e "${GREEN}=== Backup Complete ===${NC}"
echo "Backup file: ${BACKUP_FILE}"
echo "Full path: ${BACKUP_DIR}/${BACKUP_FILE}"
