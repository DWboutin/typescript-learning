declare var Promise: any;

import * as qs from 'qs';
import * as request from 'superagent';
import {Response, ResponseError, SuperAgentStatic} from "superagent";

import HttpRequestInterface from '../Interfaces/HttpRequestInterface';


class SuperagentClient implements HttpRequestInterface {
    private engine: SuperAgentStatic;

    constructor() {
        this.engine = request; // Superagent
    }

    get({ url, query }: { url: string, query?: any }): Promise<any>{
        return new Promise((fulfill: any, reject: any) => {
            request
                .get(url)
                .query(query)
                .end((err: ResponseError, res: Response) => {
                    if (err) {
                        reject(err);
                    }

                    fulfill(res);
                });
        });
    }

    post({ url, send }: { url: string, send?: any }): Promise<any>{
        return new Promise((fulfill: any, reject: any) => {
            request
                .post(url)
                .send(qs.stringify(send))
                .end((err: ResponseError, res: Response) => {
                    if (err) {
                        reject(err);
                    }

                    fulfill(res);
                });
        });
    }
};

export default SuperagentClient;