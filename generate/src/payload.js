var { Record, List, Range } = require("immutable");
var Chance = require("chance");
var moment = require("moment");
var Log = require("./log");

var milisecsInDay = moment.duration({ hours: 24 });

var PayloadRecord = Record({
  minutes: 5,
  peakHour: 22,
  min: 0,
  max: 1,
  tolerance: 0
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Payload extends PayloadRecord {

  get milisecsFromPeak() {
    return moment.duration({ hours: this.peakHour });
  }

  repeats(time) {
    var currentMilisecs = moment.duration({ hours: time.hour(), minutes: time.minute()});
    var x = 2 * Math.PI * (currentMilisecs - this.milisecsFromPeak) / milisecsInDay;
    var repeats = Math.round((this.max - this.min) * Math.pow(Math.cos(x / 2), 2) + this.min);
    return getRandomInt(repeats - this.tolerance, repeats + this.tolerance);
  }

  timestamps(time) {
    var chance = new Chance();
    return Range(0, this.repeats(time)).map(() => {
      var timestamp = chance.integer({
        min: time.unix(),
        max: time.add({ minutes: this.minutes }).unix()
      });
      return timestamp;
    });
  }

  logs(nodeIp, year, month, day, hour, minute) {
    var time = moment({
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute
    });
    return this.timestamps(time).map(timestamp => {
      return Log.create(nodeIp, timestamp);
    });
  }
}

module.exports = Payload;
