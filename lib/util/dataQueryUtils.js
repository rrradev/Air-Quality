const { MAX_QUERY_DAYS } = require('../../config/constants');

/**
 *
 * @param {ReqQuery} query 
 */
const isEmpty = (query) => {
    if (Object.keys(query).length === 0) {
        return true;
    }

    return false;
}

/**
 *
 * @param {ReqQuery} query 
 */
const normalizeQuery = (query) => {
    let { hours, days } = query;
    let groupBy = (query.groupBy === 'hour' || query.groupBy === 'day') ? query.groupBy : undefined;

    hours = +hours || 1;
    if (days >= 1 || hours > 24) hours = 24;
    if (hours < 0) hours = 1;

    days = +days || 1;
    if (days < 2 && groupBy === 'day') groupBy = undefined;

    days = days > MAX_QUERY_DAYS ? MAX_QUERY_DAYS : days;
    days = (days > 30 && !groupBy) ? 30 : days;
    days = days < 1 ? 1 : days;

    return { hours, days, groupBy };
};

module.exports = {
    isEmpty, normalizeQuery,
}