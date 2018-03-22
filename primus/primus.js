exports.start = function (server) {
    const Primus = require('primus')
    var primus = new Primus(server, {})

    primus.on('connection', function (spark) {
        console.log("spark connected")
    })
}