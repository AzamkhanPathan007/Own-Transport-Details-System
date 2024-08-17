import { REDIS_URL } from 'env-config';
import { createClient, RedisClientType, RedisDefaultModules } from 'redis';

export class RedisConnector {
  private readonly redisClient: RedisClientType<RedisDefaultModules>;
  private static instance: RedisConnector;

  constructor() {
    this.redisClient = createClient({ url: REDIS_URL });
  }

  public static getInstance(): RedisConnector {
    if (!RedisConnector.instance) {
      RedisConnector.instance = new RedisConnector();
    }
    return RedisConnector.instance;
  }
  async connect() {
    const redis = await this.redisClient.connect();

    redis.on('connect', () => {
      console.log(`Redis Connected on ${REDIS_URL}`);
    });

    return redis;
  }

  get client() {
    return this.redisClient;
  }
}
