FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .
COPY entrypoint.sh /usr/local/bin/

RUN pnpm install --frozen-lockfile
RUN pnpm run db:generate

FROM node:22-alpine
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app /app

RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
