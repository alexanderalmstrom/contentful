# Contentful

React + Contentful

## Install

Install npm dependencies.

```
yarn install
```

## Development

Run webpack dev server.

```
yarn run start
```

## Build

Create a `build` directory with bundled assets.

```
yarn run build
```

## Server

A static node express server for production.

```
yarn run server
```

## Deploy to Heroku

heroku-cli is required.

Create new app

```
heroku create your-app-name
```

or add existing app to remote

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

Install netlify-cli

```
npm install netlify-cli -g
```

Deploy app

```
netlify deploy
```