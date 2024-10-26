import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "messages-app",
  brokers: ["localhost:9092"], // Kafka broker from Docker
});

export default kafka;
