# SmartCondo

Smart device management system for condos.

## Running a local dev environment

All of the following instructions assume you are in the repo root directory.

### 1. Install Node.js modules

```console
yarn
```

### 2. Run PostgreSQL locally

The app requires a database to store the data for the REST API.
You can run a PostgreSQL instance on your local development system if you have Docker installed.

To run a PostgreSQL instance using Docker:

```console
yarn run pg-start
```

To later stop the PostgreSQL instance:

> **WARNING**: All data stored in the local instance will be deleted when the container is stopped.

```console
yarn run pg-stop
```

### 3. Start the app (watch mode)

```console
yarn run start:dev
```

> **NOTE**: By default, the app listens on port 3000. To use a different port, set the `PORT` environment variable to the desired port number.

On a different console:

```console
yarn run angular:dev
```

### 4. Connect to your app

Use a web browser to connect to [http://localhost:3000](http://localhost:3000)

## Running in production

### 1. Set DATABASE_URL

The app uses the environment variable `DATABASE_URL` to connect to your PostgreSQL instance.
Ensure that `DATABASE_URL` is set to the URL for your PostgreSQL instance.

### 2. Build

```console
yarn run build
```

### 3. Run

```console
yarn run start
```

## Testing

```console
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

## Evolving

### Database migrations

To generate a new migration from existing entities:

```console
yarn run migration:generate migrations/MigrationName
```

To run migrations:

```console
yarn run migration:run
```

## Running in production (Dokku)

```
dokku run <app-name> yarn run migration:run
```

## Using the app

## Authentication

Access `/api/auth/google` to authenticate with Google.

Copy the cookies from the response headers and use them in your requests to the API.

## Endpoints

### `GET /condos` - Get all condos


### `POST /condos` - Create a new condo

Body:

```json
{
	"name": "Plaza Hotel",
	"address": "Drury Lane, 99",
	"slug": "plaza-hotel"
}
```

### `GET /condos/:condo/devices/:device` - Get info for a device

### `POST /condos/:condo/devices` - Create a device

Body:

```json
{
	"identifier": "manufacturer-id",
	"name": "Main Gate",
	"slug": "gate"
}
```

### `GET /condos/:condo/access-keys` - Get all access keys for a condo

### `POST /condos/:condo/access-keys` - Create an access key

Body (all fields are optional):

```json
{
		"description": "Visitor key",
		"validFrom": "2024-01-01T00:00:00.000Z",
		"validTo": "2024-12-31T00:00:00.000Z",
}
```

## Troubleshooting

When trying to open a device, it says "access token expired". Restart the app and try again. (in Dokku: `dokku ps:restart smartcondo`)