function run(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var command = spawn(cmd, args);
    var result = '';
    command.stdout.on('data', function(d) { result += d.toString(); });
    command.on('close', function() { return callback(result); });
}

module.exports.commands = [
    {
        name: "nmapcheck",
        permission: "nmap",
        callback: function(reply, data, args) {
            if(args[0].indexOf('*') != -1 || args[0].indexOf("/") != -1) {
                return reply("NO :>");
            }
            run("/usr/bin/nmap", ["-Pn", "-p", "1080,8080", args[0]], function(r) {
                if(result.indexOf("1080/tcp open") != -1) {
                    if (result.indexOf("8080/tcp open") != -1) {
                        reply("Looks like we've got ourselves a bot.");
                    }
                    else reply ("That's no moon.. er, bot!");
                }
                else reply("That's no moon.. er, bot!")
            });
        }
    }
];
