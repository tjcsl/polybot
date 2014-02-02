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
    console.log("[ACL.js] registering handlers");
    bot.on("message#", function(nick, to, text, message) {
        if (text[0] != bot.config.cmdchar) return;
        text = text.slice(1).split(" ");
        switch(text[0]){
        case "acl":
            var query = {
                text: "SELECT count(*) AS count FROM acl WHERE $1 LIKE username and $2 LIKE host and (channel=$3 or channel='global') and access='aclmod'",
                values: [message.user, message.host, to]
            }
            bot.db.query(query, function(e, r){
                if(e){
                    bot.say(to, nick + ", an error occurred while checking permissions.");
                    return;
                }
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
            break;
        case "gacl":
            var query = {
                text: "SELECT count(*) AS count FROM acl WHERE $1 LIKE username and $2 LIKE host and channel='global' and access='aclmod'",
                values: [message.user, message.host]
            }
            bot.db.query(query, function(e, r){
                if(e){
                    bot.say(to, nick + ", an error occured while checking permissions.");
                    return;
                }
                if(r.rows[0].count < 1) {
                    bot.say(to, nick + ", you do not seem to have permission to modify global ACLs.");
                }
                else {
                    do_modify_acls(bot.db, text.slice(1), "global", function(success){
                        if(success){
                            bot.say(to, nick + ", ACL modification was successful.");
                        }
                        else{
                            bot.say(to, nick + ", ACL modification failed. Check your syntax.");
                        }
                    });
                }
            });
        }
    });

    console.log("[ACL.js] registering bot.hasAccess");
    bot.hasAccess = function(user, host, channel, access, callback) {
        console.log("Checking access for " + user + "@" + host + " in " + channel + ": " + access);
        var query = {
            text: "SELECT count(*) AS count FROM acl WHERE $1 LIKE username and $2 LIKE host and (channel=$3 or channel='global') and access=$4",
            values: [user, host, channel, access]
        }
        bot.db.query(query, function(e, r){
            if(e) return callback(false);
            if(r.rows[0].count > 0) return callback(true);
            return callback(false);
        });
    }

    return "A module for handling ACLs. !acl add|del user@host access";
}
