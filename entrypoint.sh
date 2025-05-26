#!/bin/sh
set -e

pnpm run db:deploy

pnpm start --filter @habitus/api
