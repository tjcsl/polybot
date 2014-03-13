module.exports.commands = [
    {
        name: "join",
        permission: "joinpart",
        callback: function(reply, data, args) {
            data.bot.join(args[0]);
        }
    },
    {
        name: "part",
        permission: "joinpart",
        callback: function(reply, data, args) {
            data.bot.part(data.chan);
        }
    }
];
