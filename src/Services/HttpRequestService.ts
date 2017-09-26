import HttpRequestInterface from '../Interfaces/HttpRequestInterface';
import * as request from 'superagent';
import {Response, ResponseError, SuperAgentStatic} from "superagent";

declare var Promise: any;

class HttpRequestService implements HttpRequestInterface{
    private engine: SuperAgentStatic;

    constructor() {
        this.engine = request; // Superagent
    }

    get({ url, query }: { url: string, query?: any }): Promise<any>{
        return new Promise((fulfill: any, reject: any) => {
            this.engine
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
            this.engine
                .post(url)
                .send(send)
                .end((err: ResponseError, res: Response) => {
                    if (err) {
                        reject(err);
                    }

                    fulfill(res);
                });
        });
    }
};

export default HttpRequestService;