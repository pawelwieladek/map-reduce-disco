var fs = require("fs");
var path = require("path")
var moment = require("moment");
var Payload = require("./payload");

var payload = new Payload({
  amplitude: 4000,
  minimum: 500
});

var now = moment();
var logs = payload.logs(now.year(), now.month(), now.date(), now.hour(), now.minute());
var filename = path.join(__dirname, "../target/generated-" + now.format("YYYY-MM-DD-HH-mm") + ".txt");
var content = logs.join("\n");
console.log({ hour: now.hour(), minute: now.minute(), size: logs.size });
fs.writeFile(filename, content, function(err) {
  if (err) throw err;
});
