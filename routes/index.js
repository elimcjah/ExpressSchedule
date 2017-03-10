let express = require('express');
let router  = express.Router();
let mongo   = require('mongodb');
let assert  = require('assert');
let hbs     = require('hbs');


let url = 'mongodb://localhost:27017/scheduleApp';




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express Scheduler'});
});

router.get('/get-data', function(req, res, next) {
    let resultArray = [];
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        let cursor = db.collection('employees').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('hired', {items: resultArray});
        });
    });
});

router.post('/insert', function(req, res, next) {
    let item = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        email: req.body.email,
        dept: req.body.dept,
        role: req.body.role,
        pay_type: req.body.pay_type,
        salary: req.body.salary,
        hourly: req.body.hourly
    };

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('employees').insertOne(item, function (err, res) {
            assert.equal(null, err);
            console.log("Item Inserted");
            db.close();
        });
    });

    res.redirect('/');


});

router.post('/update', function(req, res, next) {

});

router.post('/delete', function(req, res, next) {

});

module.exports = router;