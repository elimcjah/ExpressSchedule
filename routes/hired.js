let express = require('express');
let router  = express.Router();
let hbs     = require('hbs');

/* GET HIRED PAGE Page*/
router.get('/', function(req, res, next) {
    res.render('hired');
});

module.exports = router;