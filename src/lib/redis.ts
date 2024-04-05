import { Redis } from "ioredis";

export const redis = new Redis(parseInt(process.env.REDIS_PORT as string),
  process.env.REDIS_HOST as string,
  {
  password: process.env.REDIS_PASSWORD as string,
});
