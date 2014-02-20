module.exports.commands = [
    {
        name: "chanconfig-set",
        permission: "admin",
        callback: function(reply, data, args) {
            var channel = args[0];
            var key = args[1];
            var value = args[2];
            var delquery = {
                text: "DELETE FROM config WHERE channel=$1 AND key=$2",
                values: [channel, key]
            };
            var insquery = {
                text: "INSERT INTO config VALUES ($1, $2, $3)",
                values: [channel, key, value]
            };
            data.bot.db.query(delquery, function(e) {
                if(!e) data.bot.db.query(insquery, function(e){
                    if(e) reply(e);
                    else reply("Configuration modified.");
                });
                else reply(e);
            });
            if(!data.bot.channelConfig[channel]) data.bot.channelConfig[channel] = {};
            data.bot.channelConfig[channel][key] = data.bot.parseConfigValue(value);
        }
    },
    {
        name: "chanconfig-unset",
        permission: "admin",
        callback: function(reply, data, args) {
            var channel = args[0];
            var key = args[1];
            var delquery = {
                text: "DELETE FROM config WHERE channel=$1 AND key=$2",
                values: [channel, key]
            };
            data.bot.db.query(delquery, function(e) {
                if(e) reply(e);
                else reply("Configuration modified.");
            });
            if(!data.bot.channelConfig[channel]) data.bot.channelConfig[channel] = {};
            if(key in data.bot.channelConfig[channel]) delete data.bot.channelConfig[channel][key];
        }
    },
    {
        name: "chanconfig-get",
        permission: "admin",
        callback: function(reply, data, args) {
            var channel = args[0];
            var key = args[1];
            if(data.bot.channelConfig[channel])
                reply(typeof(data.bot.channelConfig[channel][key] + ": " + data.bot.channelConfig[channel][key]));
            else
                reply("Channel does not exist in the configuration.");
        }
    },
    {
        name: "chanconfig-list",
        permission: "admin",
        callback: function(reply, data, args) {
            var channel = args[0];
            if(data.bot.channelConfig[channel])
                reply(Object.keys(data.bot.channelConfig[channel]));
            else
                reply("Channel does not exist in the configuration.");
        }
    }
];
