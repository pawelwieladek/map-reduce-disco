var { Record, List, Range } = require("immutable");
var chance = require("chance").Chance();
var moment = require("moment");
var Log = require("./log");

var milisecsInDay = moment.duration({ hours: 24 });

var PayloadRecord = Record({
  range: 5,
  peak: 22,
  minimum: 0,
  amplitude: 1,
  tolerance: 0
});

class Payload extends PayloadRecord {

  get milisecsFromPeak() {
    return moment.duration({ hours: this.peak });
  }

  repeats(time) {
    var currentMilisecs = moment.duration({ hours: time.hour(), minutes: time.minute()});
    var x = 2 * Math.PI * (currentMilisecs - this.milisecsFromPeak) / milisecsInDay;
    return this.amplitude * Math.cos(x) + (this.minimum + this.amplitude);
  }

  timestamps(year, month, day) {
    return Range(0, 24).map(hour => {
      return Range(0, 60, this.range).map(min => {
        var time = moment({
          year: year,
          month: month,
          day: day,
          hour: hour,
          minute: min
        });
        return Range(0, this.repeats(time)).map(() => {
          var timestamp = chance.integer({
            min: time.unix(),
            max: time.add({ minutes: this.range }).unix()
          });
          return timestamp;
        });
      })
    }).flatten().toList();
  }

  logs(year, month, day) {
    return this.timestamps(year, month, day).map(timestamp => {
      return Log.create(timestamp);
    });
  }
}

module.exports = Payload;
