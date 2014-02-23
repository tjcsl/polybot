# Polybot
### **a modular node irc bot**

## Modules
Modules are just bits of code that can do anything. When the bot is initialized, each module's `register` function is called:

```javascript
bot.modules[f] = require('./modules/' + f).register(bot);
```

A module's `register` function should take one argument, which is the bot. Modules can attach listeners to bot events like so:

```javascript
module.exports.register = function(bot) {
    bot.on('message', function(nick, channel, text) {
        bot.say(channel, nick + " just said " + text);
    });
}
```

A full list of events that the bot can emit can be found on [the node-irc documentation website](https://node-irc.readthedocs.org/en/latest/API.html#client).

## Commands
If you just want to listen for !hello, or similar, you can use a command. Commands are placed in the directory "commands" and are loaded by the "command" module. A command should look like this:

```javascript
module.exports.commands = [
    {
        name: "hello",
        nArgs: 1,
        permission: "sayHi",
        callback: function(reply, args) {
            reply("Hello, " + args[0] + "!");
        }
    }
];
```

## Database
The bot exposes a database as `bot.db`. It is a `Client` instance (part of the node `pg` library). See `acl.js` for an example of how to use the DB.

## Actually setting up the bot
1. Set up PostgreSQL.
2. Set the DATABASE_URL environment variable to be in the form "postgres://user:password@host
