module.exports.commands = [
    {
        name: "hostmask",
        callback: function(reply, data, args) {
            data.bot.whois(args[0], function(result) {
                reply(result.username + "@" + result.host);
            });
        }
    }
];
