var EventEmitter = require('events').EventEmitter;
var util = require("util");
var Konami = require('konami-js');

var Cheat = function() {
  var self = this;
  var konami = new Konami(function() {
    self.executed();
  });
};

util.inherits(Cheat, EventEmitter);

Cheat.prototype.executed = function() {
  this.emit("executed");
};

var cheat = new Cheat();
module.exports = cheat;