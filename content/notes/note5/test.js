var count = 0;

setInterval(function () {
  count += 1;
  document.getElementById("jsplayground").innerHTML = count;
}, 10);