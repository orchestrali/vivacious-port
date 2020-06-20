const escape = [".", "(", ")", "?"];
const fs = require('fs');
const s = require('stream');

module.exports = function analyze(words, num) {
  let first = words.filter(w => w.word.length === num);
  let long = words.filter(w => w.word.length === num+1);
  console.log("second array length: ", long.length);
  
  let test = function (w) {
    let chars = w.split("").map(c => {return escape.includes(c) ? "\\"+c : c});
    return "^"+chars[0] + chars.slice(1).join("?") + "$";
  }
  let matches = []
  long.forEach(o => {
    if (!matches.find(a => a.includes(o.word))) {
      let match = first.filter(wo => RegExp(test(o.word)).test(wo.word));
      if (match.length > 0) {
        let prev = matches.find(a => match.some(obj => a.includes(obj.word)));
        if (prev) {
          prev.push(o.word);
          match.forEach(m => {if (!prev.includes(m.word)) prev.push(m.word)});
        } else {
          matches.push([o.word].concat(match.map(m => m.word)));
        }
        
      }
    }
    
  });
  console.log("piping stream");
  let stream = new s.Readable();
  stream.push(JSON.stringify(matches, null, 2));
  stream.push(null);
  stream.pipe(fs.createWriteStream('data/similar.json'));
  console.log("done");
  return;
}