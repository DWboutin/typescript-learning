import 'mocha';
import * as chai from 'chai';

import GuardAgainstNullProperties from '../../src/Guards/GuardAgainstNullProperties';
import PropertiesAreNullException from '../../src/Exceptions/PropertiesAreNullException';

const { expect, assert } = chai;

const should = chai.should();


describe("GuardAgainstNullProperties", () => {
    it('it should not throw on a good object', (done) => {
        const obj = {
            prop1: 'test',
            prop2: 'test2',
            prop3: 'test3',
        };

        const functionThatThrows = () => {
            (new GuardAgainstNullProperties()).guard(obj, ['prop1', 'prop2', 'prop3'])
        };

        expect(functionThatThrows).to.not.throw();
        done();
    });

    it('it should throw an error on a null value', (done) => {
        const obj = {
            prop1: 'test',
            prop2: 'test2',
            prop3: null,
        };
        const functionThatThrows = () => {
            (new GuardAgainstNullProperties()).guard(obj, ['prop1', 'prop2', 'prop3'])
        };

        expect(functionThatThrows).to.throw().that.satisfies((error: any) => {
            return typeof error.name === 'string' && error.name === 'PropertiesAreNullException';
        });
        done();
    });

    it('it should not take an array', (done) => {
        const obj = ['test', 'test2', 'test3'];

        const functionThatThrows = () => {
            (new GuardAgainstNullProperties()).guard(obj, ['prop1', 'prop2', 'prop3'])
        };

        expect(functionThatThrows).to.throw().that.satisfies((error: any) => {
            return typeof error.name === 'string' && error.name === 'PropertiesAreNullException';
        });
        done();
    });

    it('it should not take a string', (done) => {
        const obj = 'test';

        const functionThatThrows = () => {
            (new GuardAgainstNullProperties()).guard(obj, ['prop1', 'prop2', 'prop3'])
        };

        expect(functionThatThrows).to.throw().that.satisfies((error: any) => {
            return typeof error.name === 'string' && error.name === 'PropertiesAreNullException';
        });
        done();
    });

    it('it should not take an integer', (done) => {
        const obj = 1234;

        const functionThatThrows = () => {
            (new GuardAgainstNullProperties()).guard(obj, ['prop1', 'prop2', 'prop3'])
        };

        expect(functionThatThrows).to.throw().that.satisfies((error: any) => {
            return typeof error.name === 'string' && error.name === 'PropertiesAreNullException';
        });
        done();
    });
});