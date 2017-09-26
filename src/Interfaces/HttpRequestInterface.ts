import { Response, ResponseError } from 'superagent';

export default interface HttpRequestInterface {
    get: (url: String) => HttpRequestService;
    end: (cb: (err: Response, res: ResponseError) => any) => any;
};