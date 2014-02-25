var slogans = require('../data/slogans');
function get_slogan() {
    return slogans[Math.floor(Math.random() * slogans.length)];
}

module.exports.commands = [
    {
        name: "slogan",
        callback: function(reply, data, args) {
            reply(get_slogan().replace("{}", args.join(" "))); 
        }
    }
];
