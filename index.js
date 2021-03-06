var spawn = require('child_process').spawn;

/**
 * Returns a function that, when called, returns a Promise that
 * spawns (as a child process) the given arguments.
 */
module.exports = function(cmd, argv) {
  var args = Array.prototype.slice.call(arguments);
  var cmd = args[0];
  return function() {
    return new Promise(function(resolve, reject) {
      var run = spawn(cmd, args.slice(1));
      var data = '';

      run.on('close', function(code) {
        if(code !== 0) { throwErr(code); }
        resolve(data);
      });
      run.stderr.on('data', function(buffer) {
        console.error(String(buffer));
      });
      run.stdout.on('data', function(buffer) {
        data += buffer;
      });

      run.on('error', throwErr);

      function throwErr(error) {
        if(error instanceof Error) {
          reject(error);
          return;
        }

        var msg = "Error running command '" + args.join(' ') +
                   "'. Error code: " + error;

        reject(new Error(msg));
      }
    });
  }
}
