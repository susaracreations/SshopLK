// Rate Limiting Configuration for S Shop LK
// This file helps prevent 429 "Too Many Requests" errors

window.RateLimitConfig = {
    // Firebase API call limits
    firebase: {
        minCallInterval: 2000,        // 2 seconds between Firebase calls
        maxRetries: 3,                // Maximum retry attempts
        baseRetryDelay: 1000,         // Base delay for retries (1 second)
        maxCallsPerMinute: 30         // Maximum Firebase calls per minute
    },
    
    // Page load limits
    pageLoad: {
        maxLoadsPerMinute: 10,        // Maximum page loads per minute
        cacheWarmupDelay: 1000        // Delay before warming cache
    },
    
    // Search limits
    search: {
        debounceDelay: 300,           // Search debounce delay (300ms)
        maxSearchPerMinute: 60        // Maximum search operations per minute
    },
    
    // Cache settings
    cache: {
        localStorageTTL: 30 * 60 * 1000,  // 30 minutes cache TTL
        enableCacheWarming: true,          // Enable cache warming
        fallbackToLocalData: true         // Fallback to local data on errors
    },
    
    // Error handling
    errorHandling: {
        showUserFriendlyErrors: true,     // Show user-friendly error messages
        logErrorsToConsole: true,         // Log errors to console
        retryOnFailure: true              // Retry failed operations
    }
};

// Utility functions for rate limiting
window.RateLimitUtils = {
    // Check if enough time has passed since last call
    canMakeCall: function(lastCallTime, minInterval) {
        const now = Date.now();
        return (now - lastCallTime) >= minInterval;
    },
    
    // Get exponential backoff delay
    getBackoffDelay: function(attempt, baseDelay) {
        return baseDelay * Math.pow(2, attempt);
    },
    
    // Check rate limit for specific operation
    checkRateLimit: function(operation, maxPerMinute) {
        const key = `rateLimit_${operation}`;
        const now = Date.now();
        const oneMinuteAgo = now - (60 * 1000);
        
        let calls = JSON.parse(localStorage.getItem(key) || '[]');
        calls = calls.filter(timestamp => timestamp > oneMinuteAgo);
        
        if (calls.length >= maxPerMinute) {
            return false;
        }
        
        calls.push(now);
        localStorage.setItem(key, JSON.stringify(calls));
        return true;
    },
    
    // Clear old rate limit data
    cleanupRateLimits: function() {
        const now = Date.now();
        const oneMinuteAgo = now - (60 * 1000);
        
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('rateLimit_')) {
                try {
                    const calls = JSON.parse(localStorage.getItem(key) || '[]');
                    const validCalls = calls.filter(timestamp => timestamp > oneMinuteAgo);
                    if (validCalls.length === 0) {
                        localStorage.removeItem(key);
                    } else {
                        localStorage.setItem(key, JSON.stringify(validCalls));
                    }
                } catch (error) {
                    localStorage.removeItem(key);
                }
            }
        });
    }
};

// Clean up old rate limit data every minute
setInterval(() => {
    window.RateLimitUtils.cleanupRateLimits();
}, 60000);

console.log('Rate limiting configuration loaded successfully'); 