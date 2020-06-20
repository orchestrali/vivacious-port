var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var performanceSchema = new Schema({
  method: String,
  date: String,
  location: {
    room: String,
    building: String,
    address: String,
    town: String,
    county: String,
    region: String,
    country: String
  },
  numberOfChanges: Number,
  type: String,
  society: String,
  conductor: String,
  bbNum: Number
});

performanceSchema
.virtual('bblink')
.get( function() {
  return 'https://bb.ringingworld.co.uk/view.php?id=' + this.bbNum;
});

module.exports = mongoose.model('oldPerformance', performanceSchema);