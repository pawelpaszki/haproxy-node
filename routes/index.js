var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    const ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    console.log(ip);
  res.render('index');
});

module.exports = router;
