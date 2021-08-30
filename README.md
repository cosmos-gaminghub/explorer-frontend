# GAME Explorer Frontend

**Prerequisites**
* nodev14.0+

## Build Setup

```bash
# install dependencies
$ yarn install

# set environment variables
$ cp .envex .env

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### setup with web server
- nginx(example)

```conf
server {
        listen 80;
        listen [::]:80;
        root /var/www/explorer-frontend/dist;
        index index.html;
        server_name game-explorer.io;
        location / {
                try_files $uri $uri/ /index.html;
        }
}

server {
        listen 80;
        listen [::]:80;
        server_name api.game-explorer.io;
        location / {
                proxy_pass    http://localhost:8080;
        }
}
```

### reference
- [explorer-backend](https://github.com/cosmos-gaminghub/explorer-backend) exports node data and insert into mongoDB as collections.
- [explorer-graphql](https://github.com/cosmos-gaminghub/explorer-graphql) responses API data to the frontend.
