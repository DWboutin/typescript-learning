import HttpRequestService from './src/Services/HttpRequestService';

(function() {
    function get() {
        const httpRequestService = new HttpRequestService();

        httpRequestService
            .get({
                url: 'https://jsonplaceholder.typicode.com/posts/1'
            })
            .then((res): void => {
                console.log(res.body);
            }).catch((err): void => {
                console.log(err);
            });
    }

    function post() {
        const httpRequestService = new HttpRequestService();

        httpRequestService
            .post({
                url: 'https://jsonplaceholder.typicode.com/posts',
                send: {
                    title: '1234',
                    text: 'Lipsum blabla'
                }
            })
            .then((res): void => {
                console.log(res.body);
            }).catch((err): void => {
                console.log(err.status);
            });
    }

    get();
    post();
})();