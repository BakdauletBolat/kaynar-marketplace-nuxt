ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

COPY --link package.json yarn.lock .  # Copy yarn.lock instead of package-lock.json
RUN yarn install --frozen-lockfile  # Use yarn to install dependencies

COPY --link . .

RUN yarn build  # Use yarn to build the project
RUN yarn install --production --frozen-lockfile  # Prune unnecessary dependencies

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD ["node", ".output/server/index.mjs"]
