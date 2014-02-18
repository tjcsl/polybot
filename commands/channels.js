module.exports.commands = [
    {
        name: "join",
        nArgs: 1,
        permission: "joinpart",
        callback: function(reply, data, args) {
            data.bot.join(args[0]);
        }
    },
    {
        name: "part",
        nArgs: 0,
        permission: "joinpart",
        callback: function(reply, data, args) {
            data.bot.part(data.chan);
        }
    }
];
