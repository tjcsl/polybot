module.exports.register = function(bot) {
    bot.on("message", function(nick, to, text, message) {
        if (text.indexOf(bot.config.cmdchar + "join") == 0 ||
            text.indexOf(bot.config.cmdchar + "part") == 0) {
            text = text.slice(1).split(" ");
            if(text[1] == undefined) {
                bot.say(nick, "Please specify a channel.");
                return;
            }
            console.log("[channels] " + text[0] + " " + text[1]);
            var f = {"join": bot.join, "part": bot.part}[text[0]];
            bot.hasAccess(message.user, message.host, text[1], "joinpart", function(s){
                if(!s) return bot.say(nick, "You do not have permission to manage " + text[1]);
                if(text[0] == "join") bot.join(text[1]);
                if(text[0] == "part") bot.part(text[1]);
            });
        }
    });

    return "A module for managing channels. !join|part channel";
}
