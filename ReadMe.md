# Get User Activity from Github

## Run Local
* `npm install`
* setup `.env` file for `CLIENT_SECRET` and `CLIENT_SECRET`
* Run `npm run start`
* Got to `localhost:80`

## Overview
* If logged out, redirects to login page (Sign in with Github)
* Make use of User token to list user activity

## Api EndPoints
* `localhost:80` -> Home page
* `localhost:80/auth/github` -> Login page
* `localhost/logout` -> Logout endpoint
* `localhost/activity` -> Return JSON of User Events.