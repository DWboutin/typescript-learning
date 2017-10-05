export default class InvalidValueInArgumentException extends Error {
    message: string;
    name: string;
    type: string;
    code: number;

    constructor(valuesExpected: Array<any>, message?: string) {
        if(typeof message == 'undefined') {
            message = `You need to provide these types of values only (${valuesExpected.join(', ')}) for your argument.`;
        }

        super(message);
        this.message = message;
        this.name = 'InvalidValueInArgumentException';
        this.type = 'CustomException';
        this.code = 401;
    }
}