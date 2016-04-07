/*!
 * base-task-prompts (https://github.com/node-base/base-task-prompts)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var camelcase = require('camel-case');
var extend = require('extend-shallow');

module.exports = function(app, config) {
  var options = extend({save: false}, config);
  var utils = {};

  utils.confirm = function(msg, a, b) {
    return function(cb) {
      var question = app.questions.get(msg);
      if (!question) {
        var key = camelcase(msg);
        app.confirm(key, msg, options);
      } else {
        key = msg;
      }

      app.ask(key, options, function(err, answers) {
        if (err) return cb(err);
        if (answers[key] === true) {
          app.build(a, cb);
        } else {
          if (typeof b === 'undefined') {
            return cb();
          }
          app.build(b, cb);
        }
      });
    };
  };

  return utils;
};
