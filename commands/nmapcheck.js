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
                return reply(data.bot.strings["nmap.fail"]);
            }
            run("/usr/bin/nmap", ["-Pn", "-p", "1080,8080", args[0]], function(result) {
                if(result.indexOf("1080/tcp open") != -1) {
                    if (result.indexOf("8080/tcp open") != -1) {
                        reply(data.bot.strings["nmap.yes"]);
                    }
                    else reply (data.bot.strings["nmap.no"]);
                }
                else reply(data.bot.strings["nmap.no"]);
            });
        }
    }
];
