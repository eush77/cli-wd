'use strict';

try {
  var kexec = require('kexec');
} catch (e) {
  var spawnSync = require('child_process').spawnSync;
}


module.exports = function spawnFrom (wd, cmd, argv) {
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
};
