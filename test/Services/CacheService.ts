import "mocha";
import * as chai from 'chai';

declare var Promise: any;

import RedisClient from '../../src/Clients/RedisClient';
import CacheService from '../../src/Services/CacheService';

import ValueToJsonTransformer from '../../src/Transformers/ValueToJsonTransformer';
import JsonParseValueTransformer from '../../src/Transformers/JsonParseValueTransformer';

const should = chai.should();

const redisConfigs = {
    host: ,
    port: ,
    password: ,
    ttl: 60 * 60 * 24 * 15, // 15 jours
};

describe("CacheService", () => {
    describe("set method", () => {
        it('it should set a key named "testCache"', (done) => {
            const redisClient = new RedisClient(redisConfigs);
            const cacheService = new CacheService(redisClient);

            cacheService.set('testCache', 1000, 'test content').then((res: string) => {
                res.should.equal('OK');
                done();
            });
        });
    });

    describe("exists method", () => {
        it('it should check if a key named "testCache" exists', (done) => {
            const redisClient = new RedisClient(redisConfigs);
            const cacheService = new CacheService(redisClient);

            cacheService.exists('testCache').then((res: string) => {
                res.should.equal(1);
                done();
            });
        });
    });

    describe("get method", () => {
        it('it should get a key named "testCache"', (done) => {
            const redisClient = new RedisClient(redisConfigs);
            const cacheService = new CacheService(redisClient);

            cacheService.get('testCache').then((res: string) => {
                res.should.equal('test content');
                done();
            });
        });
    });

    describe("delete method", () => {
        it('it should get delete the key named "testCache"', (done) => {
            const redisClient = new RedisClient(redisConfigs);
            const cacheService = new CacheService(redisClient);

            cacheService.delete('testCache').then((res: string) => {
                res.should.equal(1);
                done();
            });
        });
    });

    describe("retrieve method", () => {
        it('it should get the key named "testCache" but got none and run the promise', (done) => {
            const redisClient = new RedisClient(redisConfigs);
            const cacheService = new CacheService(redisClient);
            const testPromise = (): Promise<any> => new Promise((fulfill: any) => {
                setTimeout(() => {
                    fulfill('promise done');
                }, 500);
            });

            cacheService.retrieve('testCache', 600, testPromise).then((res: string) => {
                res.should.equal('promise done');
                done();
            });
        });

        it('it should get the newly created key named "testCache"', (done) => {
            const redisClient = new RedisClient(redisConfigs);
            const cacheService = new CacheService(redisClient);
            const testPromise = (): Promise<any> => new Promise((fulfill: any) => {
                setTimeout(() => {
                    fulfill('promise done');
                }, 500);
            });

            cacheService.set('testCache', 1000, 'cached key saved').then(() => {
                return cacheService.retrieve('testCache', 600, testPromise);
            }).then((res: string) => {
                res.should.equal('cached key saved');
                done();
            });
        });
    });

    describe("flushall method", () => {
        it('it should create 3 keys with content and flush all of them', (done) => {
            const redisClient = new RedisClient(redisConfigs);
            const cacheService = new CacheService(redisClient);
            const cacheKeysValues: any = {
              key1: 'value1',
              key2: 'value2',
              key3: 'value3',
            };
            const promiseArray: Array<Promise<any>> = [];

            Object.keys(cacheKeysValues).forEach((key: string) => {
                promiseArray.push(cacheService.set(key, 1234, cacheKeysValues[key]));
            });

            Promise.all(promiseArray).then(() => {
                return cacheService.flushall();
            }).then(() => {
                const existPromisesArray: Array<Promise<any>> = [];

                Object.keys(cacheKeysValues).forEach((key: string) => {
                    existPromisesArray.push(cacheService.exists(key));
                });

                return Promise.all(existPromisesArray);
            }).then((res: any) => {
                res.should.be.an('array').to.not.include(1);
                done();
            });
        });
    });
});