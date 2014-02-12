var gh = require('github');

module.exports.register = function(bot) {
    var issuere = /.*([a-zA-Z0-9]+)\/([a-zA-Z0-9])#([0-9]+).*/
    bot.on('message#', function(nick, chan, text) {
        var github = new gh({version: "3.0.0"});
        var matches = text.match(issuere);
        if(matches !== null){
            var user = matches[0];
            var repo = matches[1];
            var issue = parseInt(matches[2]);
            github.issues.getRepoIssue({user: user, repo: repo, number: issue}, function(e, r){
                console.log(JSON.stringify(r));
            });
        }
    });
}
