import { TimedCache } from '../util/TimeCache';
import { DATA_CACHE_TTL_MS, CACHE_MAX_ENTRIES } from '../config/constants';

const cache = new TimedCache(DATA_CACHE_TTL_MS, CACHE_MAX_ENTRIES);

export async function fetchCachedData(endpoint, abortSignal) {
  const cached = cache.get(endpoint);
  if (cached) return cached;

  const inFlight = cache.getInFlight(endpoint);
  if (inFlight) return inFlight;

  const promise = fetch(endpoint, { signal: abortSignal })
    .then(res => res.json())
    .then(data => {
      cache.set(endpoint, data);
      return data;
    })
    .catch(err => {
      cache.inFlight.delete(endpoint);
      throw err;
    });

  cache.setInFlight(endpoint, promise);

  return promise;
}
