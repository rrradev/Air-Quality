const hasNaNs = (...values) => {
    return values.some(value => Number.isNaN(value));
}

module.exports = {
    hasNaNs,
}