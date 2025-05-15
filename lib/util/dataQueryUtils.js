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
    let groupByHour = isTrue(query.groupByHour);
    let groupByDay = isTrue(query.groupByDay);

    hours = +hours || 1;

    if (days >= 1 || hours > 24) hours = 24;
    if (hours < 0) hours = 1;

    days = +days || 1;

    if (days < 2) {
        groupByDay = false;
    }

    days = days > MAX_QUERY_DAYS ? MAX_QUERY_DAYS : days;
    days = (days > 30 && (!groupByDay && !groupByHour)) ? 30 : days;
    days = days < 1 ? 1 : days;

    return { hours, days, groupByHour, groupByDay };
}

const isTrue = (val) => val === true || val === 'true';

module.exports = {
    isEmpty, normalizeQuery,
}