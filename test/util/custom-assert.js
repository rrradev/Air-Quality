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
 * @param {number} hours - allowed difference in hours
 */
const expectDatesToBeWithinHours = (actual, expected, hours) => {
  const differenceInHours = Math.abs(actual - expected) ;
  expect(differenceInHours).to.be.lessThan(hours, `Actual ${actual} is NOT within ${hours} hours from expected ${expected}`);
  console.log(`Actual ${actual} is / expected ${expected}`);
}

module.exports = { 
    expectToDeepEqualIgnoringFields, 
    expectDatesToBeWithinHours,
}