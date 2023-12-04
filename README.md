# Retained Message Query Plugin Test

Docker compose file for testing the Retained Message Query Plugin with HiveMQ CE and HiveMQ Enterprise.

## Usage

### HiveMQ CE

```bash
docker-compose -f docker-compose-ce.yml up
```

### HiveMQ Enterprise

```bash
docker-compose -f docker-compose-enterprise.yml up
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

## Results

| HiveMQ edition    | mqtt client | network  | message retained in query plugin | number of messages sent |
| ----------------- | ----------- | -------- | -------------------------------- | ----------------------- |
| HiveMQ CE         | mqttjs      | docker   | sometimes                        | 1                       |
| HiveMQ CE         | topping     | docker   | no                               | 1                       |
| HiveMQ CE         | mosquitto   | external | yes                              | 1                       |
| HiveMQ CE         | topping     | external | yes                              | 1                       |
| HiveMQ Enterprise | mqttjs      | docker   | yes                              | 1                       |
| HiveMQ Enterprise | topping     | docker   | yes                              | 1                       |
| HiveMQ Enterprise | mosquitto   | docker   | yes                              | 1                       |
