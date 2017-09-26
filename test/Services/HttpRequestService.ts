import "mocha";
import * as chai from 'chai';

import HttpRequestService from '../../src/Services/HttpRequestService';

const should = chai.should();

describe("HttpRequestService", () => {
    describe("GET method", () => {
        it('it should GET the post json', (done) => {
            const httpRequestService = new HttpRequestService();

            httpRequestService
                .get({
                    url: 'https://jsonplaceholder.typicode.com/posts/1'
                })
                .then((res): void => {
                    res.should.have.property('status');
                    res.status.should.equal(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    done();
                });
        });

        it('it should not GET the post with wrong url and get status 404', (done) => {
            const httpRequestService = new HttpRequestService();

            httpRequestService
                .get({
                    url: 'https://jsonplaceholder.typicode.com/posts/1938492384983948398'
                })
                .then((): void => {
                    throw false;
                }).catch((err): void => {
                    err.should.have.property('status');
                    err.status.should.equal(404);
                    done();
                });
        });
    });

    describe("POST method", () => {
        it('it should POST a post and get an object with id, title, text back', (done) => {
            const httpRequestService = new HttpRequestService();

            httpRequestService
                .post({
                    url: 'https://jsonplaceholder.typicode.com/posts',
                    send: {
                        title: 'Title test',
                        text: 'Lipsum blabla'
                    }
                })
                .then((res): void => {
                    res.should.have.property('status');
                    res.status.should.equal(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('title');
                    res.body.title.should.equal('Title test');
                    res.body.should.have.property('text');
                    res.body.text.should.equal('Lipsum blabla');
                    done();
                }).catch((err): void => {
                    throw false;
                });
        });

        it('it should POST a post to a wrong url and get status 404', (done) => {
            const httpRequestService = new HttpRequestService();

            httpRequestService
                .post({
                    url: 'https://jsonplaceholder.typicode.com/posts/1938492384983948398',
                    send: {
                        title: 'Title test',
                        text: 'Lipsum blabla'
                    }
                })
                .then((res): void => {
                    throw false;
                }).catch((err): void => {
                    err.should.have.property('status');
                    err.status.should.equal(404);
                    done();
                });
        });
    });
});