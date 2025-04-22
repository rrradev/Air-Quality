const rateLimit = require('express-rate-limit');
const { GLOBAL_LIMIT_WINDOW, GLOBAL_LIMIT_MAX, TIGHT_LIMIT_WINDOW, TIGHT_LIMIT_MAX, IS_PROD } = require('../config/constants');
const next = require('./next');

const globalLimit = rateLimit({
  windowMs: GLOBAL_LIMIT_WINDOW,
  max: GLOBAL_LIMIT_MAX,
});

const tightLimit = rateLimit({
  windowMs: TIGHT_LIMIT_WINDOW,
  max: TIGHT_LIMIT_MAX,
});

module.exports = {
  globalLimit: IS_PROD ? globalLimit : next,
  tightLimit: IS_PROD ? tightLimit : next
};
