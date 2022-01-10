# simple-express-crud

## How To:

### Running with Docker Compose

Just run:

```bash
docker-compose up -d
```

The published port of api will be available on port `4000`.

### Running without Docker Compose

#### Prepare Docker Network & Volume

Create a docker volume:

```bash
docker volume create <your_volume_name>
```

Create a docker network:

```bash
docker network create <your_network_name>
```

#### Prepare Mongo DB using Docker

Pull mongodb 4.4 image:
```bash
docker pull mongo:4.4
```

Run mongodb container:

```bash
docker run -d -e MONGO_INITDB_ROOT_USERNAME=<your_user> -e MONGO_INITDB_ROOT_PASSWORD=<your_password> --name <your_mongo_container_name> --volume <your_volume_name>:/data/db --network <your_network_name> mongo:4.4
```

Run `docker ps` to make sure your mongodb container is already run


#### Prepare Application

1. Clone this repository
2. Setup env variables:
    1. Copy env.sample into .env file
    2. Change all env values on `.env` file
    3. Specify value of `MONGO_URL` with format: `mongodb://<your_user>:<your_password>@<your_mongo_container_name>:27017`
3. Create a Dockerfile
4. Build image from that Dockerfile
5. Run container from your image
   ```bash
   docker run -d -p <PUBLISH_PORT>:<EXPOSED_PORT> --env-file ./.env --network <your_network_name> <IMAGE_NAME>
   ```
6. Access `GET /`
7. Access `GET /users`
8. Create a user from `POST /users` with body:
   ```json
   {
      "name": <name>,
      "age": <age>
   }
   ```
