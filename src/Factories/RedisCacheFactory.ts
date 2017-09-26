import * as Redis from "ioredis";
import GuardAgainstNullProperties from '../Guards/GuardAgainstNullProperties';

export default class RedisCacheFactory {
    create(config: any): any {
        (new GuardAgainstNullProperties(['host', 'port', 'password'], config)).guard();

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

        return redis;
    }
}