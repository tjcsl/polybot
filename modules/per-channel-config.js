module.exports.dependencies = ["autoop"];
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
    console.log('setting default keys on ' + channel);
    if(channel in bot.channelConfig) {
        for(key in bot.config.defaultChannelConfig) {
            if (!(key in bot.channelConfig[channel])) {
                console.log('setting ' + channel + ',' + key);
                bot.channelConfig[channel][key] = bot.config.defaultChannelConfig[key];
            }
        }
    }
    else {
        console.log('channel is not in config, copying default config');
        bot.channelConfig[channel] = bot.config.defaultChannelConfig;
    }
}

module.exports.register = function(bot, dontAttachListeners) {
    bot.channelConfig = {};
    bot.parseConfigValue = doParseValue;
    setDefault(bot, "global");
    setDefault(bot, bot.config.nick);
    // Load settings from the DB
    bot.db.query('SELECT * FROM config', function(e, r) {
        if(!r) return;
        r.rows.forEach(function(data) {
            console.log("storing " + data.channel + "," + data.key + " = " + data.value);
            if(!(data.channel in bot.channelConfig)) bot.channelConfig[data.channel] = {};
            bot.channelConfig[data.channel][data.key] = doParseValue(data.value);
            console.log("new config for channel:");
            for(key in bot.channelConfig[data.channel])
                console.log("\t" + key + ":" + bot.channelConfig[data.channel][key]);
        });
    });
    if(!dontAttachListeners){
        bot.on('join', function(channel, nick) {
            if(nick != bot.config.nick) return;
            setDefault(bot, channel);
        });
    }
}
