module.exports.commands = [
    {
        name: "help",
        callback: function(reply, data, args) {
            if(!args[0]) {
                reply("Loaded command packages: " + Object.keys(data.bot.commands).join(", "));
            }
            else {
                if(!args[1]) {
                    reply("Commands in package " + args[1] + ": " + Object.keys(data.bot.commands[args[1]].join(", ")));
                }
            }
        }
    }
];
