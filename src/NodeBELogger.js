const { Console } = require("console");

const config = require("./configs/config.js");
const colors = require("./modules/colors.js");

const util = require("util");
const moment = require("moment");

class NodeBELogger extends Console {
  constructor() {
    super(process.stdout, process.stderr);
    
    this.debugLevel = 0;
  }
  
  setColor(clr) {
    return util.format(colors.ESCAPE, clr);
  }
  
  getTimestamp() {
    return moment().format("YYYY-MM-DD HH:mm:ss");
  }
  
  static parseData(data) {
    if(typeof data === "string") {
      return data;
    } else if(Array.isArray(data)) {
      return data.map(NodeBELogger.parseData).join("\n");
    } else if(typeof data === "object" && data !== null) {
      return util.inspect(data, {
        depth: 0,
        colors: true
      })
    } else if(typeof data === "Error") {
      return data.stack || data.message || String(data);
    } else {
      return "DATA PARSING ERROR!";
    }
    return String(data);
  }
  
  _writeLog(data, dataType = "LOG") {
    data = NodeBELogger.parseData(data);
    dataType = dataType.toUpperCase();
    
    const format = config.GLOBAL["format"];
    
    const time = config.GLOBAL["time"];
    const { message } = config.GLOBAL[dataType];
    
    const timestamp = time(`(${this.getTimestamp()})`);
    
    const frmt = format(`[ ${dataType} ]`);
    
    super.log(`${frmt} ${timestamp}\n` + data.split("\n").map(str => `>>> ${message(str)}`).join("\n"));
  }
  
  info(...data) {
    this._writeLog(data, "INFO");
  }
  
  notice(...data) {
    this._writeLog(data, "NOTICE");
  }
  
  log(...data) {
    this._writeLog(data, "LOG");
  }
  
  alert(...data) {
    this._writeLog(data, "ALERT");
  }
  
  warning(...data) {
    this._writeLog(data, "WARNING");
  }
  
  error(...data) {
    this._writeLog(data, "ERROR");
  }
  
  emergency(...data) {
    this._writeLog(data, "EMERGENCY");
  }
    
  critical(...data) {
    this._writeLog(data, "CRITICAL");
  }
  
  debug(...data) {
    if (this.debugLevel >= 1) {
      this._writeLog(data, "DEBUG");
    }
  }
    
  getDebugLevel(v) {
    return this.debugLevel;
  }
  
  setDebugLevel(v) {
    this.debugLevel = v;
  }
}

module.exports = NodeBELogger;