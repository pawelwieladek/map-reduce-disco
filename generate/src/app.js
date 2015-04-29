var fs = require("fs");
var moment = require("moment");
var Payload = require("./payload");

var now = moment();
var payload = new Payload();
var logs = payload.logs(now.year(), now.month(), now.date());

var stream = fs.createWriteStream("target/input-" + now.format("YYYY-MM-DD") + ".txt");
stream.once("open", function(fd) {
  logs.forEach(log => stream.write(log.toString() + "\n"));
  stream.end();
});
