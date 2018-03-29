FROM node:8-alpine

ENV PORT 3000
EXPOSE 3000

WORKDIR /app
COPY . /app

RUN yarn install --pure-lockfile && \
    yarn build && \
    yarn install --production --pure-lockfile

ENV NODE_ENV production
