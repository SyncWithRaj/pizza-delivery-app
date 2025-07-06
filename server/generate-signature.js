import crypto from "crypto";

const order_id = "order_QpjlWUO74WHYvv"; // Replace with actual
const payment_id = "pay_NZbqf1o0TbzVpF";  // Replace with actual
const secret = "DunaYRO92NDsRemapvyFdmpL"; // from .env

const body = `${order_id}|${payment_id}`;
const signature = crypto
  .createHmac("sha256", secret)
  .update(body)
  .digest("hex");

console.log("Simulated signature:", signature);
