module.exports = function max(arr, param) {
  let bid = arr[0][param];
  //console.log("starting bid", bid);
  
  while (arr.some(o => o[param] > bid)) {
    arr = arr.filter(o => o[param] > bid);
    bid = arr[0][param];
  }
  
  return {
    param: param,
    max: bid,
    maxarr: arr.filter(o => o[param] === bid)
  }
}