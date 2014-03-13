/** 
  * Runs `git pull` to reload the source code
  */
function run(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var command = spawn(cmd, args);
    var result = '';
    command.stdout.on('data', function(d) { result += d.toString(); });
    command.on('close', function() { return callback(result); });
}   

module.exports.commands = [
    {
        name: "pull",
        nArgs: 0,
        permission: "admin",
        callback: function(reply, data, args) {
            run("git", ['pull'], reply);
    }
];
