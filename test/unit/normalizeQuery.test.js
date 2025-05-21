const { expect } = require('chai');
const { MAX_QUERY_DAYS } = require('../../config/constants');
const { normalizeQuery } = require('../../lib/util/dataQueryUtils');

describe('normalizeQuery()', () => {
    const cases = [
        {
            input: { hours: 3 },
            expected: { hours: 3, days: 1, groupBy: undefined }
        },
        {
            input: { hours: 25 },
            expected: { hours: 24, days: 1, groupBy: undefined }
        },
        {
            input: { hours: -5 },
            expected: { hours: 1, days: 1, groupBy: undefined }
        },
        {
            input: { days: 7 },
            expected: { hours: 24, days: 7, groupBy: undefined }
        },
        {
            input: { hour: 23, days: 7 },
            expected: { hours: 24, days: 7, groupBy: undefined }
        },
        {
            input: { days: 30, groupBy: 'day' },
            expected: { hours: 24, days: 30, groupBy: 'day' }
        },
        {
            input: { days: 30, groupBy: 'hour' },
            expected: { hours: 24, days: 30, groupBy: 'hour' }
        },
        {
            input: { groupBy: 'hour' },
            expected: { hours: 1, days: 1, groupBy: undefined }
        },
        {
            input: { days: 2, groupBy: 'day' },
            expected: { hours: 24, days: 2, groupBy: 'day' }
        },
        {
            input: { hours: 24, groupBy: 'day' },
            expected: { hours: 24, days: 1, groupBy: undefined }
        },
        {
            input: { hours: 24, groupBy: 'hour' },
            expected: { hours: 24, days: 1, groupBy: undefined }
        },
        {
            input: { days: 31 },
            expected: { hours: 24, days: 30, groupBy: undefined }
        },
        {
            input: { days: 500, groupBy: 'day' },
            expected: { hours: 24, days: MAX_QUERY_DAYS, groupBy: 'day' }
        },
        {
            input: { days: 500, groupBy: 'hour' },
            expected: { hours: 24, days: MAX_QUERY_DAYS, groupBy: 'hour' }
        },
        {
            input: { days: 31, groupBy: 'day' },
            expected: { hours: 24, days: 31, groupBy: 'day' }
        },
        {
            input: { days: 31, groupBy: 'hour' },
            expected: { hours: 24, days: 31, groupBy: 'hour' }
        },
        {
            input: { days: 30, groupBy: 's' },
            expected: { hours: 24, days: 30, groupBy: undefined }
        },
        {
            input: { days: 0 },
            expected: { hours: 1, days: 1, groupBy: undefined }
        },
        {
            input: { hours: 0 },
            expected: { hours: 1, days: 1, groupBy: undefined }
        },
        {
            input: { days: -10 },
            expected: { hours: 1, days: 1, groupBy: undefined }
        },
        {
            input: { hours: '5', days: '3', groupBy: 'hour' },
            expected: { hours: 24, days: 3, groupBy: 'hour' }
        },
        {
            input: { hours: '', days: null },
            expected: { hours: 1, days: 1, groupBy: undefined }
        }

    ];

    cases.forEach(({ input, expected }, idx) => {
        it(`should normalize correctly for case ${idx + 1}`, () => {
            expect(normalizeQuery(input)).to.deep.equal(expected);
        });
    });
});
