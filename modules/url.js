var cheerio = require('cheerio');
var http = require('http');

function download(url, callback) {
    http.get(url, function(res) {
        var data = "";
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on("end", function() {
            callback(data);
        });
    }).on("error", function() {
        callback(null);
    });
}

module.exports.register = function(bot) {
    var urlre = /https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi
    bot.on("message#", function(nick, chan, text) {
        var urls = text.match(urlre);
        if(!urls) return;
        urls.forEach(function(f) {
            download(f, function(data) {
                page = cheerio.load(data);
                var title = page('title').text().replace(/\n/g, " ").trim();
                bot.say(chan, "** " + title)
            });
        });
    });
    return "Say a URL in a public channel, and this module will reply with the title.";
}
