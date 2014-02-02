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

## Database
The bot exposes a database as `bot.db`. It is a `Client` instance (part of the node `pg` library). See `acl.js` for an example of how to use the DB.
