import 'mocha';
import * as chai from 'chai';

import GuardAgainstNullValues from '../../src/Guards/GuardAgainstNullValues';

const { expect, assert } = chai;

const should = chai.should();


describe("GuardAgainstNullValues", () => {
    it('it should not throw on a good value', (done) => {
        const values = 'test';

        const functionThatThrows = () => {
            (new GuardAgainstNullValues()).guard(values)
        };

        expect(functionThatThrows).to.not.throw();
        done();
    });

    it('it should not throw on a good integer value', (done) => {
        const values = 1234;

        const functionThatThrows = () => {
            (new GuardAgainstNullValues()).guard(values)
        };

        expect(functionThatThrows).to.not.throw();
        done();
    });

    it('it should throw an error on a null value', (done) => {
        const values = null;

        const functionThatThrows = () => {
            (new GuardAgainstNullValues()).guard(values)
        };

        expect(functionThatThrows).to.throw().that.satisfies((error: any) => {
            return typeof error.name === 'string' && error.name === 'ValuesAreNullException';
        });
        done();
    });

    it('it should throw an error on a undefined value', (done) => {
        let values;

        const functionThatThrows = () => {
            (new GuardAgainstNullValues()).guard(values)
        };

        expect(functionThatThrows).to.throw().that.satisfies((error: any) => {
            return typeof error.name === 'string' && error.name === 'ValuesAreNullException';
        });
        done();
    });

    it('it should throw an error when we pass an object', (done) => {
        const values = {
            prop: 'test',
        };

        const functionThatThrows = () => {
            (new GuardAgainstNullValues()).guard(values)
        };

        expect(functionThatThrows).to.throw().that.satisfies((error: any) => {
            return typeof error.name === 'string' && error.name === 'InvalidValueInArgumentException';
        });
        done();
    });

    it('it should not throw on a array filled with good values', (done) => {
        const values = [
            'test',
            'test1',
            'test2',
        ];

        const functionThatThrows = () => {
            (new GuardAgainstNullValues()).guard(values)
        };

        expect(functionThatThrows).to.not.throw();
        done();
    });

    it('it should throw on a array filled with a bad value', (done) => {
        const values = [
            'test',
            null,
            1234,
        ];

        const functionThatThrows = () => {
            (new GuardAgainstNullValues()).guard(values)
        };

        expect(functionThatThrows).to.throw().that.satisfies((error: any) => {
            return typeof error.name === 'string' && error.name === 'ValuesAreNullException';
        });
        done();
    });
});