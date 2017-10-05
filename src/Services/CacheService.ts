declare var Promise: any;

import CacheServiceInterface from '../Interfaces/CacheServiceInterface';
import CacheClientInterface from '../Interfaces/CacheClientInterface';
import TransformerInterface from '../Interfaces/TransformerInterface';

class CacheService implements CacheServiceInterface {
    private client: CacheClientInterface;
    private preProcessors;
    private postProcessors;

    constructor(client: CacheClientInterface, preProcessors?: Array<TransformerInterface>, postProcessors?: Array<TransformerInterface>) {
        this.client = client;
        this.preProcessors = preProcessors;
        this.postProcessors = postProcessors;
    }

    exists(key: string): Promise<any> {
        return this.client.exists(key);
    }

    set(key: string, ttl: number, content: any): Promise<any> {
        let value = content;

        if (typeof this.preProcessors !== 'undefined') {
            this.preProcessors.forEach((preProcessor: TransformerInterface) => {
                value = preProcessor.transform(value);
            });
        }

        return this.client.set(key, ttl, value);
    }

    get(key: string): Promise<any> {
        return this.client.get(key).then((res) => {
            let value = res;

            if (typeof this.preProcessors !== 'undefined') {
                this.postProcessors.forEach((postProcessor: TransformerInterface) => {
                    value = postProcessor.transform(value);
                });
            }

            return value;
        });
    }

    flushall(): Promise<any> {
        return this.client.flushall();
    }

    delete(key: string): Promise<any> {
        return this.client.delete(key);
    }

    retrieve(key: string, ttl: number, promise: any): Promise<any> {
        return this.exists(key).then((exist) => {
            if (exist) {
                return this.get(key);
            }

            return promise().then((res) => {
                return this.set(key, ttl, res);
            }).then((res) => {
                if (res === 'OK') {
                    return this.get(key);
                }
            }).then((res) => {
                return res;
            });
        });
    }
};

export default CacheService;