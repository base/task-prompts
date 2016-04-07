'use strict';

var npm = require('base-npm');
var prompts = require('base-task-prompts');
var utils = require('./utils');

module.exports = function(app) {
  var ask = prompts(app);
  app.use(npm());

  // app.task('git', function(cb) {
  //   utils.firstCommit(app.cwd, 'first commit', cb);
  // });

  app.task('a', function(cb) {
    console.log('task >', this.name);
    cb();
  });

  app.task('b', function(cb) {
    console.log('task >', this.name);
    cb();
  });

  app.task('c', function(cb) {
    console.log('task >', this.name);
    cb();
  });

  app.task('foo', ask.confirm('Want to run foo?', ['bar'], ['b', 'c']));
  app.task('bar', ask.confirm('Want to run bar?', ['baz'], ['a']));
  app.task('baz', ask.confirm('Want to run baz?', ['a', 'b'], function(cb) {
    app.build('fez', cb);
  }));
  app.task('qux', ask.confirm('Want to run qux?', ['a', 'b']));
  app.task('fez', ask.confirm('Want to run fez?', function(cb) {
    console.log('FEZ!');
    cb();
  }));
  app.task('zzz', ask.confirm('Want to run zzz?', ['a', 'b', 'c'], function(cb) {
    console.log('zzz!');
    cb();
  }));

  // app.task('ask', function(cb) {
  //   app.question('git', 'Want to init a git repository?', {
  //     type: 'confirm',
  //     save: false
  //   });

  //   app.ask('git', function(err, answers) {
  //     if (err) return cb(err);
  //     if (answers.git === true) {
  //       utils.firstCommit(app.cwd, 'first commit', cb);
  //     } else {
  //       utils.log.info('skipping first commit');
  //       cb();
  //     }
  //   });
  // });

  // app.task('baz', 'Want to run foo?', ['foo']);
  // app.task('baz', 'Want to run foo?', function(cb) {
  //   app.build('foo', cb);
  // }, function(cb) {
  //   app.build('bar', cb);
  // });

  app.task('default', {silent: true}, ['foo', 'bar']);
};
