const calcmax = require('./max.js');
const nums = {
  oneMethod: function(w) {return w.methods === 1},
  onlyVars: function(w) {return !w.method && !w.unmethod},
  onlyBegin: function(w) {return w.middle === 0},
  onlyMiddle: function(w) {return w.beginning === 0},
  repeats: function(w) {return w.methods < w.middle + w.beginning},
  punctuation: function(w) {return /[^\w]/.test(w.word)},
  numbers: function(w) {return /\d/.test(w.word)},
}
const aptests = [{trigger: /'s$/, subs: ""}, {trigger: /s'$/, subs: "'s"}];
const numwords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety", "hundred", "thousand"];
const classes = ['Bob', 'Place', 'Delight', 'Surprise', 'Alliance', 'Hybrid', 'Differential', 'Principle'];
const sNames = ["Singles", "Minimus", "Doubles", "Minor", "Triples", "Major", "Caters", "Royal", "Cinques", "Maximus", "Sextuples", "Septuples"]

module.exports = function worddata(words) {
  //console.log("sorting words");
  //words.sort((a,b) => {})
  console.log("analyzing words");
  let results = {
    nums: {},
    ap1: [],
    ap2: [],
    endS: [],
    little: words.find(o => o.word === "Little").methods,
    classwords: 0,
    sNames: 0,
    punctuation: []
  }
  let arrs = {
    punctuation: [],
    repeats: []
  }
  classes.forEach(cl => {
    let ww = words.find(w => w.word === cl);
    if (ww) results.classwords += ww.methods;
  });
  sNames.forEach(sn => {
    let ww = words.find(w => w.word === sn);
    if (ww) results.sNames += ww.methods;
  });
  let max = calcmax(words, "methods");
  results.max = max.max;
  results.maxword = max.maxarr.map(w => w.word);
  let longest = calcmax(words.filter(w => w.word.length > 10).map(w => {return {word: w.word, l: w.word.length}}), "l");
  results.longest = longest.maxarr.length > 1 ? longest.maxarr.map(w => w.word) : longest.maxarr[0].word;
  
  for (let key in nums) {
    let arr = words.filter(nums[key]).map(w => w.word);
    results.nums[key] = arr.length;
    if (arrs[key]) {
      arrs[key] = arr;
    }
  }
  results.repeats = arrs.repeats;
  let punctuation = [];
  arrs.punctuation.map(w => w.replace(/\w/gi, "").split("").forEach(p => {
    punctuation.push(p);
  }));
  do {
    results.punctuation.push(punctuation[0]);
    punctuation = punctuation.filter(p => !results.punctuation.includes(p));
  } while (punctuation.length > 0);
  
  let apostrophes = [], endS = [], capitals = [];
  arrs.punctuation.forEach(w => {
    if (/'/.test(w)) apostrophes.push(w);
  });
  
  words.forEach((w, i) => {
    if (i%100 === 0) console.log(i);
    if (/[^']s$/.test(w.word)) endS.push(w.word);
    let test = words.filter(ww => ww.word.length === w.word.length && ww.word.toLowerCase() === w.word.toLowerCase()).map(ww => ww.word);
    if (test.length > 1) {
      let prev = capitals.find(arr => test.some(tw => arr.includes(tw)));
      if (!prev) {
        capitals.push(test);
      }
    }
  });
  
  console.log("apostrophes");
  apostrophes.forEach(apw => {
    let apt = aptests.find(o => o.trigger.test(apw));
    let tests = [apw.replace(/'/g, "")];
    if (apt) tests.push(apw.replace(apt.trigger, apt.subs));
    tests.forEach((t,i) => {
      let match = words.find(w => w.word === t);
      if (match) {
        let pmatch = results.ap2.find(a => a.includes(t));
        if (pmatch) {
          pmatch.push(apw);
        } else {
          results.ap2.push([t, apw]);
        }
      } else if (i > 0) {
        results.ap1.push(apw);
      }
    });
    
  });
  
  console.log("s at end");
  endS.forEach(w => {
    if (words.find(o => o.word === w.slice(0, -1))) {
      results.endS.push(w.slice(0, -1));
    }
  });
  results.capitals = capitals;
  
  return results;
}