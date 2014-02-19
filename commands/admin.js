module.exports.commands = [
    {
        name: "admin",
        permission: "admin",
        callback: function(reply, data, args) {
            // This is a "multi-command"
            var cmd = args[0];
            args = args.slice(1);
            switch(cmd) {
                case "nick":
                    data.bot.send("NICK", args[0]);
                    data.bot.config.nick = args[0];
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
                case "eval":
                    try {
                        reply(eval(args.join(" ")));
                    }
                    catch(e) {
                        reply("Whoops! " + e);
                    }
                    break;
                default:
                    reply("What?");
                    break;
            }
        }
    }
];
