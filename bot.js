// Load everything we need
var config = require('./config');
var irc = require('irc');
var pg = require('pg');
var fs = require('fs');

// Set up all the things
var botcfg = {
    sasl: true,
    nick: config.nick,
    userName: config.nick,
    password: config.nspass,
    realName: "polybot v0.1, by fwilson",
    channels: config.channels
};

var db = new pg.Client(process.env.DATABASE_URL);
var bot = new irc.Client(config.nick, config.server, botcfg);
bot.db = db;
bot.config = config;

// Do module loading
fs.readdirSync('./modules').forEach(function(f){require('./modules/' + f).register(bot);});
