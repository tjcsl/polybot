function do_add_acl(db, chan, uh, access) {
    uh = uh.split("@");
    var username = uh[0], host = uh[1];
    var query = {
        text: "INSERT INTO acl (username, host, channel, access) VALUES ($1, $2, $3, $4)",
        values: [username, host, chan, access]
    };
    db.query(query);
}

function do_del_acl(db, chan, uh, access) {
    uh = uh.split("@");
    var username = uh[0], host = uh[1];
    var query = {
        text: "DELETE FROM acl WHERE username=$1 AND host=$2 AND channel=$3 AND access LIKE $4",
        values: [username, host, chan, access]
    };
    db.query(query);
}

module.exports.commands = [
    {
        "name": "acl",
        permission: "aclmod",
        callback: function(reply, data, args) {
            try {
                if(args[0] == "add") do_add_acl(data.bot.db, data.chan, args[1], args[2]);
                else if(args[0] == "del") do_del_acl(data.bot.db, data.chan, args[1], args[2]);
                reply("Success!");
            }
            catch(e) {
                reply("Failure :(");
            }
        }
    },
    {
        "name": "gacl",
        permission: "aclmod",
        callback: function(reply, data, args) {
            data.bot.hasAccess(data.sender, data.msg.user, data.msg.host, "global", "aclmod", function(a){
                try {
                    if(!a) return reply("You are not allowed to make global access list modifications!");
                    if(args[0] == "add") do_add_acl(data.bot.db, "global", args[1], args[2]);
                    else if(args[0] == "del") do_del_acl(data.bot.db, "global", args[1], args[2]);
                    reply("Success!");
                }
                catch(e) {
                    reply("Failure :(");
                }
            });
        }
    }
];
