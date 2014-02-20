var resolveDependencies = function(bot, deps) {
    deps.forEach(function(f){
        if(f in bot.modules) return;
        console.log("\tloading module dependency: " + f);
        bot.modules[f] = require('./modules/' + f);
        // Recursively resolve dependencies.
        if(bot.modules[f].dependencies) resolveDependencies(bot, bot.modules[f].dependencies);
        bot.modules[f].register(bot);
    });
}

module.exports.resolveDependencies = resolveDependencies;
