export default interface CacheSystemInterface {
    exists: () => Promise<any>;
    set: () => Promise<any>;
    get: () => Promise<any>;
    flushall: () => Promise<any>;
    delete: () => Promise<any>;
}