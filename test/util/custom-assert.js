const { expect } = require('chai');
const _ = require('lodash');

const expectToDeepEqualIgnoringFields = (actual, expected, fieldsToIgnore) => {
    const sanitizedActual = _.omit(actual, fieldsToIgnore);
    const sanitizedExpected = _.omit(expected, fieldsToIgnore);
    expect(sanitizedActual).to.deep.equal(sanitizedExpected);
}

/**
 * 
 * @param {Date} actual 
 * @param {Date} expected 
 * @param {number} seconds - allowed difference in seconds
 */
const expectDatesToBeWithinSeconds = (actual, expected, seconds) => {
    const differenceInSeconds = Math.abs(actual - expected) / 1000;
    expect(differenceInSeconds).to.be.lessThan(seconds,
        `Actual ${actual} is NOT within ${seconds} seconds from expected ${expected}`);
}

module.exports = { expectToDeepEqualIgnoringFields, expectDatesToBeWithinSeconds }