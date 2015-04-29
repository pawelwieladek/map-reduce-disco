var { Record, List, Map } = require("immutable");
var chance = require("chance").Chance();

var Datasets = require("./datasets");

var LogRecord = Record({
  nodeIp: "",
  timestamp: "",
  provider: "",
  clientIp: "",
  originServer: "",
  sessionId: "",
  channel: "",
  qualityId: "",
  fragmentId: "",
  userAgent: "",
  totalBytesSent: "",
  bytesSentFromCache: ""
});

class Log extends LogRecord {
  static create(timestamp) {
    var totalBytesSent = chance.integer({
      min: 1024,
      max: 2097152
    });
    var bytesSentFromCache = chance.integer({
      min: 0,
      max: totalBytesSent
    });
    var provider = chance.pick(Map(Datasets.provider).valueSeq().toJS());
    var channel = chance.pick(Map(Datasets.channel).get(provider));
    return new Log({
      nodeIp: chance.pick(Datasets.nodeIp),
      timestamp: timestamp,
      provider: provider,
      clientIp: chance.ip(),
      originServer: chance.pick(Datasets.originServer),
      sessionId: chance.hash(),
      channel: channel,
      qualityId: chance.integer({ min: 0, max: 20 }),
      fragmentId: chance.integer({ min: 0, max: 500 }),
      userAgent: chance.pick(Datasets.userAgent),
      totalBytesSent: totalBytesSent,
      bytesSentFromCache: bytesSentFromCache
    });
  }

  get url() {
    return List([
      this.originServer,
      this.sessionId,
      this.channel,
      this.qualityId,
      this.fragmentId
    ]).join("/");
  }

  toString() {
    return List([
      this.nodeIp,
      this.timestamp,
      this.provider,
      this.clientIp,
      this.url,
      this.userAgent,
      this.totalBytesSent,
      this.bytesSentFromCache
    ]).join("\t");
  }
}

module.exports = Log;
