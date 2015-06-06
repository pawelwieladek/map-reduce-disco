var moment = require("moment");
var stdio = require("stdio");

var Payload = require("./payload");
var Generator = require("./generator");

var options = stdio.getopt({
  "max": {
    key: "M",
    args: 1,
    description: "Maximum number of generated logs",
    default: 1000
  },
  "min": {
    key: "m",
    args: 1,
    description: "Minimum number of generated logs",
    default: 500
  },
  "tolerance": {
    key: "t",
    args: 1,
    description: "Tolerance",
    default: 10
  },
  "verbose": {
    key: "v",
    description: "Show console logs"
  }
});

var payload = new Payload({
  max: parseInt(options.max),
  min: parseInt(options.min),
  tolerance: parseInt(options.tolerance)
});

var time = moment();

Generator.create(payload, time, options);
