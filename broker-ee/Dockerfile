# syntax=docker/dockerfile:1
FROM alpine:3.18 AS extension-getter

ENV MQTT_MESSAGE_LOG_EXTENSION_VERSION=1.1.3
ENV RETAINED_MESSAGE_QUERY_EXTENSION_VERSION=v1.2.4

RUN wget https://www.hivemq.com/releases/extensions/hivemq-mqtt-message-log-extension-$MQTT_MESSAGE_LOG_EXTENSION_VERSION.zip &&\
  unzip hivemq-mqtt-message-log-extension-$MQTT_MESSAGE_LOG_EXTENSION_VERSION.zip -d /extensions
RUN wget https://github.com/artcom/hivemq-retained-message-query-plugin/releases/download/$RETAINED_MESSAGE_QUERY_EXTENSION_VERSION/hivemq-retained-message-query-extension-$RETAINED_MESSAGE_QUERY_EXTENSION_VERSION.zip &&\
  unzip hivemq-retained-message-query-extension-$RETAINED_MESSAGE_QUERY_EXTENSION_VERSION.zip -d /extensions/hivemq-retained-message-query-extension

FROM hivemq/hivemq4:4.22.0

ENV LANG=C.UTF-8

COPY --from=extension-getter /extensions extensions

COPY conf conf
COPY extensions/hivemq-mqtt-message-log-extension/mqttMessageLog.properties extensions/hivemq-mqtt-message-log-extension/mqttMessageLog.properties

EXPOSE 1883
EXPOSE 8888
EXPOSE 8080
