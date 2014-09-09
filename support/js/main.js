var controller = require("./controller");

require("./consoleErrors");
require("./konamicode");
require("./disclaimer");

$(function($) {
  controller.init();
});