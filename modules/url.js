var cheerio = require('cheerio');
var request = require('request');
var googl = require('goo.gl');

module.exports.register = function(bot) {
    var urlre = /https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi
    bot.on("message#", function(nick, chan, text) {
        var urls = text.match(urlre);
        if(!urls) return;
        urls.forEach(function(f) {
            request(f, function(error, response, body){
                if(error || response.statusCode != 200) return;
                var title = cheerio.load(body)('title').text().replace(/\n/g, " ").trim();
                if(title.length > 100) title = title.slice(0, 97) + "...";
                googl.shorten(f, function(surl) {
                    if(surl.id == f) surl.id = "already shortened";
                    bot.say(chan, "** " + title + " -- " + surl.id);
                });
            });
        });
    });
    return "Say a URL in a public channel, and this module will reply with the title.";
}
