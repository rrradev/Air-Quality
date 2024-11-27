const hasNaNs = (...values) => {
    return values.some(value => Number.isNaN(value));
}

const parseAndRound = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? NaN : Math.round(parsed * 100) / 100;
};

module.exports = {
    hasNaNs,
    parseAndRound,
}