console.log("polybot starting up");

// Load everything we need
var config = require('./config');
var irc = require('fwilson-irc-fork');
var pg = require('pg').native;
var fs = require('fs');

// Set up all the things
var botcfg = {
    sasl: true,
    userName: config.sasluser,
    password: config.nspass,
    realName: "polybot v0.1, by fwilson",
    channels: config.channels,
    port: 8000
};

console.log("attaching to DB");
var db = new pg.Client(process.env.DATABASE_URL);
db.connect(function(e){
    if(e){
        console.error("Failed to connect to the database! " + e);
        return false;
    }
    console.log("Database connection established.");
});
console.log("attaching to IRC: " + config.nick + "@" + config.server);
var bot = new irc.Client(config.server, config.nick, botcfg);
bot.db = db;
bot.config = config;
bot.modules = {};

bot.on("error", function(message) {
    console.warn(message);
});

// Do module loading magic. 
fs.readdirSync('./modules').forEach(function(f){
    f = f.replace('.js', '');
    console.log("loading module " + f);
    bot.modules[f] = require('./modules/' + f).register(bot);
    console.log("done loading " + f);
});
