import axios from 'axios';

export const request = axios.create({
  baseURL: process.env.API_URL,
  timeout: 300000, // 5 minutes
});
