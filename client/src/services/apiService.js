// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL; // 替换为你的 API 基础 URL

export const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('There was an error making the POST request:', error);
    throw error;
  }
};

export const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('There was an error making the GET request:', error);
    throw error;
  }
};