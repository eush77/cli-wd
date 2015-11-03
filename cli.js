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

  if (kexec) {
    process.chdir(wd);
    kexec(cmd, argv);
  }
  else {
    spawnSync(cmd, argv, {
      cwd: wd,
      stdio: 'inherit'
    });
  }
}(process.argv.slice(2)));
