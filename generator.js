'use strict';

// var npm = require('base-npm');
var prompts = require('./');

module.exports = function(app) {
  var prompt = prompts(app);
  // app.use(npm());

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

  app.task('choose', prompt.chooseTasks('Choose tasks to run'));

  app.task('basic', prompt.confirm('Want to do stuff?', yes, no));

  function yes(cb) {
    console.log('yes!');
    cb();
  }
  function no(cb) {
    console.log('no!');
    cb();
  }

  app.register('test', function(test) {
    console.log('generator >', this.name);

    test.task('default', function(cb) {
      console.log('test task');
      console.log(test.name, 'task >', this.name);
      cb();
    });
    test.task('one', function(cb) {
      console.log(test.name, 'task >', this.name);
      cb();
    });
  });

  app.task('foo', prompt.confirm('Want to run foo?', ['bar'], ['b', 'c']));
  app.task('bar', prompt.confirm('Want to run bar?', ['baz'], ['a']));
  app.task('baz', prompt.confirm('Want to run baz?', ['a', 'b'], function(cb) {
    app.build('fez', cb);
  }));
  app.task('qux', prompt.confirm('Want to run qux?', ['a', 'b']));
  app.task('fez', prompt.confirm('Want to run fez?', function(cb) {
    console.log('FEZ!');
    cb();
  }));
  app.task('zzz', prompt.confirm('Want to run zzz?', ['a', 'b', 'c'], function(cb) {
    console.log('nope (zzz)!');
    cb();
  }));

  app.task('default', function(cb) {
    console.log('just a task');
    console.log('task >', this.name);
    cb();
  });

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

  // app.task('default', {silent: true}, ['foo', 'bar']);
};
