/**
 * This is the simple way to write commands.
 * You can also write modules, but you'll have to manually check permissions,
 * arguments, etc etc.
 */

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
