declare var Promise: any;

import HttpRequestInterface from '../Interfaces/HttpRequestInterface';

class HttpRequestService implements HttpRequestInterface {
    private client: HttpRequestInterface;

    constructor(client: HttpRequestInterface) {
        this.client = client;
    }

    get({ url, query }: { url: string, query?: any }): Promise<any>{
        return this.client.get({ url, query });
    }

    post({ url, send }: { url: string, send?: any }): Promise<any>{
        return this.client.post({ url, send });
    }
};

export default HttpRequestService;