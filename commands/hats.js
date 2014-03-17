/**
 * Channel management.
 */

module.exports.commands = [
    {
        name: "op",
        permission: "op",
        callback: function(reply, data, args) {
            if(!args[0])
                data.bot.send("MODE", data.chan, "+o", data.sender);
            else
                data.bot.send("MODE", data.chan, "+o", args[0]);
        }
    },
    {
        name: "deop",
        permission: "op",
        callback: function(reply, data, args) {
            if(!args[0])
                data.bot.send("MODE", data.chan, "-o", data.sender);
            else
                data.bot.send("MODE", data.chan, "-o", args[0]);
        }
    },
    {
        name: "voice",
        permission: "voice",
        callback: function(reply, data, args) {
            data.bot.send("MODE", data.chan, "+v", data.sender);
        }
    },
    {
        name: "devoice",
        permission: "voice",
        callback: function(reply, data, args) {
            data.bot.send("MODE", data.chan, "-v", data.sender);
        }
    }
];
