FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile --filter @habitus/api...

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3001

CMD ["pnpm", "--filter", "@habitus/api", "start"]

