module.exports.dependencies = ["per-channel-config"];
module.exports.register = function(bot){
    bot.on('join', function(channel, nick, message){
        bot.hasAccess(nick, message.user, message.host, channel, 'autoop', function(a){
            if(a) bot.send("MODE", channel, "+o", nick);
        });
    });
    bot.on('join', function(channel, nick, message){
        bot.hasAccess(nick, message.user, message.host, channel, 'autovoice', function(a){
            if(a) bot.send("MODE", channel, "+v", nick);
        });
    });
}
