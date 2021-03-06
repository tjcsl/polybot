function doParseValue(v) {
    // This function parses things like:
    // list:a,b,c,d,e
    // bool:false
    if(v.indexOf("list:") == 0) return v.replace("list:", "").split(",");
    if(v == "bool:true") return true;
    if(v == "bool:false") return false;
    return v;
}

function setDefault(bot, channel){
    if(channel in bot.channelConfig) {
        for(key in bot.config.defaultChannelConfig) {
            if (!(key in bot.channelConfig[channel])) {
                console.log('setting ' + channel + ',' + key);
                bot.channelConfig[channel][key] = bot.config.defaultChannelConfig[key];
            }
        }
    }
    else {
        bot.channelConfig[channel] = bot.config.defaultChannelConfig;
    }
}

module.exports.register = function(bot, dontAttachListeners) {
    bot.channelConfig = {};
    bot.parseConfigValue = doParseValue;
    setDefault(bot, "global");
    setDefault(bot, bot.config.nick);
    // Load settings from the DB
    bot.autojoin = [];
    bot.on('registered', function() {
        bot.autojoin.forEach(function(f) {
            bot.join(f);
        });
    });
    bot.db.query('SELECT * FROM config', function(e, r) {
        if(!r) return;
        r.rows.forEach(function(data) {
            if(data.key == 'autojoin' && data.value == 'bool:true')
                bot.autojoin.push(data.channel);
            if(!(data.channel in bot.channelConfig)) bot.channelConfig[data.channel] = {};
            bot.channelConfig[data.channel][data.key] = doParseValue(data.value);
        });
    });
    if(!dontAttachListeners){
        bot.on('join', function(channel, nick) {
            if(nick != bot.config.nick) return;
            setDefault(bot, channel);
        });
    }
}
