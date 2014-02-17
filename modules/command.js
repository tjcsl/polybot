module.exports.register = function(bot) {
    var command_pkgs = {};
    var commands = {};
    require('fs').readdirSync('./commands/').forEach(function(f){
        f = f.replace('.js', '');
        console.log("loading command package " + f);
        command_pkgs[f] = require('../commands/' + f).commands;
        command_pkgs[f].forEach(function(cmd) {
            if(Object.keys(commands).indexOf(cmd.name) == -1){
                commands[cmd.name] = cmd;
            }
            else{
                console.log("warning: command " + cmd.name + " from " + f + " is already loaded in a different package");
            }
        });
        console.log("done loading command package " + f);
    });
    bot.on('message', function(nick, to, text, message) {
        var reply_dest = (to == bot.config.nick ? nick : to);
        var reply = function(t) { bot.say(reply_dest, t); }
        if(text.indexOf(bot.config.cmdchar) == 0) {
            text = text.slice(1).split(" ");
            if(Object.keys(commands).indexOf(text[0]) != -1) {
                var cmd = commands[text[0]];
                if(cmd.permission){
                    bot.hasAccess(message.user, message.host, to, cmd.permission, function(a) {
                        if(!a) {
                            bot.say(nick, "You don't have the '" + cmd.permission + "' permission.");
                        }
                        else {
                            text = text.slice(1);
                            if(cmd.nArgs) {
                                if(text.length != cmd.nArgs) {
                                    bot.say(nick, "That command requires " + cmd.nArgs + " arguments. You supplied " + text.length + ".");
                                    return;
                                }
                            }
                            cmd.callback(reply, text);
                        }
                    });
                }
                else {
                    cmd.callback(reply, text.slice(1));
                }
            }
        }
    });
}

