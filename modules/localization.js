module.exports.register = function(bot) {
    bot.strings = {};
    bot.db.query('SELECT * FROM localizations', function(e, r) {
        r.rows.forEach(function(row) {
            bot.strings[row.key] = row.value;
        });
    });
}
