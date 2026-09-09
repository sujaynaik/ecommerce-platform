declare namespace NodeJS {
  interface ProcessEnv {
    API_BASE_URL: string;
    APP_NAME: string;
  }
}

declare const __ENV__: {
  API_BASE_URL: string;
  APP_NAME: string;
};

declare module "*.css";

declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
