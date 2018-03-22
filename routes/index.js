var express = require('express');
var router = express.Router();
var controller = require('../controllers/poll')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/createpoll', function (req, res, next) {
    res.render('createpoll')
})

router.post('/createpoll', function (req, res, next) {
    controller.createPoll(req, res)
})

module.exports = router;
