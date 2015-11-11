#!/usr/bin/env node
'use strict';

try {
  var kexec = require('kexec');
} catch (e) {
  var spawnSync = require('child_process').spawnSync;
}

var shellQuote = require('shell-quote').quote;


(function (argv) {
  if (argv.length < 1 || argv == '--help') {
    console.log('Usage:  wd <directory> [<command>] [arg]...');
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


function spawnFrom (wd, cmd, argv) {
  if (kexec) {
    process.chdir(wd);
    kexec(cmd, argv);
  }
  else {
    var err = spawnSync(cmd, argv, {
      cwd: wd,
      stdio: 'inherit'
    }).error;
    if (err) throw err;
  }
}


function shellIsUndefined () {
  return Error('$SHELL is undefined');
}
