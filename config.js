var config = {};
console.log("loading configuration");
// Configuration starts here
config.sasl = true;
config.nick = "septagon";
config.channels = [];
config.password = "46319cf7ccebcb9d47612323c379b8656dc38804c6";
config.password_required = true;
config.username = "polybots";
config.server = "chat.freenode.net";
config.port = 8000;
config.cmdchar = "@";

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
