ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

# Copy both package.json and yarn.lock
COPY --link package.json yarn.lock .

# Install dependencies with Yarn
RUN yarn install --frozen-lockfile

COPY --link . .

# Build the project
RUN yarn build

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Run
FROM base

ENV PORT=$PORT

# Copy the built output from the build stage
COPY --from=build /src/.output /src/.output

# Optional: Copy the node_modules if unbundled dependencies are needed
# COPY --from=build /src/node_modules /src/node_modules

CMD ["node", ".output/server/index.mjs"]
