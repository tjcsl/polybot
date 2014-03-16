module.exports.register = function(bot) {
    bot.channelUsers = {}

    bot.on('join',  function(chan) { bot.send('NAMES', chan); });
    bot.on('part',  function(chan) { bot.send('NAMES', chan); });
    bot.on('+mode', function(chan) { bot.send('NAMES', chan); });
    bot.on('-mode', function(chan) { bot.send('NAMES', chan); });

    bot.on('names', function(chan, nicks) {
        bot.channelUsers[chan] = nicks;
    });
};
