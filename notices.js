bot.on("registered", function(message) {
    console.log("We have liftoff! Connected to the IRC server.");
});

bot.on("error", function(message) {
    console.warn(message);
});
