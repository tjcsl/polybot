module.exports.register = function(bot) {
    bot.on('error', function(e){
        console.warn(e);
    });

    bot.on('registered', function(){
        console.log("Connected to IRC.");
    });
}
