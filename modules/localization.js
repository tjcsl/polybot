module.exports.register = function(bot) {
    bot.localizations = {};
    bot.db.query('SELECT * FROM localizations', function(e, r) {
    });
}
