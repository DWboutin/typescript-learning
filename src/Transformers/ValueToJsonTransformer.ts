import TransformerInterface from '../Interfaces/TransformerInterface';

class ValueToJsonTransformer implements TransformerInterface {
    transform(content: any) {
        return JSON.stringify(content);
    }
}

export default ValueToJsonTransformer;