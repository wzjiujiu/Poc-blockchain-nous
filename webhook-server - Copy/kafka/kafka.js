const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "edc-webhook",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function initKafka() {
  await producer.connect();
  console.log("🔌 Kafka Producer connesso");
}

async function publish(topic, message) {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
  console.log(`📤 Evento pubblicato su Kafka topic=${topic}:`, message.type);
}

module.exports = { initKafka, publish };