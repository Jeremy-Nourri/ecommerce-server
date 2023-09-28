declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    EXPIRES_IN_JWT_SECRET: string;
    EXPIRES_IN_JWT_REFRESH_SECRET: string;
  }
}
