var controller = require("./controller");

require("./consoleErrors");
require("./config");
require("./konamicode");
require("./disclaimer");

$(function($) {
  controller.init();
});