#!/usr/bin/env node
'use strict';

var cwd = require('..');

var kwargs = require('kwargs');


var usage = function () {
  console.log('Usage:  cwd <directory> -- <command> [arg]...');
  process.exit(1);
};


var parseArgs = function (args) {
  if (args.length < 3 || args[1] != '--') {
    usage();
  }

  return {
    wd: args[0],
    command: args.slice(2).join(' ')
  };
};


var wireStdio = function (parent, child) {
  child.stdout.pipe(parent.stdout);
  child.stderr.pipe(parent.stderr);
  parent.stdin.pipe(child.stdin);
};


wireStdio(process, kwargs(cwd, parseArgs(process.argv.slice(2)), function (error) {
  process.exit(error && error.code || 0);
}));
