# Legco FC Initial Replies Website

This website is built with [React](https://reactjs.org/) and [Webpack](https://webpack.js.org/)

## Setup Environment

1. Install [Node.js](https://nodejs.org) and [yarn](https://yarnpkg.org)
2. Fork this repo
3. Clone your repo
4. Install packages with yarn
```bash
yarn install
```

## Config
This application is config via environment parameter

| Name | Usage | Default Value | Validate Value |
|------|-------|---------------|----------------|
| NODE_ENV | Mode of application | `'dev'` | `'production'` or `'dev'` |
| PORT | Port Number of server | `3000` | Any integer |
| ENDPOINT | Web API endpoint | 'https://api.g0vhk.io' | Any string |

## Start Development
**You have to run `yarn dev:setup` for the very first time you start the development server**

```bash
yarn dev
```

A server will be start running at [http://localhost:3000](http://localhost:3000).
Hot reloading would be enable in server.

The server is running with nodemon, you may refer to the document of [nodemon](https://nodemon.io/)

## Production

```bash
yarn build
export NODE_ENV=production
yarn start
```
A production server will be started at [http://localhost:3000](http://localhost:3000)
