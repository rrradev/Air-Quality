export class TimedCache {
    constructor(ttl = 600000, maxEntries = 10) {
        this.ttl = ttl;
        this.maxEntries = maxEntries;
        this.cache = new Map();
        this.inFlight = new Map();
    }

    get(key) {
        const entry = this.cache.get(key);
        if (!entry) return null;

        if (Date.now() - entry.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }

        return entry.value;
    }

    set(key, value) {
        this.cleanup();
        this.cache.set(key, { value, timestamp: Date.now() });
        this.inFlight.delete(key);

        if (this.cache.size > this.maxEntries) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
    }

    getInFlight(key) {
        return this.inFlight.get(key);
    }

    setInFlight(key, promise) {
        this.inFlight.set(key, promise);
    }

    cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now - entry.timestamp > this.ttl) {
                this.cache.delete(key);
            }
        }
    }
}
