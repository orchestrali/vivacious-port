const fs = require('fs');
const s = require('stream');

module.exports = function analyze(words, num) {
  let searches = words.filter(w => w.word.length === num).sort((a,b)=> {return a.word.localeCompare(b.word)});
  let long = words.filter(w => w.word.length > num);
  
  let matches = [];
  searches.forEach(s => {
    let filter = long.filter(w => w.word.toLowerCase().includes(s.word.toLowerCase()));
    if (filter.length > 0) {
      matches.push([s.word].concat(filter.map(w => w.word)));
    }
  });
  console.log("piping stream");
  let stream = new s.Readable();
  stream.push(JSON.stringify(matches, null, 2));
  stream.push(null);
  stream.pipe(fs.createWriteStream('data/includes.json'));
  console.log("done");
  return;
  
}