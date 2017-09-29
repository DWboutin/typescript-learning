import CacheSystemInterface from '../Interfaces/CacheSystemInterface';

declare var Promise: any;

class CacheSystemService implements CacheSystemInterface{
    private cacheSystem: any;

    constructor(cacheFactory: any) {
        this.cacheSystem = cacheFactory;
    }

    exists(key: string): Promise<any> {
        return this.cacheSystem.exists(key);
    }

    set(key: string, ttl: number, content: any): Promise<any> {
        return this.cacheSystem.setex(key, ttl, content);
    }

    get(key: string): Promise<any> {
        return this.cacheSystem.get(key);
    }

    flushall(): Promise<any> {
        return this.cacheSystem.flushall();
    }

    delete(key: string): Promise<any> {
        return this.cacheSystem.del(key);
    }

    retrieve(key: string, promise: any): Promise<any> {
        return this.exists(key).then((res) => {
            if (res === 1) {
                return this.get(key);
            }

            return promise();
        });
    }
}

export default CacheSystemService;