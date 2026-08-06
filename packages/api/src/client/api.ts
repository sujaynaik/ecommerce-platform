import axios from "axios";

let apiBaseUrl = "";

export function configureApi(baseURL: string) {
    apiBaseUrl = baseURL;
    api.defaults.baseURL = baseURL;
}

export const api = axios.create();

// export const apiClient = axios.create({
//   baseURL: API_CONFIG.BASE_URL,
//   timeout: API_CONFIG.TIMEOUT,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });