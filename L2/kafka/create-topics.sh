#!/bin/bash
set -e

echo "🚀 Starting Kafka..."
/etc/confluent/docker/run &

pid=$!

# Aspetta che Kafka sia pronto
echo "⏳ Waiting for Kafka to start..."
while ! nc -z localhost 9092; do
  sleep 1
done

echo "📌 Creating Kafka topics..."
TOPICS=(edc.addasset edc.modifyasset edc.addpolicy edc.modifypolicy edc.adddataoffer edc.modifydataoffer edc.addcontract edc.terminatecontract edc.transfer)

for t in "${TOPICS[@]}"; do
  /usr/bin/kafka-topics --create --if-not-exists \
    --bootstrap-server localhost:9092 \
    --topic "$t" \
    --partitions 3 \
    --replication-factor 1
done

echo "✅ Topics ready. Kafka is running."
wait $pid
