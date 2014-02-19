module.exports.register = function(bot) {
    bot.channelConfig = {};
    bot.on('join', function(channel, nick) {
        if(nick != bot.config.nick) return;
        if(channel in bot.channelConfig) return;
        bot.channelConfig[channel] = bot.config.defaultChannelConfig;
    }
}
