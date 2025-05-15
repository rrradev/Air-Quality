const { expect } = require('chai');
const { MAX_QUERY_DAYS } = require('../../config/constants');
const { normalizeQuery } = require('../../lib/util/dataQueryUtils');

describe('normalizeQuery()', () => {
    const cases = [
        {
            input: { hours: 3 },
            expected: { hours: 3, days: 1, groupByHour: false, groupByDay: false }
        },
        {
            input: { hours: 25 },
            expected: { hours: 24, days: 1, groupByHour: false, groupByDay: false }
        },
        {
            input: { hours: -5 },
            expected: { hours: 1, days: 1, groupByHour: false, groupByDay: false }
        },
        {
            input: { days: 7 },
            expected: { hours: 24, days: 7, groupByHour: false, groupByDay: false }
        },
        {
            input: { hour: 23, days: 7 },
            expected: { hours: 24, days: 7, groupByHour: false, groupByDay: false }
        },
        {
            input: { days: 30, groupByHour: false, groupByDay: true },
            expected: { hours: 24, days: 30, groupByHour: false, groupByDay: true }
        },
        {
            input: { days: 30, groupByHour: true, groupByDay: false },
            expected: { hours: 24, days: 30, groupByHour: true, groupByDay: false }
        },
        {
            input: { groupByHour: 'true', groupByDay: 'false' },
            expected: { hours: 1, days: 1, groupByHour: true, groupByDay: false }
        },
        {
            input: { days: 2, groupByHour: 'false', groupByDay: 'true' },
            expected: { hours: 24, days: 2, groupByHour: false, groupByDay: true }
        },
        {
            input: { hours: 24, groupByHour: 'false', groupByDay: 'true' },
            expected: { hours: 24, days: 1, groupByHour: false, groupByDay: false }
        },
        {
            input: { hours: 24, groupByHour: false, groupByDay: true },
            expected: { hours: 24, days: 1, groupByHour: false, groupByDay: false }
        },
        {
            input: { hours: 24, groupByHour: true, groupByDay: false },
            expected: { hours: 24, days: 1, groupByHour: true, groupByDay: false }
        },
        {
            input: { days: 500 },
            expected: { hours: 24, days: 30, groupByHour: false, groupByDay: false }
        },
        {
            input: { days: 500, groupByDay: true },
            expected: { hours: 24, days: MAX_QUERY_DAYS, groupByHour: false, groupByDay: true }
        },
        {
            input: { days: 500, groupByHour: true },
            expected: { hours: 24, days: MAX_QUERY_DAYS, groupByHour: true, groupByDay: false }
        },
        {
            input: { days: 31 },
            expected: { hours: 24, days: 30, groupByHour: false, groupByDay: false }
        },
        {
            input: { days: 31, groupByDay: true },
            expected: { hours: 24, days: 31, groupByHour: false, groupByDay: true }
        },
        {
            input: { days: 31, groupByHour: true },
            expected: { hours: 24, days: 31, groupByHour: true, groupByDay: false }
        },
        {
            input: {},
            expected: { hours: 1, days: 1, groupByHour: false, groupByDay: false }
        }
    ];

    cases.forEach(({ input, expected }, idx) => {
        it(`should normalize correctly for case ${idx + 1}`, () => {
            expect(normalizeQuery(input)).to.deep.equal(expected);
        });
    });
});
