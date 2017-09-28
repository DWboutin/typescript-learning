export default interface CacheSystemInterface {
    exists: (key: string) => Promise<number>;
    set: (key: string, ttl: number, content: any) => Promise<any>;
    get: (key: string) => Promise<any>;
    flushall: () => Promise<any>;
    delete: (key: string) => Promise<any>;
}