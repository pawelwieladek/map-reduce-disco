var moment = require("moment");
describe("Payload", function() {
  var Payload = require("../src/payload");
  describe("Value", function() {
    it("default", function() {
      var payload = new Payload();
      expect(payload.repeats(moment({ hour: 22 }))).to.equal(1);
      expect(payload.repeats(moment({ hour: 10 }))).to.equal(0);
    });
    it("specific", function() {
      var payload = new Payload({ min: 10, max: 20 });
      expect(payload.repeats(moment({ hour: 22 }))).to.equal(20);
      expect(payload.repeats(moment({ hour: 10 }))).to.equal(10);
    });
  });
  describe("Generate", function() {
    it("Case 1", function() {
      var payload = new Payload({ min: 10, max: 20 });
      var now = moment({ hour: 22 });
      expect(payload.timestamps(now).size).to.equal(20);
    });
  });
});
