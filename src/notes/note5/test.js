(function() {

  var count = 0;

  var timerInterval = setInterval(function() {
    count += 1;
    document.getElementById("jsplayground").innerHTML = count;
  }, 10);

  window.dealloc = function () {
    clearInterval(timerInterval);
  }
}());