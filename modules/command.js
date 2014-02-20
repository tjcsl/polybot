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
        var data = {bot: bot, sender: nick, chan: to, msg: message};
        if(text.indexOf(bot.config.nick + ": ") == 0) text = text.replace(bot.config.nick + ": ", "");
        else if(text.indexOf(bot.config.nick + ", ") == 0) text = text.replace(bot.config.nick + ", ", "");
        else if(to == bot.config.nick) text = text;
        else if(text.indexOf(bot.config.cmdprefix) == 0 && bot.channelConfig[to].globalCmdcharAllowed) text = text.replace(bot.config.cmdprefix, "");
        else if(Object.keys(bot.channelConfig).indexOf(to) != -1 && text.indexOf(bot.channelConfig[to].cmdchar) == 0 && bot.channelConfig[to].cmdcharAllowed) text = text.replace(bot.channelConfig[to].cmdprefix, "");
        else return;
        text = text.split(" ");
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
                        cmd.callback(reply, data, text);
                    }
                });
            }
            else {
                cmd.callback(reply, data, text.slice(1));
            }
        }
    });
};
