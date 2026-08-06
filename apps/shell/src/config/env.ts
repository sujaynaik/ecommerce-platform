console.log("API", __ENV__.API_BASE_URL);
console.log("APP", __ENV__.APP_NAME);

export const ENV = {
  API_BASE_URL: __ENV__.API_BASE_URL,
  APP_NAME: __ENV__.APP_NAME,
} as const;
