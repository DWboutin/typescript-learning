import CpaPlatformConnectorInterface from '../Interfaces/CpaPlatformConnectorInterface';
import CacheSystemInterface from '../Interfaces/CacheSystemInterface';

import GuardAgainstInvalidValueInParameter from '../Guards/GuardAgainstInvalidValueInParameter';
import GuardAgainstNullProperties from '../Guards/GuardAgainstNullProperties';

import HttpRequestService from '../Services/HttpRequestService';

class HasOffersConnector implements CpaPlatformConnectorInterface {
    private cacheEnabled;
    private cacheService;
    private apiConfigs;

    constructor(cacheService: CacheSystemInterface, apiConfigs: { api: string, api_key: string }) {
        (new GuardAgainstNullProperties()).guard(apiConfigs, ['AFFILIATE_API', 'ADMIN_API', 'GATEWAY_KEY'])

        this.cacheEnabled = false;
        this.cacheService = cacheService;
        this.apiConfigs = apiConfigs;
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
                    api_key: request.session.apiKey,
                }
            default:
                return false;
        }
    }

    offersFindAll({ args, apiDefinition, target, method }: { args: any, apiDefinition: string, target: string, method: string }) {
        const queryArgs = args || {};

        if (queryArgs && 'limit' in queryArgs) {
            queryArgs.limit = args.limit;
        } else {
            queryArgs.limit = Number.MAX_SAFE_INTEGER;
        }
    }
}

export default HasOffersConnector;