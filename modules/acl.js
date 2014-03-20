module.exports.register = function(bot) {
    bot.hasAccess = function(nick, user, host, channel, access, callback) {
        if(access == 'admin') channel = 'global';
        try{
            if(access == 'op' && bot.channelUsers[channel][nick] == "@")
                return callback(true);
        } catch(e){}
        try{
            if(access == 'voice' && bot.channelUsers[channel][nick] == "+")
                return callback(true);
        } catch(e){}
        if(bot.channelConfig[channel].defaultAccess.indexOf(access) != -1) return callback(true);
        var query = {
            text: "SELECT count(*) AS count FROM acl WHERE $1 LIKE username and $2 LIKE host and (channel=$3 or channel='global') and access=$4",
            values: [user, host, channel, access]
        };
        bot.db.query(query, function(e, r){
            if(e) return callback(false);
            if(r.rows[0].count > 0) return callback(true);
            return callback(false);
        });
    }

    return "A module for ACL handling.";
}
