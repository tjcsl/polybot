module.exports.register = function(bot) {
    bot.hasAccess = function(user, host, channel, access, callback) {
        var query = {
            text: "SELECT count(*) AS count FROM acl WHERE $1 LIKE username and $2 LIKE host and (channel=$3 or channel='global') and access=$4",
            values: [user, host, channel, access]
        };
        bot.db.query(query, function(e, r){
            if(e) return callback(false);
            if(r.rows[0].count > 0) return callback(true);
            return callback(false);
        });
        if(bot.channelConfig[channel].defaultAccess.indexOf(access) != -1) return true;
    }

    return "A module for ACL handling.";
}
