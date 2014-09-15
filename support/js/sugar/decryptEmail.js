function decryptEmail() {

  $("a[data-email]").on("click", function(e) {
    var $item = $(this);
    var email = "";

    if ($item.attr("data-emaildecrypted") === "false") {
      e.preventDefault();
      // console.log("decrypt email");
      email = hexaToString($(this).data("email"));
      $item.attr("href", "mailto:" + email);
      $item.attr("data-emaildecrypted", "true");
      if ($item.attr("data-emailexchangetext") === "true") {
        $item.text(email);
      }
      window.location.href = "mailto:" + email;
    }
  });

}

function hexaToString(hexx) {
  var hex = hexx.toString(); //force conversion
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

module.exports = decryptEmail;