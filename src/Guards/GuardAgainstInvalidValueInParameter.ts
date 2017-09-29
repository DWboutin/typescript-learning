import InvalidValueInParameterException from '../Exceptions/InvalidValueInParameterException';

export default class GuardAgainstInvalidValueInParameter {
    private customExceptionMessage?: string;

    constructor(customExceptionMessage?: string) {
        this.customExceptionMessage = customExceptionMessage;
    }

    public guard(parameter: any, valuesExpected: Array<any>) {
        if (valuesExpected.indexOf(parameter) === -1) {
            throw new InvalidValueInParameterException(valuesExpected);
        }

        return this;
    }
}