/**
 * Channel management.
 */

module.exports.commands = [
    {
        name: "op",
        nArgs: 0
        permission: "op",
        callback: function(reply, data, args) {
            data.bot.send("MODE", data.chan, "+o", data.sender);
        }
    }
];
