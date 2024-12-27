'use server'
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

/**
 * Create a new task for a user
 * @param {string} userId - The ID of the user
 * @param {Object} taskData - The task data (url, interval, webhookUrl)
 * @returns {Promise<Object>} - The created task
 */
export const createTask = async (userId, taskData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/${userId}/tasks`, taskData);
        return response.data; // Return the created task
    } catch (error) {
        console.error("Error creating task:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Fetch all tasks for a user
 * @param {string} userId - The ID of the user
 * @returns {Promise<Array>} - The list of tasks
 */
export const fetchTasks = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${encodeURIComponent(userId)}/tasks`);
        return response.data.tasks; // Return the list of tasks
    } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Update a task for a user
 * @param {string} userId - The ID of the user
 * @param {string} taskId - The ID of the task to update
 * @param {Object} updates - The updated task data (url, interval, etc.)
 * @returns {Promise<Object>} - The updated task
 */
export const updateTask = async (userId, taskId, updates) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${encodeURIComponent(userId)}/tasks/${taskId}`, updates);
        return response.data.task; // Return the updated task
    } catch (error) {
        console.error("Error updating task:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Delete a task for a user
 * @param {string} userId - The ID of the user
 * @param {string} taskId - The ID of the task to delete
 * @returns {Promise<Object>} - The response message
 */
export const deleteTask = async (userId, taskId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/${userId}/tasks/${taskId}`);
        return response.data; // Return the success message
    } catch (error) {
        console.error("Error deleting task:", error.response?.data || error.message);
        throw error;
    }
};
