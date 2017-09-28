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
        return new Promise((fulfill: any) => {
            fulfill();
        });
    }

    delete(): Promise<any> {
        return new Promise((fulfill: any) => {
            fulfill();
        });
    }

}

export default CacheSystemService;