import "mocha";
import * as chai from 'chai';

import CacheSystemService from '../../src/Services/CacheSystemService';
import RedisCacheFactory from '../../src/Factories/RedisCacheFactory';

const should = chai.should();

const redisConfigs = {
    host: 'vm1.mboutin2.dev.lan',
    port: 6379,
    password: 'foobarbaz',
    ttl: 60 * 60 * 24 * 15, // 15 jours
};

describe("CacheSystemService", () => {
    describe("set method", () => {
        it('it should set a key named "testCache"', (done) => {
            const redisDB = new RedisCacheFactory().create(redisConfigs);
            const cacheService = new CacheSystemService(redisDB);

            cacheService.set('testCache', 1000, 'test content').then((res: string) => {
                res.should.equal('OK');
                done();
            });
        });
    });

    describe("exists method", () => {
        it('it should check if a key named "testCache" exists', (done) => {
            const redisDB = new RedisCacheFactory().create(redisConfigs);
            const cacheService = new CacheSystemService(redisDB);

            cacheService.exists('testCache').then((res: string) => {
                res.should.equal(1);
                done();
            });
        });
    });

    describe("get method", () => {
        it('it should get a key named "testCache"', (done) => {
            const redisDB = new RedisCacheFactory().create(redisConfigs);
            const cacheService = new CacheSystemService(redisDB);

            cacheService.get('testCache').then((res: string) => {
                res.should.equal('test content');
                done();
            });
        });
    });
});