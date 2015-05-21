var { Record, List, Range } = require("immutable");
var chance = require("chance").Chance();
var moment = require("moment");
var Log = require("./log");

var milisecsInDay = moment.duration({ hours: 24 });

var PayloadRecord = Record({
  minutes: 5,
  peakHour: 22,
  min: 0,
  max: 1
});

class Payload extends PayloadRecord {

  get milisecsFromPeak() {
    return moment.duration({ hours: this.peakHour });
  }

  repeats(time) {
    var currentMilisecs = moment.duration({ hours: time.hour(), minutes: time.minute()});
    var x = 2 * Math.PI * (currentMilisecs - this.milisecsFromPeak) / milisecsInDay;
    return Math.round((this.max - this.min) * Math.pow(Math.cos(x / 2), 2) + this.min);
  }

  timestamps(time) {
    return Range(0, this.repeats(time)).map(() => {
      var timestamp = chance.integer({
        min: time.unix(),
        max: time.add({ minutes: this.minutes }).unix()
      });
      return timestamp;
    });
  }

  logs(year, month, day, hour, minute) {
    var time = moment({
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute
    });
    return this.timestamps(time).map(timestamp => {
      return Log.create(timestamp);
    });
  }
}

module.exports = Payload;
