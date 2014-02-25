var gh = require('node-github');

module.exports.register = function(bot) {
    var issuere = /.*?([\-a-zA-Z0-9]+)\/([\-a-zA-Z0-9]+)#([0-9]+).*/
    bot.on('message#', function(nick, chan, text) {
        var github = new gh({version: "3.0.0"});
        var matches = text.match(issuere);
        if(matches !== null){
            var user = matches[1];
            var repo = matches[2];
            var issue = parseInt(matches[3]);
            github.issues.getRepoIssue({user: user, repo: repo, number: issue}, function(e, r){
                if(e) {
                    bot.say(chan, "** Issue not found");
                    return;
                }
                bot.say(chan, "** " + repo + " #" + issue + ": " + r.title);
            });
        }
    });
}
