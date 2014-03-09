var dns = require('dns');

module.exports.commands = [
    {
        name: "rdns",
        callback: function(reply, data, args) {
            dns.reverse(args[0], function(e, d) {
                if(e) return reply("No rDNS record found.");
                reverse = d[0];
                dns.resolve(reverse, null, function(er, a) {
                    if(er) return reply("Reverse: " + reverse);
                    else reply("Reverse: " + reverse + " Forward: " + a);
                });
            });
        }
    }
];
