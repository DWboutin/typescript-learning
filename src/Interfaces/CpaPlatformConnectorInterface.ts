interface CpaPlatformConnectorInterface {
    getApiInfos: (definition: string, request?: any) => any;
    offersFindAll: ({ args, apiDefinition, target, method }: { args: any, apiDefinition: string, target: string, method: string }) => Promise<number>;
}

export default CacheSystemInterface;