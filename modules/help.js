module.exports.register = function(bot) {
    bot.on("message", function(nick, to, text) {
        if(text.indexOf(bot.config.cmdchar + "help") == 0) {
            text = text.split(" ");
            if(text[1] == undefined){
                bot.say(nick, "Modules loaded: " + Object.keys(bot.modules).join(","));
            }
            else {
                bot.say(nick, "Help on module " + text[1] + ": " + bot.modules[text[1]]);
            }
        }
    });

    return "A module for getting help. !help to list modules; !help module for the helptext of a specific module.";
}
