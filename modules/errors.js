module.exports.register = function(bot) {
    bot.on('error', function(e){
        console.warn(e);
    });
}
