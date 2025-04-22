const parseIntEnv = (key, defaultVal) => {
    const val = parseInt(process.env[key]);
    return isNaN(val) ? defaultVal : val;
  };

  const GLOBAL_LIMIT_WINDOW = parseIntEnv('GLOBAL_LIMIT_WINDOW', 10 * 60 * 1000);
  const GLOBAL_LIMIT_MAX = parseIntEnv('GLOBAL_LIMIT_MAX', 30);
  const TIGHT_LIMIT_WINDOW = parseIntEnv('TIGHT_LIMIT_WINDOW', 10 * 60 * 1000);
  const TIGHT_LIMIT_MAX = parseIntEnv('TIGHT_LIMIT_MAX', 5);
  const IS_PROD = process.env.NODE_ENV === 'production';

  module.exports = {
    GLOBAL_LIMIT_WINDOW, GLOBAL_LIMIT_MAX,
    TIGHT_LIMIT_WINDOW, TIGHT_LIMIT_MAX,
    IS_PROD
  };