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
    let { hours, days, groupByHour, groupByDay } = query;

    hours = +hours || 1;

    if (days >= 1 || hours > 24) hours = 24;
    if (hours < 0) hours = 1;

    days = +days || 1;
    groupByDay = !!groupByDay;
    groupByHour = !!groupByHour;

    days = days > MAX_QUERY_DAYS ? MAX_QUERY_DAYS : days;
    days = (days > 30 && (!groupByDay && !groupByHour)) ? 30 : days;
    days = days < 1 ? 1 : days;

    return { hours, days, groupByHour, groupByDay };
}

module.exports = {
    isEmpty, normalizeQuery,
}