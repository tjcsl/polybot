var config = {};
console.log("loading configuration");
// Configuration starts here
config.nick = process.env.NICK || "infinigon";
config.channels = process.env.CHANNELS ? process.env.CHANNELS.split(",") : ["#tjcsl-polybot"];
config.nspass = process.env.NICKSERV || "";
config.sasluser = process.env.SASLUSER || "polybots";
config.server = process.env.SERVER || "chat.freenode.net";
config.cmdchar = process.env.CMDCHAR || "!";
// ...and ends here
console.log("configuration loaded");
module.exports = config;
