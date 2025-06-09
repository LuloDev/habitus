FROM oven/bun:1.1.45-slim as base
WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install

FROM base as build
WORKDIR /usr/src/app

COPY . .

RUN bun --bun run build

FROM oven/bun:1.1.45-slim as production
WORKDIR /usr/src/app

COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/src/lib/infrastructure/db/migrate.ts ./src/lib/infrastructure/db/migrate.ts
COPY --from=build /usr/src/app/src/lib/infrastructure/db/migrations ./src/lib/infrastructure/db/migrations

COPY package.json .

COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/entrypoint.sh .
RUN chmod +x ./entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["bun", "--bun", "run", "build" ]
