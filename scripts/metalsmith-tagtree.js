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

    // override defaults from options
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

      // tags file meta encountered...
      for (var i = 0; i < fileTags.length; i++) {
        if (_.isUndefined(_tags[fileTags[i].toLowerCase()]) === true) {
          // new _tags.tagname = []
          _tags[fileTags[i].toLowerCase()] = [];
        }

        // add file to _tags.tagname array
        _tags[fileTags[i].toLowerCase()].push(files[file]);
      }

    });

    var metaObj = metalsmith.metadata();

    if (_.isUndefined(metaObj[globalMetaKey]) === true) {
      metaObj[globalMetaKey] = _tags;
    } else {
      console.error("cannot add global key " + globalMetaKey + " already exists");
    }

    if (_.isUndefined(metaObj[sortedMetaKey]) === true) {
      metaObj[sortedMetaKey] = sortedTagsArray(_tags);
    } else {
      console.error("cannot add sorted key " + sortedMetaKey + " already exists");
    }

    // console.log(metalsmith.metadata());

    // reappend global metadata...
    metalsmith.metadata(metaObj);
  };
}

function sortedTagsArray(_tags) {
  var sortedTags = [];
  var tags = _.keys(_tags);
  var index = 0;

  _.each(tags, function(tag) {

    // get index to insert alphabetically
    index = _.sortedIndex(sortedTags, {
      tag: tag
    }, "tag");

    // insert there...
    sortedTags.splice(index, 0, {
      tag: tag,
      children: _tags[tag]
    });

  });

  return sortedTags;
}