import * as Redis from "ioredis";
import GuardAgainstNullProperties from '../Guards/GuardAgainstNullProperties';

import CacheClientInterface from '../Interfaces/CacheClientInterface';

class RedisClient implements CacheClientInterface {
    private client;

    constructor(config: any) {
        (new GuardAgainstNullProperties()).guard(config, ['host', 'port', 'password']);

        const redis = new Redis({
            host: config.host,
            port: config.port,
            password: config.password,
            lazyConnect: true,
            db: 0
        });
        redis.on('error', function (error) {
            console.log(error)
        });

        this.client = redis;
    }

    exists(key: string): Promise<any> {
        return this.client.exists(key);
    }

    set(key: string, ttl: number, content: any): Promise<any> {
        return this.client.setex(key, ttl, content);
    }

    get(key: string): Promise<any> {
        return this.client.get(key);
    }

    flushall(): Promise<any> {
        return this.client.flushall();
    }

    delete(key: string): Promise<any> {
        return this.client.del(key);
    }
}

export default RedisClient;