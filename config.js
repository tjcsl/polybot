var config = {};
console.log("loading configuration");
// Configuration starts here
config.sasl = false;
config.nick = process.env.NICK || "infinigon";
config.channels = process.env.CHANNELS ? process.env.CHANNELS.split(",") : ["#testing"];
config.password = process.env.NICKSERV || "";
config.password_required = (process.env.PWREQUIRED != undefined);
config.username = process.env.SASLUSER || "polybots";
config.server = process.env.SERVER || "chat.freenode.net";
config.port = process.env.IRCPORT || 6667;
config.cmdchar = process.env.CMDCHAR || "!";

config.defaultChannelConfig = {
    globalCmdcharAllowed: true,
    cmdcharAllowed: true,
    cmdchar: config.cmdchar,
    snarfLinks: true,
    defaultAccess: []
};
// ...and ends here
console.log("configuration loaded");
module.exports = config;
