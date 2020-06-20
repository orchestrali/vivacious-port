const fs = require('fs');
const headers = [`<!DOCTYPE html>
<html>
  <head>
    <title>Method name word data</title>
    <meta name="description" content="A cool thing made with Glitch">
    <link id="favicon" rel="icon" href="https://glitch.com/edit/favicon-app.ico" type="image/x-icon">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <div id="container">
`,
  `    </div>
<script src="https://code.jquery.com/jquery-2.2.1.min.js"
            integrity="sha256-gvQgAFzTH6trSrAWoH1iPo9Xc96QxSZ3feW6kem+O00="
            crossorigin="anonymous"></script>
  <script src="/worddata.js"></script>
  <script src="/sortable.js"></script>
  </body>
</html>`];

const nums = {
  oneMethod: "In only one method name",
  onlyVars: "Only in variation(s), not methods",
  onlyBegin: "Only at name beginnings",
  onlyMiddle: "Only after at least one other word",
  repeats: "Occurs more than once in the same name",
  punctuation: "Includes punctuation",
  numbers: "Includes digits"
}

const stats = {longest: "Longest word", maxword: "Word(s) appearing in the most methods", max: "Max number of methods a single word appears in", little: "Number of methods including 'Little'", classwords: "Number of methods with a class word in their name", sNames: "Number of methods with a stage name in their name"};

const lists = {ap1: "Words only appearing with apostrophe", ap2: "Words appearing with and without apostrophe", endS: "Words also appearing with an 's' added to the end", capitals: "Words appearing with varying upper/lowercase configurations", punctuation: "Punctuation"}

module.exports = function buildpage(data) {
  console.log("building word page");
  let numtable = `<table id="numbers"><thead><tr><th colspan="2">Number of words meeting various conditions</th></tr></thead>
`;
  for (let key in nums) {
    numtable += `<tr><td class="left">${nums[key]}:</td><td>${data.nums[key]}</td></tr>
`;
  }
  numtable += `</table>
`;
  
  let stattable = `<table id="stats">
`;
  for (let key in stats) {
    stattable += `<tr><td class="left">${stats[key]}:</td><td>${Array.isArray(data[key]) ? '<p>'+data[key].join('</p><p>')+'</p>' : data[key]}</td></tr>
`;
  }
  stattable += `</table>
`;
  
  let listtables = ``;
  for (let key in lists) {
    listtables += `<div class="list-head">${lists[key]}</div>
<div class="table"><table id="${key}" class="list">
`
    
    data[key].forEach(e => {
      if (key === "ap2" || key === "capitals") {
        listtables += `<tr><td>${e.join('</td><td>')}</td></tr>
`;
      } else {
        listtables += `<tr><td>${e}</td></tr>
`;
      }
    });
    listtables += `</table></div>
`;
  }
  
  
  fs.writeFileSync('views/worddata.html', headers[0]+numtable+stattable+listtables+headers[1]);
  console.log("done");
  return;
}