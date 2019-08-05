const config = {
  GLOBAL: {
    format: (str) => `\x1B[1m${str}\x1B[0m`,
    
    time: (str) => `\x1B[90m${str}\x1B[0m`,
    
    INFO: {
      message: (str) => `\x1B[97m${str}\x1B[0m`
    },
    
    NOTICE: {
      message: (str) => `\x1B[96m${str}\x1B[0m`
    },
        
    LOG: {
      message: (str) => `\x1B[92m${str}\x1B[0m`
    },
    
    ALERT: {
      message: (str) => `\x1B[91m${str}\x1B[0m`
    },
      
    WARNING: {
      message: (str) => `\x1B[93m${str}\x1B[0m`
    },
      
    ERROR: {
      message: (str) => `\x1B[31m${str}\x1B[0m`
    },
    
    EMERGENCY: {
      message: (str) => `\x1B[35m${str}\x1B[0m`
    },
    
    CRITICAL: {
      message: (str) => `\x1B[95m${str}\x1B[0m`
    },
      
    DEBUG: {
      message: (str) => `\x1B[90m${str}\x1B[0m`
    }
  }
};

module.exports = config;