#!/usr/bin/env node
'use strict';

var spawnFrom = require('./');

var shellQuote = require('shell-quote').quote;


(function (argv) {
  if (argv.length < 1 || argv == '--help') {
    console.log([
      'Usage:  wd <directory> [<command>] [arg]...',
      '',
      'Run `<command>` with supplied arguments in a given working directory.',
      'Fall back to shell (just in case `<command>` is a shell function or',
      'alias).',
      '',
      'Arguments:',
      '  <command>  Command to run (default: $SHELL).'
    ].join('\n'));
    return;
  }

  var wd = argv.shift();
  var cmd = argv.shift();
  if (!cmd) {
    var startShell = true;
    cmd = process.env.SHELL;
  }

  try {
    if (!cmd) throw shellIsUndefined();
    spawnFrom(wd, cmd, argv);
  }
  catch (err1) {
    if (startShell) {
      console.error(err1.toString());
      process.exit(2);
    }

    // Try to execute in shell.
    argv = ['-c', shellQuote([cmd].concat(argv))];
    cmd = process.env.SHELL;
    try {
      if (!cmd) throw shellIsUndefined();
      spawnFrom(wd, cmd, argv);
    }
    catch (err2) {
      console.error(err1.toString());
      console.error(err2.toString(), '(tried to execute in shell)');
      process.exit(2);
    }
  }
}(process.argv.slice(2)));


function shellIsUndefined () {
  return Error('$SHELL is undefined');
}
