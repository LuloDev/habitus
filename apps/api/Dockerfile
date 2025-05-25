FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./

RUN pnpm install --frozen-lockfile --filter @habitus/api...

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3001
CMD ["pnpm", "--filter", "@habitus/api", "start"]
