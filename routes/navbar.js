/**
 * Created by EliMcJah on 3/9/17.
 */
let express = require('express');
let router  = express.Router();

/* GET Employee Page*/
router.get('/', function(req, res, next) {
    res.render('navbar');
});

module.exports = router;