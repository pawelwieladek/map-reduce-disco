var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var { List } = require("immutable");

var Datasets = require("./datasets");

class Generator {
  static create(payload, time, options) {
    List(Datasets.nodeIp).forEach(nodeIp => {
      var logs = payload.logs(nodeIp, time.year(), time.month(), time.date(), time.hour(), time.minute());
      var template = _.template("logs-${datetime}-node-${nodeIp}.txt");
      var filename = template({
        datetime: time.format("YYYY-MM-DD-HH-mm"),
        nodeIp: nodeIp
      });

      if (options.verbose) {
        console.log({
          filename: filename,
          hour: time.hour(),
          minute: time.minute(),
          size: logs.size
        });
      }

      fs.writeFileSync(path.join(__dirname, "../target/", filename), logs.join("\n"));
    });
  }
}

module.exports = Generator;
