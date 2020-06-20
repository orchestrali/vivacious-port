const find = require('../mongoose/findFields.js');
const layout = require('./layout.js');
var keys = ["bbNum", "date"]
module.exports = function getrecords(start, end, cb) {
  let q = {
    query: {bbNum: {$gte: Number(start), $lte: Number(end)}},
    fields: "title changes titleExtra details date methods variations bbNum"
  }
  find("method", {query: {}, fields: "title ccNum"}, (mm) => {
    find("bbtext", q, (arr) => {
      let arr2 = []
      arr.forEach(p => {
        let text = {bbNum: p.bbNum, date: p.date};
        let pieces = [p.changes, p.title, p.titleExtra].filter(e => e && e != "");
        text.titleFull = pieces.join(" ");
        if (p.methods) {
          text.methods = p.methods.map(m => {return {title: m, complib: mm.find(e => e.title === m).complib}});
        }
        if (p.variations) {
          text.variations = p.variations.map(v => {return {title: v}});
        }
        if (p.details) text.details = p.details;
        arr2.push(text);
      });
      cb(layout(arr2));
    });
  });
  
  
}