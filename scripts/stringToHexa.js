// http://stackoverflow.com/questions/3745666/how-to-convert-from-hex-to-ascii-in-javascript
module.exports = function stringToHexa(str) {
  var arr = [];
  for (var i = 0, l = str.length; i < l; i ++) {
    var hex = Number(str.charCodeAt(i)).toString(16);
    arr.push(hex);
  }
  return arr.join('');
};