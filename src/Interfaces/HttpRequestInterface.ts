interface HttpRequestInterface {
    get: ({ url, query }: { url: string, query?: any }) => Promise<any>;
    post: ({ url, send }: { url: string, send?: any }) => Promise<any>;
};

export default HttpRequestInterface;