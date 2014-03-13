/**
 * Channel management.
 */

module.exports.commands = [
    {
        name: "op",
        permission: "op",
        callback: function(reply, data, args) {
            data.bot.send("MODE", data.chan, "+o", data.sender);
        }
    },
    {
        name: "deop",
        permission: "op",
        callback: function(reply, data, args) {
            data.bot.send("MODE", data.chan, "-o", data.sender);
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
