let express = require('express');
let router  = express.Router();

/* GET Employee Page*/
router.get('/', function(req, res, next) {
    res.render('employee', {title: 'Create A New Employee' });
});

module.exports = router;