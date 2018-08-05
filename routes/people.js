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
        data.sort((a,b)=>{return (b.date - a.date)});
        res.send(data);
    })
});
router.post('/save',function (req, res, next) {
    let form = req.body;
    let rs = peopleRepository.save(form);
    rs.then(data=>{
        res.send('success');
    })
});
router.post('/getRela',function (req, res, next) {
    let obj = req.body;
    let rs = peopleRepository.get();
    rs.then(allpeople=>{
        let relaTreeObj = {};
        relaTreeObj.id = obj.id;
        relaTreeObj.name = obj.name;
        let people_set = new Set();
        getRelaTree(relaTreeObj,allpeople,people_set);
        res.send(relaTreeObj);
    });
});

/**
 * 获得关系树
 * @param item
 * @param allpeople
 * @returns {{id, name}}
 */
function getRelaTree(relaTreeObj={},allpeople=[],peopleset=new Set()) {
    if (peopleset.has(relaTreeObj.id)){
        return false;
    }else {
        peopleset.add(relaTreeObj.id);
        let id = relaTreeObj.id;
        let filterItem = allpeople.filter(item=>item.id==id);
        let children = [];
        let person = filterItem[0];
        if (person.relaperson !=null && person.relaperson !=''){
            let relalist = person.relaperson.split(',');
            relalist.forEach(id=>{
                let chilObj = {};
                chilObj.id = id;
                chilObj.name = allpeople.filter(item=>item.id==id)[0].name;
                getRelaTree(chilObj,allpeople,peopleset);
                children.push(chilObj);
            });
        }
        relaTreeObj.children = children;
    }

    /**         {"name": "张三", "id": "123", "children":
                    [
                        {"id": "12","name": "李四","children":[
                            {"id": "12","name": "王武"},
                            {"id": "12","name": "王武"}
                        ]},
                        {"id": "12","name": "王武"}
                    ]
                }
     */
}

module.exports = router;
