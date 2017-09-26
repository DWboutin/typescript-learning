import HttpRequestInterface from '../Interfaces/HttpRequestInterface';
import { SuperAgentStatic, SuperAgentRequest } from "superagent";

class HttpRequestService implements HttpRequestInterface{
    private engine: SuperAgentStatic;
    private currentReq: SuperAgentRequest;

    constructor(engine: SuperAgentStatic) {
        this.engine = engine;
    }

    get(url: string): HttpRequestService {
        this.currentReq = this.engine.get(url);
        return this;
    }

    end(cb: (err: any, res: any) => any) {
        return this.currentReq.end(cb);
    }
};

export default HttpRequestService;