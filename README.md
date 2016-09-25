# The Foodbook

## Requirements
* Docker
    * https://www.docker.com/
* sequelize/cli
    * `npm install -g sequelize-cli`


## Install
```sh
git clone <this repo>
cd <this repo>
npm i

# create container and start mysql and redis
npm run docker
```


## development
```sh
# migrate tables
npm run db:init

# run dev server (watch mode)
npm run development
```


## production 
```sh
# migrate tables (NODE_ENV is option. If not specified, use development config)
NODE_ENV=production npm run db:init

# NODE_ENV=production build client and server with webpack
npm run build

# start node.js server
npm start
```


## .env file settings

You have to set the value for these keys

```sh
GMAP_API_KEY=<google maps api key>

# API server's url
API_BASE_URL=localhost

# webpack dev-server's url
DEV_SERVER_URL=localhost
```
