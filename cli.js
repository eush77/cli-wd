#!/usr/bin/env node
'use strict';

var kexec = require('kexec');


var usage = function () {
  console.log('Usage:  cwd <directory> [<command>] [arg]...');
  process.exit(1);
};


(function (argv) {
  if (argv.length < 1 || argv == '--help') {
    return usage();
  }

  var wd = argv.shift();
  var cmd = argv.shift() || process.env.SHELL;

  process.chdir(wd);
  kexec(cmd, argv);
}(process.argv.slice(2)));
