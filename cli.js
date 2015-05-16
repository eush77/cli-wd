#!/usr/bin/env node
'use strict';

var kexec = require('kexec');


(function (argv) {
  if (argv.length < 1 || argv == '--help') {
    console.log('Usage:  wd <directory> [<command>] [arg]...');
    return;
  }

  var wd = argv.shift();
  var cmd = argv.shift() || process.env.SHELL;

  process.chdir(wd);
  kexec(cmd, argv);
}(process.argv.slice(2)));
