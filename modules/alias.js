module.exports.register = function(bot) {
    bot.db.query("SELECT * FROM aliases", function(e, r) {
        r.rows.forEach(function(row) {
            var name = row.name;
            var targt = row.target;
            var permission = row.permission;   
            bot.commands[name] = {name: name, permission: permission, callback: function(reply, data, args) {
                    target = targt.split(" ");
                    for(var i=1;i<target.length;i++){
                        if(target[i][0] == "$"){
                            if(data[target[i].slice(1)])
                                target[i] = data[target[i].slice(1)]
                            else
                                target[i] = args[parseInt(target[i].slice(1))-1];
                        }
                    }
                    bot.commands[target[0]].callback(reply, data, target.slice(1));
            }};
        });
    });
}
