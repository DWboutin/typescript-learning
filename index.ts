import * as request from 'superagent';
import HttpRequestService from './src/Services/HttpRequestService';

(function () {
    const httpRequest = new HttpRequestService(request);

    httpRequest
        .get('https://jsonplaceholder.typicode.com/posts/1')
        .end((err: any, res: any) => {
           console.log(err, res.body);
        });
})();