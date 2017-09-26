import CacheSystemInterface from '../Interfaces/CacheSystemInterface';

declare var Promise: any;

class CacheSystemService implements CacheSystemInterface{
    private cacheSystem: any;

    constructor(cacheFactory: any) {
        this.cacheSystem = cacheFactory;
    }

    exists(): Promise<any> {
        return new Promise((fulfill: any) => {
            fulfill();
        });
    }

    set(): Promise<any> {
        return new Promise((fulfill: any) => {
            fulfill();
        });
    }

    get(): Promise<any> {
        return new Promise((fulfill: any) => {
            fulfill();
        });
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