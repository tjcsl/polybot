function doParseValue(v) {
    // This function parses things like:
    // list:a,b,c,d,e
    // bool:false
    if(v.indexOf("list:") == 0) return v.replace("list:", "").split(",");
    if(v == "bool:true") return true;
    if(v == "bool:false") return false;
    return v;
}

module.exports.register = function(bot, dontAttachListeners) {
    bot.channelConfig = {};
    // Load settings from the DB
    bot.db.query('SELECT * FROM config', function(e, r) {
        r.rows.forEach(function(data) {
            if(!(data.channel in bot.channelConfig)) bot.channelConfig[data.channel] = {};
            bot.channelConfig[data.channel][data.key] = doParseValue(data.value);
        });
    });
    if(!dontAttachListeners){
        bot.on('join', function(channel, nick) {
            if(nick != bot.config.nick) return;
            if(channel in bot.channelConfig) {
                for(key in bot.config.defaultChannelConfig) {
                    if (!(key in bot.channelConfig[channel])) {
                        bot.channelConfig[channel][key] = bot.config.defaultChannelConfig[key];
                    }
                }
            }
            else {
                bot.channelConfig[channel] = bot.config.defaultChannelConfig;
            }
        });
    }
}
