var _ = require("lodash");

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin build a global tag tree in _tags (or other)
 *
 * @return {Function}
 */

function plugin(options) {
  return function(files, metalsmith, done) {
    setImmediate(done);

    var globalMetaKey = "_tags";
    var sortedMetaKey = "_sortedTags";
    var fileMetaKey = "tags";
    var _tags = {};

    if (_.isUndefined(options) === false) {
      if (_.isUndefined(options.globalMetaKey) === false) {
        globalMetaKey = options.globalMetaKey;
      }
      if (_.isUndefined(options.fileMetaKey) === false) {
        fileMetaKey = options.fileMetaKey;
      }
      if (_.isUndefined(options.sortedMetaKey) === false) {
        sortedMetaKey = options.sortedMetaKey;
      }
    }

    Object.keys(files).forEach(function(file) {
      var fileTags = files[file][fileMetaKey];

      if (_.isUndefined(fileTags) === true) {
        return;
      }

      for (var i = 0; i < fileTags.length; i++) {
        if (_.isUndefined(_tags[fileTags[i].toLowerCase()]) === true) {
          _tags[fileTags[i].toLowerCase()] = [];
        }

        _tags[fileTags[i].toLowerCase()].push(files[file]);
      }

    });

    // link tags to metalsmith global meta...
    metalsmith.data[globalMetaKey] = _tags;
    metalsmith.data[sortedMetaKey] = sortedTagsArray(_tags);
  };
}

function sortedTagsArray(_tags) {
  var sortedTagNames = [];
  var sortedTags = [];
  var tags = _.keys(_tags);
  var index = 0;

  _.each(tags, function(tag) {
    index = _.sortedIndex(sortedTagNames, tag);
    sortedTagNames.splice(index, 0, tag);
    sortedTags.splice(index, 0, {
      tag: tag,
      children: _tags[tag]
    });
  });

  return sortedTags;
}