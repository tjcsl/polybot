module.exports.commands = [
    {
        name: "localize",
        callback: function(reply, data, args) {
            var delquery = {
                text: "DELETE FROM localizations WHERE key=$1",
                values: [args[0]]
            };
            var insquery = {
                text: "INSERT INTO localizations VALUES ($1, $2)",
                values: [args[0], args[1]];
            };
            data.bot.db.query(delquery, function(e) {
                if(!e) data.bot.db.query(insquery, function(e) {
                    if(!e) reply("Configuration modified.");
                    else reply (e)
                });
                else reply(e);
            });
            data.bot.strings[args[0]] = args[1];
        }
    }
]
