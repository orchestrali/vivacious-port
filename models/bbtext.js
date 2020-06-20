var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bbtextschema = new Schema({
  bbNum: Number,
  association: String,
  location: {
    doveUrl: String,
    place: String,
    region: String,
    address: String,
  },
  date: String,
  time: String,
  pealSpeed: String,
  tenor: String,
  changes: Number,
  title: String,
  titleExtra: String,
  details: String,
  compUrl: String,
  attribution: String,
  ringers: [{
    bell: String,
    name: String,
    conductor: Boolean
  }],
  bells: String,
  footnote: String,
  events: [{
    url: String,
    name: String
  }],
  methods: [String],
  variations: [String]
});

module.exports = mongoose.model('bbtext', bbtextschema);