declare var Promise: any;

import "mocha";
import * as chai from 'chai';

import CPAClient from '../../src/Clients/CPAClient';
import RedisClient from '../../src/Clients/RedisClient';
import SuperagentClient from '../../src/Clients/SuperagentClient';

import HttpRequestService from '../../src/Services/HttpRequestService';
import CacheService from '../../src/Services/CacheService';

import RequestBodyReturnTransformer from '../../src/Transformers/RequestBodyReturnTransformer';
import ValueToJsonTransformer from '../../src/Transformers/ValueToJsonTransformer';
import JsonParseValueTransformer from '../../src/Transformers/JsonParseValueTransformer';

import CPAStatusException from '../../src/Exceptions/CPAStatusException';

const should = chai.should();
const { expect } = chai;

const apiConfigs = {

};
const redisConfigs = {

};

describe("CPAClient", () => {
    describe("offersFindAll method", () => {
        it('it should get the first page of all offers with limit 20 without a cache client', (done) => {
            const superagentClient = new SuperagentClient();
            const httpRequestService = new HttpRequestService(superagentClient);
            const hasOffersConnector = new CPAClient(apiConfigs, httpRequestService);
            const queryArgs: any = {
                page: 1,
                limit: 20,
            };

            hasOffersConnector.offersFindAll(queryArgs, 'admin').then((res) => {
                if (res.body.response.status === -1) {
                    throw new CPAClient('Cannot get offers');
                }

                res.should.have.property('status');
                res.status.should.equal(200);
                res.should.have.property('body');

                res.body.should.have.property('request');
                res.body.request.should.have.property('page');
                res.body.request.page.should.equal('1');
                res.body.request.should.have.property('limit');
                res.body.request.limit.should.equal('20');

                res.body.should.have.property('response');
                res.body.response.should.have.property('data');
                res.body.response.data.should.have.property('data');

                Object.keys(res.body.response.data.data).length.should.equal(20);
            }).then(done, done);
        });

        it('it should get the first page of all offers with limit 20 with a cache client', (done) => {
            queryWithCacheSystem(done);
        });

        it('it should get the result from the cache', (done) => {
            queryWithCacheSystem(done);
        });

        function queryWithCacheSystem(done) {
            const superagentClient = new SuperagentClient();
            const httpRequestService = new HttpRequestService(superagentClient);

            const redisClient = new RedisClient(redisConfigs);
            const requestBodyReturnTransformer = new RequestBodyReturnTransformer();
            const valueToJsonTransformer = new ValueToJsonTransformer();
            const jsonParseValueTransformer = new JsonParseValueTransformer();
            const cacheService = new CacheService(redisClient, [requestBodyReturnTransformer, valueToJsonTransformer], [jsonParseValueTransformer]);

            const hasOffersConnector = new CPAClient(apiConfigs, httpRequestService, cacheService);

            const queryArgs: any = {
                page: 1,
                limit: 20,
            };

            hasOffersConnector.offersFindAll(queryArgs, 'admin').then((res) => {
                if (res.response.status === -1) {
                    throw new CPAStatusException('Cannot get offers');
                }

                res.should.have.property('response');
                res.response.should.have.property('status');
                res.response.should.have.property('httpStatus');
                res.response.httpStatus.should.equal(200);
                res.response.status.should.equal(1);
                res.response.should.have.property('data');
                res.response.data.should.have.property('data');

                res.should.have.property('request');
                res.request.should.have.property('page');
                res.request.page.should.equal('1');
                res.request.should.have.property('limit');
                res.request.limit.should.equal('20');

                Object.keys(res.response.data.data).length.should.equal(20);
            }).then(done, done);
        }
    });
});