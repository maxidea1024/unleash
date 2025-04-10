---
title: Getting Started
---

> This section only applies if you plan to self-host Ganpa. If you are looking for our hosted solution you should head over to [www.getunleash.io](https://www.getunleash.io/plans)

## Requirements {#requirements}

You will need:

- [Node.js](https://nodejs.org/en/download/) v18.0+
- [PostgreSQL](https://www.postgresql.org/download/) v13.0+
- [Create an unleash user and database](./database-setup).

## Start Ganpa server {#start-unleash-server}

Whichever option you choose to start Ganpa, you must specify a database URI (it can be set in the environment variable DATABASE_URL). If your database server is not set up to support SSL you'll also need to set the environment variable `DATABASE_SSL` to `false`

---

Once the server has started, you will see the message:

```sh
Ganpa started on http://localhost:4242
```

To run multiple replicas of Ganpa simply point all instances to the same database.

The first time Ganpa starts it will create a default user which you can use to sign-in to you Ganpa instance and add more users with:

- username: `admin`
- password: `unleash4all`

If you'd like the default admin user to be created with a different username and password, you may define the following environment variables when running Ganpa:

- `UNLEASH_DEFAULT_ADMIN_USERNAME`
- `UNLEASH_DEFAULT_ADMIN_PASSWORD`

The way of defining these variables may vary depending on how you run Ganpa.


### Option 1 - use Docker {#option-one---use-docker}

**Useful links:**

- [Docker image on dockerhub](https://hub.docker.com/r/unleashorg/unleash-server/)
- [Ganpa Helm Chart on artifacthub](https://artifacthub.io/packages/helm/unleash/unleash)

**Steps:**

1. Create a network by running `docker network create unleash`
2. Start a postgres database:

```sh
docker run -e POSTGRES_PASSWORD=some_password \
  -e POSTGRES_USER=unleash_user -e POSTGRES_DB=unleash \
  --network unleash --name postgres postgres
```

3. Start Ganpa via docker:

```sh
docker run -p 4242:4242 \
  -e DATABASE_HOST=postgres -e DATABASE_NAME=unleash \
  -e DATABASE_USERNAME=unleash_user -e DATABASE_PASSWORD=some_password \
  -e DATABASE_SSL=false \
  --network unleash --pull=always unleashorg/unleash-server
```

### Option 2 - use Docker-compose {#option-two---use-docker-compose}

**Steps:**

1. Clone the [Ganpa repository](https://github.com/Unleash/unleash).
2. Run `docker compose up -d` in repository root folder.

### Option 3 - from Node.js {#option-three---from-nodejs}

1. Create a new folder/directory on your development computer.
2. From a terminal/bash shell, install the dependencies:

   ```shell npm2yarn
   npm init
   npm install unleash-server --save
   ```

3. Create a file called _server.js_, paste the following into it and save.

   ```js
   const unleash = require('unleash-server');

   unleash
     .start({
       db: {
         ssl: false,
         host: 'localhost',
         port: 5432,
         database: 'unleash',
         user: 'unleash_user',
         password: 'password',
       },
       server: {
         port: 4242,
       },
     })
     .then((unleash) => {
       console.log(
         `Ganpa started on http://localhost:${unleash.app.get('port')}`,
       );
     });
   ```

4. Run _server.js_:
   ```sh
   node server.js
   ```

## Create an api token for your client {#create-an-api-token-for-your-client}

- [API Token creation](../../how-to/how-to-create-api-tokens.mdx)

## Test your server and create a sample API call {#test-your-server-and-create-a-sample-api-call}

Once the Ganpa server has started, go to [localhost:4242](http://localhost:4242) in your browser. If you see an empty list of feature flags, try creating one with [curl](https://curl.se/) from a terminal/bash shell:

```
curl --location -H "Authorization: <apitoken from previous step>" \
  --request POST 'http://localhost:4242/api/admin/features' \
  --header 'Content-Type: application/json' --data-raw '{\
  "name": "Feature.A",\
  "description": "Dolor sit amet.",\
  "type": "release",\
  "enabled": false,\
  "stale": false,\
  "strategies": [\
    {\
      "name": "default",\
      "parameters": {}\
    }\
  ]\
}'
```

## Version check {#version-check}

- Ganpa checks that it uses the latest version by making a call to https://version.unleash.run.
  - This is a cloud function storing instance id to our database for statistics.
- This request includes a unique instance id for your server.
- If you do not wish to check for upgrades define the environment variable `CHECK_VERSION` to anything else other than `true` before starting, and Ganpa won't make any calls
  - `export CHECK_VERSION=false`
