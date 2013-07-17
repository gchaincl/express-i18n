var fs   = require('fs'),
    _    = require('underscore')._,
    yaml = require('yamljs'),
    I18n = require('./lib/i18n');

module.exports = function(options) {
  var options = _.extend({
    'default': 'en',
    'path'   : './locales/'
  }, options);
  options.path = process.cwd() + '/' + options.path;
  
  var loadTranslation = function(file) {
    // files should be formated like 'filename.<LOCALE>.yml'
    var match = file.match(/.(\w+)\.yml?/);
    if (null === match || !match[1])
      return;

    var t = yaml.load(file);
    if(t)
      I18n.translations[match[1]] = t;
  };

  var load = function() {
    I18n.translations = {};
    if (false === fs.existsSync(options.path))
      return false;

    var files = fs.readdirSync(options.path);
    _.each(files, function(file) {
      loadTranslation(options.path + '/' + file);
    });
  }
  load();
  
  return function(req, res, next) {
    res.locals.I18n = I18n;
    next();
  };
};
