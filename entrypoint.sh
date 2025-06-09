#!/bin/sh

set -e

echo "Migrating database..."
bun --bun run migrate

echo "Migration complete!"
echo "Starting server..."
exec "$@"
