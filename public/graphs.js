

$(function() {
  console.log("hello");
  
  var anychart = window.anychart;
  
  
  var chart = anychart.column();
  $("#butt").click(function() {
    //console.log($("#query").val());
    let q = $("#query").val().split("; ");
    let minyear = $("#minyear").val();
    
    var res = [];
    req(0);
    
    function req(i) {
      let arr = [{$match: {$or: [{methods: q[i]}, {variations: q[i]}]}}, {$group: {_id: {$toInt: {$substrCP: ["$date", 0, 4]}}, count: {$sum: 1}}}, {$sort: {_id: 1}}]
      if (minyear && minyear != "") {
        arr[0].$match.$expr = {$gte: [{$toDate: "$date"}, {$toDate: minyear+"-01-01"}]}};
      let query = {mod: "bbtext", arr: arr};
      
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/agg', true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(query));
      
      xhr.onload = function () {
        res.push(JSON.parse(xhr.responseText));
        i++;
        if (i < q.length) {
          req(i);
        } else {
          draw();
        }
      }
      
    }
    
    function draw() {
      var chartData = {
        title: "Method Performance",
        header: ["#"],
        rows: []
      };
      let years = []
      res.forEach((arr, i) => {
        chartData.header.push(q[i]);
        arr.forEach(r => {
          if (!years.includes(r._id)) {
            years.push(r._id);
          }
        });
      });
      chartData.rows = years.sort((a,b) => a-b).map(y => [y]);
      
      for (let row = 0; row < chartData.rows.length; row++) {
        res.forEach(arr => {
          let prev = arr.find(r => r._id === chartData.rows[row][0]);
          if (prev) {
            chartData.rows[row].push(prev.count);
          } else {
            chartData.rows[row].push(0);
          }
        });
      }

      chart.data(chartData);
      chart.legend()
        .enabled(true)
        .fontSize(13)
        .padding([0, 0, 20, 0]);
      chart.container('container');
      chart.draw();
      
    }
    
  });
  
  var yearchart = anychart.pie();
  $("#yearbutt").click(function () {
    let year = $("#year").val();
    console.log(year);
    let check = [];
    if ($("#methods").prop("checked") || $("#both").prop("checked")) check.push("methods");
    if ($("#variations").prop("checked") || $("#both").prop("checked")) check.push("variations");
    if (year && year != "") {
      console.log("aggregating");
      let arr = [
        {$match: {date: {$regex: "^"+year}}}
      ];
      if (check.length === 2) {
        arr[0].$match.$or = [{methods: {$exists: true}}, {variations: {$exists: true}}];
        arr.push({$project: {titles: {$concatArrays: [{$ifNull: ["$methods", []]}, {$ifNull: ["$variations", []]}]}}});
      } else {
        arr[0].$match[check[0]] = {$exists: true};
      }
      let field = check.length === 2 ? "$titles" : "$" + check[0];
      arr.push({$unwind: {path: field, preserveNullAndEmptyArrays: false}});
      arr.push({$group: {_id: field, count: {$sum: 1}}});
      arr.push({$sort: {count: -1}});
      
      let query = {mod: "bbtext", arr: arr};
      
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/agg', true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(query));
      
      xhr.onload = function () {
        let max = Number($("#num").val()) > 0 ? Number($("#num").val()) : 5;
        let data = [];
        let res = JSON.parse(xhr.responseText);
        for (let i = 0; i < res.length; i++) {
          if (i < max) {
            data.push({x: res[i]._id, value: res[i].count});
          } else if (i === max) {
            data.push({x: "Other", value: res[i].count});
          } else {
            data[data.length-1].value += res[i].count;
          }
        }
        
        yearchart.data(data);
        yearchart.container('pie-container');
        yearchart.draw();
        
      }
      
    }
    
    
    
    
  });
  
  
});