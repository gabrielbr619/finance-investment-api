// src/services/cacheService.js
class CacheService {
  constructor(ttlSeconds = 300) {
    this.cache = {};
    this.ttl = ttlSeconds * 1000;
  }

  set(key, data) {
    this.cache[key] = { data, timestamp: Date.now() };
  }

  get(key) {
    const cached = this.cache[key];
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.ttl) {
      delete this.cache[key];
      return null;
    }
    
    return cached.data;
  }
}

module.exports = { CacheService };