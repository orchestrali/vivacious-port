//const connect = require('../mongoose/connect.js');
const find = require('../mongoose/find.js');
const data = require('./data.js');
const data2 = require('./data2.js');
const includes = require('./includes.js');
const buildpage = require('./buildpage.js');

module.exports = function router(num) {
  let q = {
    word: {$regex: "^\w+$"},
    methods: 1
  }
  console.log("finding words");
  find("word", q, (words) => {
    //buildpage(data(words));
    includes(words, num);
  });
  
}