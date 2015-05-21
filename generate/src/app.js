var fs = require("fs");
var path = require("path")
var moment = require("moment");
var Payload = require("./payload");

var payload = new Payload({
  max: 40,
  min: 20
});

var now = moment();
var logs = payload.logs(now.year(), now.month(), now.date(), now.hour(), now.minute());
var filename = path.join(__dirname, "../target/generated-" + now.format("YYYY-MM-DD-HH-mm") + ".txt");
console.log(filename);
console.log({ hour: now.hour(), minute: now.minute(), size: logs.size });

var stream = fs.createWriteStream(filename);
stream.once("open", function(fd) {
  logs.forEach((log, index) => {
    stream.write(log.toString());
    if (index % 1000 === 0) process.stdout.write(".");
  });
  process.stdout.write("\n");
  stream.end();
});
