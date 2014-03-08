module.exports.commands = [
    {
        name: "tell",
        permission: "admin",
        callback: function(reply, data, args) {
            var dest = args[0];
            var text = args.slice(1).join(" ");
            data.bot.say(dest, text);
        }        
    }
];
