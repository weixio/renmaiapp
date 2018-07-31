var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'nihao' });
});
router.get('/about', function(req, res, next) {
    res.send('about..');
});
module.exports = router;
