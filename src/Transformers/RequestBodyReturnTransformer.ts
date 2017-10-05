import TransformerInterface from '../Interfaces/TransformerInterface';

class RequestBodyReturnTransformer implements TransformerInterface {
    transform(content: any) {
        return content.body;
    }
}

export default RequestBodyReturnTransformer;