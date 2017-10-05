import ValuesAreNullException from '../Exceptions/ValuesAreNullException';
import InvalidValueInArgumentException from '../Exceptions/InvalidValueInArgumentException';

export default class GuardAgainstNullValues {
    public guard(values: any, customExceptionMessage?: string) {
        if (values === null || typeof values === 'undefined') {
            throw new ValuesAreNullException(values, customExceptionMessage);
        } else if (values instanceof Array) {
            values.forEach((value) => {
                if (value === null || typeof value === 'undefined') {
                    throw new ValuesAreNullException(value, customExceptionMessage);
                }
            });
        } else if (typeof values === 'object') {
            throw new InvalidValueInArgumentException(['a string', 'an integer', 'an array']);
        }

        return this;
    }
}