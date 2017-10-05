export default class ValuesAreNullException extends Error {
    message: string;
    name: string;
    type: string;
    code: number;

    constructor(values: any, message?: string) {
        const printedValues = (values instanceof Array) ? values.join(', ') : values;

        if(typeof message == 'undefined') {
            message = `You need to provide a valid value. These values was provided (${printedValues}), who can't be null or undefined.`;
        }

        super(message);
        this.message = message;
        this.name = 'ValuesAreNullException';
        this.type = 'CustomException';
        this.code = 401;
    }
}