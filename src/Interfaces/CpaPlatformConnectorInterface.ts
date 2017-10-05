interface CpaPlatformConnectorInterface {
    getApiInfos: (definition: string, request?: any) => any;
    offersFindAll: ({ args, apiDefinition }: { args: any, apiDefinition: string }) => Promise<any>;
}

export default CacheSystemInterface;