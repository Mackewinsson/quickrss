"use server";

import { createTask as createTaskService } from "../../../services/tasks/tasks";
import getUser from "../getUser";

export default async function createTask(formData) {
  const taskUrl = formData.get("taskUrl");
  const webhookUrl = formData.get("slackWebhookUrl");
  const user = await getUser();
  try {
    // Use the createTask service to make the API call
    const taskData = {
      url: taskUrl,
      interval: 15, // Default interval, can be customized
      webhookUrl,
    };

    const response = await createTaskService(user._id, taskData);

    console.log("Task created successfully:", response);
    return response;
  } catch (error) {
    console.error("Error creating task:", error.response?.data || error.message);
  }
}
