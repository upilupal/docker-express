import * as redis from "redis";

export const redisClient = redis.createClient({
    url: "redis://host.docker.internal:6379"
})