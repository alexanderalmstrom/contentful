# Contentful

Demo setup with React, Contentful and Webpack.

## Install

Install required npm dependencies.

```
yarn install
```

## Development

Runs webpack serve and a local development server.

```
yarn run start
```

## Build

Builds a `build` directory with bundled files.

```
yarn run build
```

## Server

A simple node server for testing production.

```
yarn run server
```

## Deploy to Heroku

Requires a Heroku application and heroku-cli.

Create new app

```
heroku create your-app-name
```

Add existing app to remote

```
heroku git:remote -a your-app-name
```

Deploy app

```
yarn run deploy
```

Open app in browser

```
heroku open
```

## Deploy to Netlify

```
npm install netlify-cli -g
```

```
netlify deploy
```