var express = require('express');
var router = express.Router();
var bodyParser  = require("body-parser");
let peopleRepository = require("./../data/peopleRepository");


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/get',function (req, res, next) {
    let rs = peopleRepository.get();
    rs.then(data=>{
        data.sort((a,b)=>{return (b.date - a.date)})
        res.send(data);
    })
})
router.post('/save',function (req, res, next) {
    var form = req.body;
    let rs = peopleRepository.save(form)
    rs.then(data=>{
        res.send('success');
    })
})

module.exports = router;
