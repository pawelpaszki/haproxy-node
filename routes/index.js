var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    console.log('x-forwarded-for ' + req.headers['x-forwarded-for']);
    console.log('remote address ' + req.connection.remoteAddress);
    console.log('socket remote address  ' + req.socket.remoteAddress);
    res.render('index');
});

module.exports = router;
