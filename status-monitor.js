// Status Monitor for S Shop LK
// This script helps monitor API calls and rate limiting status

window.StatusMonitor = {
    stats: {
        totalFirebaseCalls: 0,
        successfulCalls: 0,
        failedCalls: 0,
        rateLimitHits: 0,
        lastCallTime: 0,
        averageResponseTime: 0
    },
    
    // Track API call
    trackCall: function(apiName, startTime) {
        this.stats.totalFirebaseCalls++;
        this.stats.lastCallTime = startTime;
        
        console.log(`[StatusMonitor] ${apiName} call initiated at ${new Date(startTime).toLocaleTimeString()}`);
    },
    
    // Track successful call
    trackSuccess: function(apiName, responseTime) {
        this.stats.successfulCalls++;
        this.updateAverageResponseTime(responseTime);
        
        console.log(`[StatusMonitor] ${apiName} call successful in ${responseTime}ms`);
    },
    
    // Track failed call
    trackFailure: function(apiName, error, responseTime) {
        this.stats.failedCalls++;
        this.updateAverageResponseTime(responseTime);
        
        console.warn(`[StatusMonitor] ${apiName} call failed after ${responseTime}ms:`, error);
    },
    
    // Track rate limit hit
    trackRateLimit: function(apiName) {
        this.stats.rateLimitHits++;
        console.warn(`[StatusMonitor] Rate limit hit for ${apiName}`);
    },
    
    // Update average response time
    updateAverageResponseTime: function(responseTime) {
        const total = this.stats.successfulCalls + this.stats.failedCalls;
        this.stats.averageResponseTime = ((this.stats.averageResponseTime * (total - 1)) + responseTime) / total;
    },
    
    // Get current status
    getStatus: function() {
        const successRate = this.stats.totalFirebaseCalls > 0 
            ? ((this.stats.successfulCalls / this.stats.totalFirebaseCalls) * 100).toFixed(1)
            : 0;
            
        return {
            ...this.stats,
            successRate: `${successRate}%`,
            lastCallAgo: this.stats.lastCallTime > 0 
                ? `${Math.round((Date.now() - this.stats.lastCallTime) / 1000)}s ago`
                : 'Never'
        };
    },
    
    // Display status in console
    logStatus: function() {
        const status = this.getStatus();
        console.group('🔍 S Shop LK Status Monitor');
        console.log(`📊 Total Firebase Calls: ${status.totalFirebaseCalls}`);
        console.log(`✅ Successful: ${status.successfulCalls}`);
        console.log(`❌ Failed: ${status.failedCalls}`);
        console.log(`🚫 Rate Limit Hits: ${status.rateLimitHits}`);
        console.log(`📈 Success Rate: ${status.successRate}`);
        console.log(`⏱️  Average Response Time: ${status.averageResponseTime.toFixed(0)}ms`);
        console.log(`🕐 Last Call: ${status.lastCallAgo}`);
        console.groupEnd();
    },
    
    // Reset stats
    resetStats: function() {
        this.stats = {
            totalFirebaseCalls: 0,
            successfulCalls: 0,
            failedCalls: 0,
            rateLimitHits: 0,
            lastCallTime: 0,
            averageResponseTime: 0
        };
        console.log('[StatusMonitor] Statistics reset');
    }
};

// Auto-log status every 5 minutes
setInterval(() => {
    window.StatusMonitor.logStatus();
}, 5 * 60 * 1000);

// Log initial status
console.log('[StatusMonitor] Status monitoring initialized');
console.log('[StatusMonitor] Use StatusMonitor.logStatus() to view current status');
console.log('[StatusMonitor] Use StatusMonitor.resetStats() to reset statistics'); 