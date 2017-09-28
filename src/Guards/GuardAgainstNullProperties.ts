import PropertiesAreNullException from '../Exceptions/PropertiesAreNullException';

export default class GuardAgainstNullProperties {
    private fields: Array<string>;
    private obj: any;
    private customExceptionMessage?: string;

    constructor(fields: Array<string>, obj: any, customExceptionMessage?: string) {
        this.fields = fields;
        this.obj = obj;
        this.customExceptionMessage = customExceptionMessage;
    }

    public guard() {
        this.fields.forEach((field) => {
            if (this.obj[field] === null || typeof this.obj[field] === 'undefined') {
                throw new PropertiesAreNullException(this.fields);
            }
        });
    }
}