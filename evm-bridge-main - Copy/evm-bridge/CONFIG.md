# Configuration reference

In order to configure the backend, you must use environment variables.

In order to set the environment variables in a file, copy `.env.example` into `.env` and set any value in that file.

```sh
cp .env.example .env
```

## General configuration

| Variable             | Description                                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`           | Set it to `production` when the server is running on production.                                                                   |
| `RUN_TASKS`          | Can be `YES` or `NO`. Set it to `YES` to enable periodic tasks. This should be set only for a single server                        |
| `EXTERNAL_URI`       | External URL for users to access the backend. Example: `http://localhost`                                                          |
| `ALLOWED_ORIGINS`    | List of origins allowed to make CORS requests. Make sure to allow both the backend and the frontend URLs.                          |
| `WORKERS_NUMBER`     | Number of worker processes to spawn. Set it to 0 to use the number of CPUs                                                         |
| `SERVE_SWAGGER_DOCS` | Can be `YES` or `NO`. Set it to `YES` to serve the swagger documentation at `/api-docs`. Set it to `NO` to hide the documentation. |

## API authorization

The API uses the SIMPL authentication system. All API calls require a `Bearer` token, being a JSON Wwb token signed by the IDP private key. It will be verified using its corresponding public keys.

| Variable                  | Description                                                                    |
| ------------------------- | ------------------------------------------------------------------------------ |
| `SIMPL_JWK_SET_TYPE`      | Type of public key set. Can be `REMOTE` or `LOCAL`.                            |
| `SIMPL_JWK_SET_FILE_PATH` | In case of `LOCAL`, set it to the path where the JWK set JSON file is located. |
| `SIMPL_JWK_SET_URL`       | In case of `REMOTE`, set it to the URL where the JWK set can be pulled from.   |
| `SIMPL_ISSUER`            | The required value to be set in the `iss` claim of the JWT.                    |
| `SIMPL_AUDIENCE`          | The required value to be set in the `aud` claim of the JWT.                    |

## Logs configuration

| Variable       | Description                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| `LOG_REQUESTS` | Can be `YES` or `NO`. Set it to `YES` to enable request logging.                |
| `LOG_INFO`     | Can be `YES` or `NO`. Set it to `YES` to enable logging informational messages. |
| `LOG_DEBUG`    | Can be `YES` or `NO`. Set it to `YES` to enable logging debugging messages.     |
| `LOG_TRACE`    | Can be `YES` or `NO`. Set it to `YES` to enable logging trace messages.         |

## Server configuration

### HTTP

| Variable              | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `SERVER_HTTP_PORT`    | Port for HTTP. By default `80`.                                   |
| `SERVER_HTTP_ADDRESS` | Bind address. If not set, it will bind to all network interfaces. |

### HTTPS

| Variable                   | Description                                                                  |
| -------------------------- | ---------------------------------------------------------------------------- |
| `SERVER_HTTPS_PORT`        | Port for HTTPS. By default `443`.                                            |
| `SERVER_HTTPS_ADDRESS`     | Bind address. If not set, it will bind to all network interfaces.            |
| `SERVER_HTTPS_CERTIFICATE` | Path to the certificate file. It must be in PEM format.                      |
| `SERVER_HTTPS_KEY`         | Path to the private key file. It must be in PEM format.                      |
| `SERVER_REDIRECT_SECURE`   | Can be `YES` or `NO`. Set it to `YES` to redirect all HTTP traffic to HTTPS. |

### Let's Encrypt / Certbot configuration

In order for the application to use dynamic certificates generated with the `certbot` utility, set `SERVE_ACME_CHALLENGE=YES` in order for the backend to serve the challenge to Let's Encrypt. Also make sure:

- You have a public IP and domain name
- You have the backend HTTP listening on port `80`

| Variable               | Description                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `SERVE_ACME_CHALLENGE` | Can be `YES` or `NO`. Set it to `YES` to serve ACME challenge results from `certbot` |
| `ACME_CHALLENGE_PATH`  | Set to the path where certbot stores the challenge results.                          |

