interface CacheServiceInterface {
    exists: (key: string) => Promise<number>;
    set: (key: string, ttl: number, content: any) => Promise<any>;
    get: (key: string) => Promise<any>;
    flushall: () => Promise<any>;
    delete: (key: string) => Promise<any>;
    retrieve: (key: string, ttl: number, promise: Promise<any>) => Promise<any>;
}

export default CacheServiceInterface;