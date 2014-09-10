var _ = require("lodash");

module.exports = function() {
  if (_.isUndefined(window.dealloc) === false) {
    try {
      window.dealloc();
      window.dealloc = undefined;
    } catch (e) {
      console.error("stopPageScripts: could not dealloc previous running script! error:" + e);
    }
  }
};