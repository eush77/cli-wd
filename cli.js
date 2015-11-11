#!/usr/bin/env node
'use strict';

try {
  var kexec = require('kexec');
} catch (e) {
  var spawnSync = require('child_process').spawnSync;
}


(function (argv) {
  if (argv.length < 1 || argv == '--help') {
    console.log('Usage:  wd <directory> [<command>] [arg]...');
    return;
  }

  var wd = argv.shift();
  var cmd = argv.shift() || process.env.SHELL;

  try {
    spawnFrom(wd, cmd, argv);
  }
  catch (err) {
    // Try to execute in shell.
    argv = ['-c', [cmd].concat(argv).join(' ')];
    cmd = process.env.SHELL;
    try {
      spawnFrom(wd, cmd, argv);
    }
    catch (e) {
      throw err;
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
