const header = `<head><link rel="stylesheet" href="/style.css"></head><body><div id="nums"><label for="start">Start: </label><input id="start" type="number"><label for="end">End: </label><input id="end" type="number"></div><div id="table-container">`

const footer = `</div><script src="sortable.js"></script></body>`
const keys = ["methods", "variations", "unmethods"];
module.exports = function layout(arr) {
  let table = `<table class="sortable" id="bbperfs">
  <thead><tr><td>Num</td><td>Date</td><td>Title</td><td>Methods</td></tr></thead>`
  
  for (let i = 0; i < arr.length; i++) {
    let things = [] //methods.concat(variations).concat(unmethods).join('<br/>');
    keys.forEach(k => {
      if (arr[i][k]) {
        things = things.concat(arr[i][k].map(e => k === "methods" ? `<a href="${e.complib}">`+e.title+`</a>` : e.title));
      }
    });
    
    table += `<tr><td class="right"><a href="https://bb.ringingworld.co.uk/view.php?id=${arr[i].bbNum}">${arr[i].bbNum}</a></td><td>${arr[i].date}</td><td><strong>${arr[i].titleFull}</strong>`;
    if (arr[i].details) table += `<br />${arr[i].details}`;
    table += `</td><td>${things.join('<br/>')}</td></tr>`;
    
  }
  table += "</table>"
  
  return header + table + footer;
}