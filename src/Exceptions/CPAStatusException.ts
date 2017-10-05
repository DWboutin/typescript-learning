export default class CPAStatusException extends Error {
    message: string;
    name: string;
    type: string;
    code: number;

    constructor(message?: string) {
        if(typeof message == 'undefined') {
            message = 'Status = -1';
        }

        super(message);
        this.message = message;
        this.name = 'CPAStatusException';
        this.type = 'CustomException';
        this.code = 401;
    }
}