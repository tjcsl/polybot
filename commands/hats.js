/**
 * Channel management.
 */

module.exports.commands = [
    {
        name: "op",
        nArgs: 0,
        permission: "op",
        callback: function(reply, data, args) {
            data.bot.send("MODE", data.chan, "+o", data.sender);
        }
    },
    {
        name: "voice",
        nArgs: 0,
        permission: "voice",
        callback: function(reply, data, args) {
            data.bot.send("MODE", data.chan, "+v", data.sender);
        }
    }
];
