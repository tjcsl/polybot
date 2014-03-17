module.exports.commands = [
    {
        name: "reload",
        permission: "admin",
        callback: function(reply, data, args) {
            data.bot.removeListener('message', data.bot.cmdhandler);
            data.bot.modules.command.register(data.bot);
            reply("Commands reloaded.");
        }
    }
];
