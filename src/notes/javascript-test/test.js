(function() {

  var test = {};

  test.count = 0;

  test.timerInterval = setInterval(function() {
    test.count += 1;
    document.getElementById("jsplayground").innerHTML = test.count;
  }, 10);

  window.dealloc = function () {
    clearInterval(test.timerInterval);
    test = null;
  };
}());