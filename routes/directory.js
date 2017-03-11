/**
 * Created by EliMcJah on 3/10/17.
 */
let express = require('express');
let router  = express.Router();
let hbs     = require('hbs');


router.get('/', function(req, res, next) {
    res.render('directory');
});



module.exports = router;