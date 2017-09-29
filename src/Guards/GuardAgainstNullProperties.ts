import PropertiesAreNullException from '../Exceptions/PropertiesAreNullException';

export default class GuardAgainstNullProperties {
    public guard(obj: any, fields: Array<string>, customExceptionMessage?: string) {
        fields.forEach((field) => {
            if (obj[field] === null || typeof obj[field] === 'undefined') {
                throw new PropertiesAreNullException(fields, customExceptionMessage);
            }
        });

        return this;
    }
}