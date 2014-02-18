module.exports.commands = [
    {
        name: "admin",
        permission: "admin",
        callback: function(reply, data, args) {
            // This is a "multi-command"
            var cmd = args[0];
            args = args.slice(1);
            switch(args[0]) {
                case "nick":
                    data.bot.send("NICK", args[1]);
                    break;
                case "die":
                    data.bot.send("QUIT", "Killed by an admin.");
                    break;
                case "join":
                    args.forEach(function(c){data.bot.join(c);});
                    break;
                case "part":
                    args.forEach(function(c){data.bot.part(c);});
                    break;
                default:
                    reply("What?");
                    break;
            }
        }
    }
];
