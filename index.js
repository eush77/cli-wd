'use strict';

var exec = require('child_process').exec;


/**
 * Run command with modified CWD.
 *
 * @arg {string} wd - Working dir to set.
 * @arg {string} command - Command to run in a freshly spawned shell.
 * @arg {function(err, stdout, stderr)} cb - Exec-style callback.
 * @return {ChildProcess}
 */
module.exports = function (wd, command, cb) {
  return exec(command, { cwd: wd }, cb);
};
