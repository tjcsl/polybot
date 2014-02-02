var config = {};
// Configuration starts here
config.nick = process.env.NICK || "infinigon";
config.channels = process.env.CHANNELS ? process.env.CHANNELS.split(",") : ["#tjcsl-chat"];
config.nspass = process.env.NICKSERV || "";
config.server = process.env.SERVER || "chat.freenode.net";
config.cmdchar = process.env.CMDCHAR || "!";
// ...and ends here
module.exports = config;
