#!/usr/bin/env node
'use strict';

var spawnFrom = require('./');

var shellQuote = require('shell-quote').quote,
    die = require('or-die'),
    help = require('help-version')(usage()).help;


function usage () {
  return [
    'Usage:  wd [-s | --shell] <directory> [<command>] [arg]...',
    '',
    'Run `<command>` with supplied arguments in a given working directory.',
    'Fall back to shell (just in case `<command>` is a shell function or',
    'alias).',
    '',
    'Arguments:',
    '  <command>  Command to run (default: $SHELL).',
    '',
    'Options:',
    '  -s, --shell  Force command to be executed in shell.'
  ].join('\n');
}


(function (argv) {
  var wd = argv.shift();
  var plan = {
    trySpawn: true,
    tryShell: true
  };

  if (wd == '-s' || wd == '--shell') {
    plan.trySpawn = false;
    wd = argv.shift();
  }

  var cmd = argv.shift();
  if (!cmd) {
    plan.tryShell = false;
    cmd = shellCmd();
  }

  var error;

  if (plan.trySpawn) {
    error = trySpawn({
      wd: wd,
      cmd: cmd,
      argv: argv
    });
    if (!error) return;
  }

  if (plan.tryShell) {
    error = trySpawn({
      wd: wd,
      cmd: shellCmd(),
      argv: ['-c', shellQuote([cmd].concat(argv))]
    });
    if (!error) return;
  }

  die(error.toString());
}(process.argv.slice(2)));


function trySpawn (opts) {
  try {
    spawnFrom(opts.wd, opts.cmd, opts.argv);
    return null;
  }
  catch (err) {
    return err;
  }
}

function shellCmd () {
  return process.env.SHELL || die(Error('$SHELL is undefined').toString());
}
