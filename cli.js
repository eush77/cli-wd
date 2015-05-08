#!/usr/bin/env node
'use strict';

var kexec = require('kexec');


var usage = function () {
  console.log('Usage:  cwd <directory> -- <command> [arg]...');
  process.exit(1);
};


(function () {
  var args = process.argv.slice(2);
  if (args.length < 3 || args[1] != '--') {
    return usage();
  }
  process.chdir(args[0]);
  kexec(args[2], args.slice(3));
}());
