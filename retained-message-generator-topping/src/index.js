const crypto = require("crypto")
const express = require("express")
const http = require("http")
const { connect } = require("@artcom/mqtt-topping")
const brokerUri = process.env.BROKER_URI || "mqtt://broker:1883"
const port = process.env.PORT || 3000

async function main() {
  const toppingClient = connect(brokerUri)
  const app = express()
  const server = http.createServer(app)

  server.listen(port, async () => {
    console.log(`Server running on port ${port}`)
  })

  app.use(express.json({ limit: "50mb" }))

  app.post("/publish", async (req, res) => {
    await Promise.all(
      generateRetainedMessages(req.body.number).map(
        (message) => toppingClient.publish(message.topic, message.payload),
        { qos: Number(req.body.qos) || 2 },
      ),
    )
    res.status(200).json({ success: "true" })
  })
}

function generateRetainedMessages(number) {
  const messages = []
  for (let i = 0; i < number; i++) {
    const subTopic = []
    const topicDepth = Math.floor(Math.random() * 10)
    for (let j = 0; j < topicDepth; j++) {
      subTopic.push(`/${crypto.randomBytes(20).toString("hex")}`)
    }
    messages.push({
      topic: `topic/${i}${subTopic.join("")}`,
      payload: JSON.stringify({
        time: new Date().toISOString(),
        value: crypto.randomBytes(1000).toString("hex"),
      }),
    })
  }
  return messages
}

main()
