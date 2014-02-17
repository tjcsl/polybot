module.exports.register = function(bot){
    bot.on('join', function(channel, nick, message){
        bot.hasAccess(message.user, message.host, channel, 'autoop', function(a){
            if(a) bot.send("MODE", channel, "+o", nick);
        });
    });
}
