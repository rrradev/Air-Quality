const parseIntEnv = (key, defaultVal) => {
    const val = parseInt(process.env[key]);
    return isNaN(val) ? defaultVal : val;
  };
  
  export const DATA_FETCH_INTERVAL_MS = parseIntEnv('DATA_FETCH_INTERVAL_MS', 10 * 60 * 1000);
  export const DATA_CACHE_TTL_MS = parseIntEnv('DATA_CACHE_TTL_MS', 9 * 60 * 1000);
  export const CACHE_MAX_ENTRIES = parseIntEnv('CACHE_MAX_ENTRIES', 10);
  