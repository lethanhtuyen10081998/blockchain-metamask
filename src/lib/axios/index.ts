import axios, { type AxiosInstance } from "axios";

let client: AxiosInstance;

export const getApiClient = () => {
  if (!client) {
    client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 40000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    client.interceptors.request.use(
      (config) => {
        try {
          let token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];
          if (token) {
            token = decodeURIComponent(token).replaceAll('"', "");
          }
          config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          console.error(error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          console.error(
            `API Error: ${error.response.status} - ${error.response.data.message}`
          );
        }
        return Promise.reject(error);
      }
    );
  }
  return client;
};

export const apiClient = getApiClient();
