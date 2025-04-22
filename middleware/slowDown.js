const slowDown = require('express-slow-down');
const { GLOBAL_LIMIT_WINDOW, GLOBAL_LIMIT_MAX, TIGHT_LIMIT_WINDOW, TIGHT_LIMIT_MAX, IS_PROD } = require('../config/constants');
const next = require('./next');

function createSlowDown(windowMs, delayAfter) {
  return slowDown({
    windowMs,
    delayAfter,
    delayMs: (used, req) => (used - req.slowDown.limit) * 500,
    maxDelayMs: 5000,
  });
}

const globalSlowDown = createSlowDown(GLOBAL_LIMIT_WINDOW, GLOBAL_LIMIT_MAX);
const tightSlowDown = createSlowDown(TIGHT_LIMIT_WINDOW, TIGHT_LIMIT_MAX);

module.exports = {
  globalSlowDown: IS_PROD ? globalSlowDown : next,
  tightSlowDown: IS_PROD ? tightSlowDown : next,
};
