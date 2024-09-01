ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Run
FROM base

ENV PORT=$PORT

COPY .output /src/.output

CMD [ "node", ".output/server/index.mjs" ]
