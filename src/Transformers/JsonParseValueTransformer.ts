import TransformerInterface from '../Interfaces/TransformerInterface';

class JsonParseValueTransformer implements TransformerInterface {
    transform(content: any) {
        return JSON.parse(content);
    }
}

export default JsonParseValueTransformer;