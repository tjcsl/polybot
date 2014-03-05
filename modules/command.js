function doChaining(commands, text, data, message) {
    /**
     * Command chaining hack. Short version:
     * 1) Find all instances where command chaining should be done.
     * 2) Just do a text.replace().
     */
    var re = /\{.*?\}/g;
    var matches = text.match(re);
    if(matches == null) return text;
    console.log("Command chaining: " + matches);
    matches.forEach(function(match){
        var old = match;
        var replaceDone = false;
        match = match.slice(1, -1).split(" ");
        console.log("command: " + match[0])
        if(!match[0] in commands) return;
        var command = commands[match[0]];
        match = match.slice(1);
        console.log("args: " + match);

        if(command.permission) return; // commands that require permission
        // can't be done because I'm lazy

        var reply = function(t) {
            text = text.replace(old, t);
            console.log("got a reply: " + t);
        };
        command.callback(reply, data, match);
    });
    return text;
}

function cmdhandler(nick, to, text, message) {
    var reply_dest = (to == bot.config.nick ? nick : to);
    var reply = function(t) { bot.say(reply_dest, t); }
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
    // text = doChaining(commands, text, data, message);
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
};

module.exports.cmdhandler = cmdhandler;
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
    bot.on('message', cmdhandler);
};
