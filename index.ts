import HttpRequestService from './src/Services/HttpRequestService';
import CacheSystemService from './src/Services/CacheSystemService';
import RedisCacheFactory from './src/Factories/RedisCacheFactory';

(function() {
    const redisDB = new RedisCacheFactory().create({
        host: '',
        port: null,
        password: '',
        ttl: 60 * 60 * 24 * 15, // 15 jours
    });
    const cacheSystem = new CacheSystemService(redisDB);

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