function doChaining(commands, text, data, message, callback) {
    /**
     * Command chaining hack. Short version:
     * 1) Find all instances where command chaining should be done.
     * 2) Just do a text.replace().
     */
    var re = /\{.*?\}/g;
    var matches = text.match(re);
    if(matches == null) return callback(text);
    var match = matches[0];
    var old = match;
    match = match.slice(1, -1).split(" ");
    if(!match[0] in commands) return callback(text);
    var command = commands[match[0]];
    match = match.slice(1);
    var reply = function(t) {
        text = text.replace(old, t);
        callback(text);
    };
    if(command.permission) {
        data.bot.hasAccess(message.user, message.host, data.chan, command.permission, function(a){
            if(!a) return callback(text);
            command.callback(reply, data, match);
        });
    }
    else {
        command.callback(reply, data, match);
    }
}


module.exports.register = function(bot) {
    bot.command_pkgs = {};
    bot.commands = {};

    function cmdhandler(nick, to, text, message) {
        var reply_dest = (to == bot.config.nick ? nick : to);
        var reply = function(t) { bot.say(reply_dest, t.toString()); }
        var data = {bot: bot, sender: nick, chan: to, msg: message};
        if(text.indexOf(bot.config.nick + ": ") == 0) text = text.replace(bot.config.nick + ": ", "");
        else if(text.indexOf(bot.config.nick + ", ") == 0) text = text.replace(bot.config.nick + ", ", "");
        else if(to == bot.config.nick) text = text;
        else if(bot.channelConfig[to]){
            if (text.indexOf(bot.config.cmdchar) == 0 && bot.channelConfig[to].globalCmdcharAllowed) text = text.replace(bot.config.cmdchar, "");
            else if(text.indexOf(bot.channelConfig[to].cmdchar) == 0 && bot.channelConfig[to].cmdcharAllowed) text = text.replace(bot.channelConfig[to].cmdchar, "");
            else return;
        }
        else return;
        doChaining(bot.commands, text, data, message, function(text){
            text = text.split(" ");
            if(Object.keys(bot.commands).indexOf(text[0]) != -1) {
                var cmd = bot.commands[text[0]];
                if(cmd.permission){
                    bot.hasAccess(message.user, message.host, to, cmd.permission, function(a) {
                        if(!a) {
                            bot.say(nick, "You don't have the '" + cmd.permission + "' permission.");
                        }
                        else {
                            text = text.slice(1);
                            try {
                                cmd.callback(reply, data, text);
                            }
                            catch(e) {
                                reply(e);
                            }
                        }
                    });
                }
                else {
                    try {
                        cmd.callback(reply, data, text.slice(1));
                    }
                    catch(e) {
                        reply(e);
                    }
                }
            }
        });
    };


    require('fs').readdirSync('./commands/').forEach(function(f){
        f = f.replace('.js', '');
        console.log("loading command package " + f);
        bot.command_pkgs[f] = require('../commands/' + f).commands;
        bot.command_pkgs[f].forEach(function(cmd) {
            if(Object.keys(bot.commands).indexOf(cmd.name) == -1){
                bot.commands[cmd.name] = cmd;
            }
            else{
                console.log("warning: command " + cmd.name + " from " + f + " is already loaded in a different package");
            }
        });
        console.log("done loading command package " + f);
    });

    bot.on('message', cmdhandler);
};
