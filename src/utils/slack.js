const axios = require("axios");

export async function sendToSlack(item, webhookUrl) {
  const message = {
    text: `New item found: ${item.title}\n${item.link}`,
  };

  try {
    await axios.post(webhookUrl, message);
    console.log("Notification sent to Slack.");
  } catch (error) {
    console.error("Error sending notification to Slack:", error);
  }
}
