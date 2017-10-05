declare var Promise: any;

import CpaPlatformConnectorInterface from '../Interfaces/CpaPlatformConnectorInterface';
import CacheServiceInterface from '../Interfaces/CacheServiceInterface';
import HttpRequestInterface from '../Interfaces/HttpRequestInterface';

import GuardAgainstInvalidValueInParameter from '../Guards/GuardAgainstInvalidValueInParameter';
import GuardAgainstNullProperties from '../Guards/GuardAgainstNullProperties';
import GuardAgainstNullValues from '../Guards/GuardAgainstNullValues';

import HasOfferStatusException from '../Exceptions/CPAStatusException';

import HttpRequestService from '../Services/HttpRequestService';

class CPAClient implements CpaPlatformConnectorInterface {
    private apiConfigs;
    private requestService: HttpRequestInterface;
    private cacheService;
    private cacheEnabled;

    constructor(apiConfigs: any, requestService: HttpRequestInterface, cacheService?: CacheServiceInterface) {
        (new GuardAgainstNullProperties()).guard(apiConfigs, ['AFFILIATE_API', 'ADMIN_API', 'GATEWAY_KEY'])

        this.cacheEnabled = (typeof cacheService !== 'undefined') ? true : false;
        this.apiConfigs = apiConfigs;
        this.cacheService = cacheService;
        this.requestService = requestService;
    }

    private query(url: string, send: any): Promise<any> {
        return this.requestService.post({
            url,
            send,
        });
    }

    get cacheStatus() {
        return this.cacheEnabled;
    }

    set cacheStatus(value) {
        this.cacheEnabled = value;
    }

    getApiInfos(definition: string, request?: any) {
        (new GuardAgainstInvalidValueInParameter()).guard(definition, ['affiliate', 'admin']);

        switch(definition) {
            case 'affiliate':
                (new GuardAgainstNullProperties())
                    .guard(request, ['session'])
                    .guard(request.session, ['apiKey']);

                return {
                    api: this.apiConfigs.AFFILIATE_API,
                    api_key: request.session.apiKey,
                };
            case 'admin':
                return {
                    api: this.apiConfigs.ADMIN_API,
                    api_key: this.apiConfigs.GATEWAY_KEY,
                };
            default:
                return false;
        }
    }

    offersFindAll(args: any, apiDefinition: string): Promise<any> {
        (new GuardAgainstNullValues())
            .guard(apiDefinition);

        const queryArgs = args || {};
        const target: string = (apiDefinition === 'admin') ? 'Offer' : 'Affiliate_Offer';
        const method: string = 'findAll';
        const apiInfos: any = this.getApiInfos(apiDefinition);
        const url: string = apiInfos.api + '?api_key=' + apiInfos.api_key + '&Target=' + target + '&Method=' + method;

        if (queryArgs && 'limit' in queryArgs) {
            queryArgs.limit = args.limit;
        } else {
            queryArgs.limit = 1000;
        }

        const executeQuery = () => {
            return this.query(url, queryArgs);
        };

        if (this.cacheStatus) {
            queryArgs.api_key = new Buffer(apiInfos.api_key).toString('base64');
            queryArgs.target = target;
            queryArgs.method = method;

            const cacheKey = JSON.stringify(queryArgs);

            return this.cacheService.retrieve(cacheKey, 600, executeQuery);
        }

        return executeQuery();
    }
}

export default CPAClient;