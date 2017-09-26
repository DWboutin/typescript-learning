export default class PropertiesAreNullException extends Error {
    message: string;
    name: string;
    type: string;
    code: number;

    constructor(fields: Array<string>, message?: string) {

        if(typeof message == 'undefined') {
            message = `You need to provide properties (${fields.join(', ')}) who can't be null or undefined.`;
        }

        super(message);
        this.message = message;
        this.name = 'PropertiesAreNullException';
        this.type = 'CustomException';
        this.code = 401;
    }
}