### Other server configuration parameters

| Variable               | Description                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `USING_PROXY`          | Can be `YES` or `NO`. Set it to `YES` if you are using a reverse proxy or a load balancer |
| `MAX_UPLOAD_FILE_SIZE` | Max size of any uploaded file, in bytes.                                                  |

## Database configuration

Depending on the database you want to use, you can set `DB_TYPE` to `MONGO`, `MySQL` or `Postgres`.

### MongoDB

Set `DB_TYPE=MONGO` to use MongoDB.

| Variable       | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| `DB_MONGO_URL` | MongoDB connection URL. Example: `mongodb://127.0.0.1:27017/database_name` |

### MySQL

Set `DB_TYPE=MySQL` to use MySQL.

| Variable             | Description                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `DB_HOST`            | Database host or IP address.                                                                           |
| `DB_PORT`            | Database port number.                                                                                  |
| `DB_USER`            | Database authentication username.                                                                      |
| `DB_PASSWORD`        | Database authentication password.                                                                      |
| `DB_NAME`            | Database name.                                                                                         |
| `DB_MAX_CONNECTIONS` | Max size of the database connections pool.                                                             |
| `DB_TRACE`           | Can be `YES` or `NO`. Set it to `YES` to log debug messages with all the queries sent to the database. |

## PostgreSQL

Set `DB_TYPE=Postgres` to use PostgreSQL.

| Variable             | Description                                |
| -------------------- | ------------------------------------------ |
| `DB_HOST`            | Database host or IP address.               |
| `DB_PORT`            | Database port number.                      |
| `DB_USER`            | Database authentication username.          |
| `DB_PASSWORD`        | Database authentication password.          |
| `DB_NAME`            | Database name.                             |
| `DB_MAX_CONNECTIONS` | Max size of the database connections pool. |

## File storage configuration

Depending on the file storage system you want to use, you may set the `FILE_STORAGE_MODE` to the appropriate value.

### File system storage

Set `FILE_STORAGE_MODE=FS` to store files in a local, remote or shared file system.

| Variable                      | Description                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `FILE_STORAGE_FS_PATH`        | Path of the folder to store the files.                                                            |
| `FILE_STORAGE_PRIVATE_SECRET` | Secret to generate authentication tokens to access private files.                                 |
| `FILE_STORAGE_SERVER_URL`     | Base URL of the static files serving system. Use the backend with the `/static/` path by default. |

## Blockchain configuration

### Ethereum node

| Variable                   | Description                                                    |
| -------------------------- | -------------------------------------------------------------- |
| `BLOCKCHAIN_NODE_PROTOCOL` | Protocol to use to connect to the node. Can be `http` or `ws`. |
| `BLOCKCHAIN_NODE_RPC_URL`  | JSON-RPC connection URL. Example: `http://localhost:8545`      |

### Event synchronization

The event synchronization system is meant to scan the blockchain, find events and index them in the database.

Make sure to enable it only for a single server, if you have multiple, to prevent collisions.

| Variable                      | Description                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| `BLOCKCHAIN_SYNC`             | Can be `YES` or `NO`. Set it to `YES` to enable event synchronization.                |
| `BLOCKCHAIN_SYNC_FIRST_BLOCK` | First block to synchronize. Normally set to 0. Use it to skip blocks for long chains. |
| `BLOCKCHAIN_SYNC_RANGE`       | Max number of blocks to synchronize in a single step.                                 |
| `BLOCKCHAIN_SYNC_TIME`        | Expected block time in milliseconds in order to wait for more blocks.                 |

If you want to reset the synchronized event data, run the following command:

```sh
npm run reset-blockchain-sync
```

## Tests

| Variable            | Description                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `TEST_DB_MONGO_URL` | MongoDB connection URL used for API tests. Make sure is different from the main database. |
