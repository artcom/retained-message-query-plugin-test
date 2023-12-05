# Retained Message Query Plugin Test

Docker compose file for testing the Retained Message Query Plugin with HiveMQ CE and HiveMQ Enterprise.

## Usage

### HiveMQ Community Edition

```bash
docker-compose -f docker-compose-ce.yml up
```

### HiveMQ Enterprise Edition

```bash
docker-compose -f docker-compose-ee.yml up
```

### All

- check plugin
  ```bash
  curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"topic":"topic","depth":2}' \
  http://localhost:8080/query
  ```
- send a message to the broker through the docker network
  ```bash
  curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"number":1}' \
  http://localhost:3001/publish
  ```
- check plugin
  ```bash
  curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"topic":"topic","depth":2}' \
  http://localhost:8080/query
  ```

## Retained Message Generator API

### Publish a message

- Endpoint: `POST /publish`
- Body:
  ```json
  {
    "number": "number of messages to publish, required (Integer)",
    "qos": "quality of service, optional, default=2 (Integer)",
    "retain": "retain flag, optional, default=true (Boolean)"
  }
  ```

## Logs

The retained message query plugin logs all retained messages received when `HIVEMQ_LOG_LEVEL=DEBUG` is set.
