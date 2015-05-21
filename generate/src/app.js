var fs = require("fs");
var path = require("path")
var moment = require("moment");
var stdio = require("stdio");

var Payload = require("./payload");

var options = stdio.getopt({
    "file": {
      args: 1,
      description: "Generated input file name",
      mandatory: true
    },
    "max": {
      args: 1,
      description: "Maximum number of generated logs",
      default: 40
    },
    "min": {
      args: 1,
      description: "Minimum number of generated logs",
      default: 20
    },
    "verbose": {
      key: "v",
      description: "Show console logs"
    }
});

var payload = new Payload({
  max: options.max,
  min: options.min
});

var now = moment();
var logs = payload.logs(now.year(), now.month(), now.date(), now.hour(), now.minute());
var filename = path.join(__dirname, "../target/" + options.file);
if (options.verbose) {
  console.log("File");
  console.log(filename);
  console.log("Logs");
  console.log({ hour: now.hour(), minute: now.minute(), size: logs.size });
}

var stream = fs.createWriteStream(filename);
stream.once("open", function(fd) {
  logs.forEach((log, index) => {
    stream.write(log.toString() + "\n");

    if (options.verbose) {
      if (index % 1000 === 0) process.stdout.write(".");
    }
  });

  if (options.verbose) {
    process.stdout.write("\n");
  }

  stream.end();
});
