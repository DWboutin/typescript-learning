export default class InvalidValueInParameterException extends Error {
    message: string;
    name: string;
    type: string;
    code: number;

    constructor(valuesExpected: Array<any>, message?: string) {
        if(typeof message == 'undefined') {
            message = `You need to provide these values (${valuesExpected.join(', ')}) for your parameter.`;
        }

        super(message);
        this.message = message;
        this.name = 'InvalidValueInParameterException';
        this.type = 'CustomException';
        this.code = 401;
    }
}