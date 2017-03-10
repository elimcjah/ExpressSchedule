/**
 * Created by EliMcJah on 3/9/17.
 */
let express = require('express');
let router  = express.Router();

/* GET Employee Page*/
router.about = function(req, res){
    res.render('navbar', { title: 'Express' });
};

module.exports = router;