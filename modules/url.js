module.exports.register = function(bot) {
    var urlre = /https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi
    bot.on("message#", function(nick, chan, text) {
        var urls = text.match(urlre);
        if(!urls) return;
        urls.forEach(function(f) {
            bot.say(chan, "Wow, a URL! " + f);
        });
    });
}
