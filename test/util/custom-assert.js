const { expect } = require('chai');
const _ = require('lodash');

const expectToDeepEqualIgnoringFields = (actual, expected, fieldsToIgnore) => {
    const sanitizedActual = _.omit(actual, fieldsToIgnore);
    const sanitizedExpected = _.omit(expected, fieldsToIgnore);
    expect(sanitizedActual).to.deep.equal(sanitizedExpected);
}

module.exports = { expectToDeepEqualIgnoringFields }