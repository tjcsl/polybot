var do_modify_acls = function(db, args, channel, callback) {
    try{
        var thing = args[0];
        var userhost = args[1];
        var access = args[2];
        userhost = userhost.split("@");
        var username = userhost[0], host = userhost[1];
        var query;

        switch(thing) {
        case "add":
            query = {
                text: "INSERT INTO acl (username, host, channel, access) VALUES ($1, $2, $3, $4)",
                values: [username, host, channel, access]
            };
            break;
        case "del":
            query = {
                text: "DELETE FROM acl WHERE username LIKE $1 and host LIKE $2 and channel=$3 and access LIKE $4",
                values: [username, host, channel, access]
            };
            break;
        default:
            return callback(false);
        }

        db.query(query, function(e, r) {
            if(e) callback(false);
            else callback(true);
        });
    }
    catch(e){
        callback(false);
    }
}

module.exports.register = function(bot) {
    bot.on("message#", function(nick, to, text, message) {
        if (text[0] != config.cmdchar) return;
        text = text.slice(1).split();
        switch(text[0]){
        case "acl":
            var query = {
                text: "SELECT count(*) AS count FROM acl WHERE $1 LIKE username and $2 LIKE host and (channel=$3 or channel='global') and access='aclmod'",
                values: [message.user, message.host, to]
            }
            bot.db.query(query, function(e, r){
                if(r.rows[0].count < 1) {
                    bot.say(to, nick + ", you do not seem to have the required permissions to change ACLs in this channel.");
                }
                else {
                    do_modify_acls(bot.db, text.slice(1), to, function(success) {
                        if(success) {
                            bot.say(to, nick + ", ACL modification was successful.");
                        }
                        else {
                            bot.say(to, nick + ", ACL modification failed. Perhaps check your syntax? Contact the bot administrator for more information.");
                        }
                    });
                }
            });
        }
    });
}
