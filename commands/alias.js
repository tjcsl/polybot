function createAlias(d, name, target, permission) {
    d.db.query({
            text: "INSERT INTO aliases VALUES ($1, $2, $3)",
            values: [name, target, permission]
    });
    d.commands[name] = {name: name, permission: permission, callback: function(reply, data, args) {
            target = target.split(" ");
            for(var i=1;i<target.length;i++){
                if(target[i][0] == "$")
                    try{target[i] = args[parseInt(target[i].slice(1))-1];}
                    catch(e){
                        // probably not an integer
                        target[i] = data[target[i].slice(1)]
                    }
            }
            data.bot.commands[target[0]].callback(reply, data, target.slice(1));
    }};
}

function deleteAlias(d, name) {
    d.db.query({
            text: "DELETE FROM aliases WHERE name=$1",
            values: [name]
    });
    delete d.commands[name];
}

module.exports.commands = [
    {
        name: "alias",
        permission: "admin",
        callback: function(reply, data, args) {
            if(args[0] == "add") {
                createAlias(data.bot, args[1], args.slice(3).join(" "), args[2]);
                reply("Alias created.");
            }
            else if(args[0] == "del") {
                deleteAlias(data.bot, args[1]);
                reply("Alias deleted.");
            }
        }
    }
];
