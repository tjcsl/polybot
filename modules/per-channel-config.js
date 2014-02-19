module.exports.register = function(bot) {
    bot.channelConfig = {};
    bot.on('join', function(channel, nick) {
        if(nick != bot.config.nick) return;
        if(channel in bot.channelConfig) {
            for(key in bot.config.defaultChannelConfig) {
                if (!(key in bot[channel])) {
                    bot[channel][key] = bot.config.defaultChannelConfig[key];
                }
            }
        }
        else {
            bot.channelConfig[channel] = bot.config.defaultChannelConfig;
        }
    });
}
