modules.exports.commands = [
    {
        name: "pairing",
        callback: function(reply, data, args) {
            var myStrings = Object.keys(data.bot.channelUsers[data.chan]);
            var user1 = myStrings[Math.floor(Math.random() * myStrings.length)];
            var user2 = myStrings[Math.floor(Math.random() * myStrings.length)];
            reply(user1 + " and " + user2);
        }
    }
];
