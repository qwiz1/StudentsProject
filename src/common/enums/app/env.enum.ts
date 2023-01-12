import { config } from 'dotenv';
import { AppEnvironment } from './app-environment.enum';

config();

const { 
  NODE_ENV, 
  PORT, 
  REDIS_URL, 
  SECRET_KEY 
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: <AppEnvironment>NODE_ENV,
    SERVER_PORT: PORT,
  },
  REDIS: {
    URL: REDIS_URL,
  },
  API: '/api/',
  JWT: {
    SECRET: SECRET_KEY,
  },
};

export { ENV };
