#!/bin/sh
set -e

pnpm run db:migrate

pnpm start --filter @habitus/api
