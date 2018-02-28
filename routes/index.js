var express = require('express');
var router = express.Router();
const util = require('util');
var os = require( 'os' );

var networkInterfaces = os.networkInterfaces();

/* GET home page. */
router.get('/', function(req, res) {

    const haProxy = req.connection.remoteAddress;
    const origin = req.headers['x-forwarded-for'] || haProxy;
    const webServer = getIPAddress();
    console.log('haProxy ' + haProxy);
    console.log('origin ' + origin);
    console.log('webServer ' + getIPAddress());
    console.log(util.inspect(req.headers, false, null));
    res.render('index');
});

function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];

        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
        }
    }

    return '0.0.0.0';
}

module.exports = router;
