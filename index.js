/*!
 * task-prompts (https://github.com/node-base/task-prompts)
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

  if (typeof app.task !== 'function') {
    throw new Error('expected base-task to be registered');
  }

  utils.confirm = function(msg, yes, no) {
    return function(cb) {
      if (typeof app.ask !== 'function') {
        cb(new Error('expected base-questions to be registered'));
        return;
      }

      var build = app.build.bind(app);
      if (typeof app.generate === 'function') {
        build = app.generate.bind(app);
      }

      var key = getKey(app, msg, 'confirm');

      app.ask(key, options, function(err, answers) {
        if (err) {
          cb(err);
          return;
        }

        if (answers[key] === true) {
          build(yes, cb);

        } else if (typeof no === 'function') {
          app.task('no', no);
          build('no', cb);

        } else if (typeof no !== 'undefined') {
          build(no, cb);

        } else {
          cb();
        }
      });
    };
  };

  utils.chooseTasks = function(msg, deps) {
    return function(cb) {
      if (typeof app.ask !== 'function') {
        cb(new Error('expected base-questions to be registered'));
        return
      }

      var build = app.build.bind(app);
      if (typeof app.generate === 'function') {
        build = app.generate.bind(app);
      }

      var self = this;
      app.task('none', {silent: true}, function(next) {
        next();
      });

      var tasks = Object.keys(app.tasks).filter(function(name) {
        return self.name !== name;
      });

      var opts = extend({}, options, {choices: tasks});
      var key = getKey(app, msg, 'choices', opts);
      deps = deps || [];

      app.ask(key, options, function(err, answers) {
        if (err) return cb(err);
        build(answers[key].concat(deps), cb);
      });
    };
  };
  return utils;
};

function getKey(app, msg, type, opts) {
  var question = app.questions.get(msg);
  var key;
  if (!question) {
    key = camelcase(msg);
    app[type](key, msg, opts);
  } else {
    key = msg;
  }
  return key;
}
