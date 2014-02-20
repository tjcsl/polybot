module.exports.commands = [
    {
        name: "quiet",
        nArgs: 1,
        permission: "op",
        callback: function(reply, data, args) {
            var person = args[0];
            data.bot.whois(person, function(result) {
                var toQuiet = "*!*" + result.user + "@" + result.host;
                if(!bot.quietCache) bot.quietCache = {};
                bot.quietCache[person] = toQuiet;
                data.bot.send("MODE", data.chan, "+q", toQuiet);
            });
        }
    },
    {
        name: "unquiet",
        nArgs: 1,
        permission: "op",
        callback: function(reply, data, args) {
            var person = args[0];
            if(bot.quietCache && person in bot.quietCache)
                data.bot.send("MODE", data.chan, "-q", bot.quietCache[person]);
            else
                reply("I can't say that I've ever quieted that person before.");
        }
    }
];
