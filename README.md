express-i18n
============

I18n Helper for Express. It uses https://github.com/fnando/i18n-js and YAML files.

usage
=====

As a middleware:
  var i18n = require('express-i18n');
  
  // those are default options
  var options = {
    'default': 'en', // default locale
    'dir': 'locales' // translations path
  }
    
  app.use(i18n(options));
  
Then `res.locals.I18n` will be available (see https://github.com/fnando/i18n-js for references)
