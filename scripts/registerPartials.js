// register Handlebars partials
// via http://stackoverflow.com/questions/8059914/express-js-hbs-module-register-partials-from-hbs-file

module.exports = registerPartials;

function registerPartials(directory) {
  var Handlebars = require('handlebars');
  var fs = require('fs');

  var partialsDir = __dirname + "/../" + directory;

  var filenames = fs.readdirSync(partialsDir);

  filenames.forEach(function(filename) {
    var matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    var name = matches[1];
    console.log(name);
    var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    Handlebars.registerPartial(name, template);
  });
}