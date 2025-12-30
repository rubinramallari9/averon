#!/bin/bash

##############################################################################
# PostgreSQL Database Restore Script for Averon
##############################################################################
# This script restores the database from a backup file
# WARNING: This will DROP and recreate the database!
##############################################################################

set -e  # Exit on error

# Load environment variables
if [ -f ../.env ]; then
    export $(grep -v '^#' ../.env | xargs)
fi

# Configuration
BACKUP_DIR="${BACKUP_DIR:-/var/backups/postgresql/averon}"

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

echo -e "${YELLOW}=== Averon Database Restore ===${NC}"
echo "Date: $(date)"
echo ""

# Check if backup file is provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Available backups:${NC}"
    ls -lht "$BACKUP_DIR"/averon_db_*.sql.gz | head -10
    echo ""
    echo -e "${RED}Usage: $0 <backup_file>${NC}"
    echo "Example: $0 averon_db_20241228_120000.sql.gz"
    echo ""
    echo "To restore the latest backup:"
    echo "$0 latest"
    exit 1
fi

# Determine backup file
if [ "$1" == "latest" ]; then
    BACKUP_FILE=$(ls -t "$BACKUP_DIR"/averon_db_*.sql.gz | head -1)
    if [ -z "$BACKUP_FILE" ]; then
        echo -e "${RED}No backup files found in $BACKUP_DIR${NC}"
        exit 1
    fi
    echo -e "${GREEN}Using latest backup: $(basename $BACKUP_FILE)${NC}"
else
    BACKUP_FILE="$BACKUP_DIR/$1"
    if [ ! -f "$BACKUP_FILE" ]; then
        echo -e "${RED}Backup file not found: $BACKUP_FILE${NC}"
        exit 1
    fi
fi

# Verify backup file
echo -e "${GREEN}Verifying backup file...${NC}"
gunzip -t "$BACKUP_FILE"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backup file is valid${NC}"
else
    echo -e "${RED}✗ Backup file is corrupted!${NC}"
    exit 1
fi

# Confirmation prompt
echo ""
echo -e "${RED}WARNING: This will DROP and recreate the database '$DB_NAME'${NC}"
echo -e "${RED}All current data will be LOST!${NC}"
echo ""
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}Restore cancelled${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}Starting restore...${NC}"

# Drop existing connections
echo -e "${YELLOW}Terminating existing database connections...${NC}"
PGPASSWORD="$DB_PASSWORD" psql \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d postgres \
    -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$DB_NAME' AND pid <> pg_backend_pid();" \
    > /dev/null 2>&1 || true

# Drop database
echo -e "${YELLOW}Dropping database...${NC}"
PGPASSWORD="$DB_PASSWORD" psql \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d postgres \
    -c "DROP DATABASE IF EXISTS $DB_NAME;" \
    > /dev/null 2>&1

# Create database
echo -e "${GREEN}Creating database...${NC}"
PGPASSWORD="$DB_PASSWORD" psql \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d postgres \
    -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" \
    > /dev/null 2>&1

# Restore from backup
echo -e "${GREEN}Restoring data from backup...${NC}"
gunzip -c "$BACKUP_FILE" | PGPASSWORD="$DB_PASSWORD" psql \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d "$DB_NAME" \
    > /dev/null 2>&1

# Check if restore was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database restored successfully${NC}"

    # Show database stats
    echo ""
    echo -e "${GREEN}Database statistics:${NC}"
    PGPASSWORD="$DB_PASSWORD" psql \
        -h "$DB_HOST" \
        -p "$DB_PORT" \
        -U "$DB_USER" \
        -d "$DB_NAME" \
        -c "SELECT schemaname, tablename, n_tup_ins as inserts, n_tup_upd as updates, n_tup_del as deletes FROM pg_stat_user_tables ORDER BY tablename;"
else
    echo -e "${RED}✗ Database restore failed!${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}=== Restore Complete ===${NC}"
echo "Database: $DB_NAME"
echo "Backup file: $(basename $BACKUP_FILE)"
echo ""
echo -e "${YELLOW}Don't forget to run migrations if needed:${NC}"
echo "  python manage.py migrate"
