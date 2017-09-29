import 'mocha';
import * as chai from 'chai';

import GuardAgainstInvalidValueInParameter from '../../src/Guards/GuardAgainstInvalidValueInParameter';
import InvalidValueInParameterException from '../../src/Exceptions/InvalidValueInParameterException';

const { expect, assert } = chai;

const should = chai.should();


describe("GuardAgainstInvalidValueInParameter", () => {
    it('it should not throw on one good parameter', (done) => {
        const parameter = 'good value';
        const functionThatThrows = () => {
            (new GuardAgainstInvalidValueInParameter()).guard(parameter, ['good value']);
        };

        expect(functionThatThrows).to.not.throw();
        done();
    });

    it('it should throw on one bad parameter', (done) => {
        const parameter = 'bad value';
        const functionThatThrows = () => {
            (new GuardAgainstInvalidValueInParameter()).guard(parameter, ['good value']);
        };

        expect(functionThatThrows).to.throw().that.satisfies((error: any) => {
            return typeof error.name === 'string' && error.name === 'InvalidValueInParameterException';
        });
        done();
    });

    it('it should not throw on chained validations with good parameters', (done) => {
        const parameter = 'good value';
        const parameter2 = 'good value2';
        const parameter3 = 'good value3';
        const functionThatThrows = () => {
            (new GuardAgainstInvalidValueInParameter())
                .guard(parameter, ['a value', 'good value'])
                .guard(parameter2, ['a second value', 'good value2'])
                .guard(parameter3, ['a third value', 'good value3']);
        };

        expect(functionThatThrows).to.not.throw();
        done();
    });

    it('it should throw on chained validations with bad parameters', (done) => {
        const parameter = 'bad value';
        const parameter2 = 'bad value2';
        const parameter3 = 'bad value3';
        const functionThatThrows = () => {
            (new GuardAgainstInvalidValueInParameter())
                .guard(parameter, ['a value', 'good value'])
                .guard(parameter2, ['a second value', 'good value2'])
                .guard(parameter3, ['a third value', 'good value3']);
        };

        expect(functionThatThrows).to.throw().that.satisfies((error: any) => {
            return typeof error.name === 'string' && error.name === 'InvalidValueInParameterException';
        });
        done();
    });
});