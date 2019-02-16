var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let peopleRepository = require('./../data/peopleRepository');
let pwdDao = require('./../data/pwdDao');
let db = require('./../data/db');
const peopledb = db.get('people');
const pwddb = db.get('pwd');
let LodashId = require('lodash-id');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/save', function (req, res, next) {
    let form = req.body;
    if (form.id != null && form.id != '') {
        form.date = Date.now();
        peopledb.find({id: form.id})
            .assign(form)
            .write()
    } else {
        form.id = LodashId.createId();
        form.date = Date.now();
        peopledb
            .push(form)
            .write();
    }
    res.send('success');
});
router.get('/get', function (req, res, next) {
    const rs = peopledb
        .sortBy((item) => {
            return -item.date;
        })
        .value()
    res.send(rs);
});
router.get('/birth', function (req, res, next) {
    let data = peopledb.value();
    let now = new Date();
    let mm = now.getMonth() + 1;     //月
    let dd = now.getDate();          //日
    let filter = data
        .filter(item => {
            let b
            let birthArr = item.birthday.split('-');
            let month = birthArr[1] * 1;
            let day = birthArr[2] * 1;
            b = ((month >= mm * 1));
            if (month == mm * 1) {
                b = ((day >= dd * 1));
            }
            return b;
        });
    filter.forEach(item => {
        let birthArr = item.birthday.split('-');
        item.mCut = birthArr[1] * 1;
        item.dCut = birthArr[2] * 1;
    });
    filter.sort((a, b) => {
        if (b.mCut > a.mCut) {
            return false;
        } else if (b.mCut < a.mCut) {
            return true;
        } else {
            if (b.dCut >= a.dCut) {
                return false;
            } else {
                return true;
            }
        }
    });
    res.send(filter);
});
router.post('/getRela', function (req, res, next) {
    let obj = req.body;
    let allpeople = peopledb.value();
    let relaTreeObj = {};
    relaTreeObj.id = obj.id;
    relaTreeObj.name = obj.name;
    getRelaTree_getChild(relaTreeObj, allpeople);
    if (relaTreeObj.children.length > 0) {
        relaTreeObj.children.forEach(item => {
            getRelaTree_getChild(item, allpeople);
        })
    }
    res.send(relaTreeObj);
});
router.post('/login', function (req, res, next) {
    let value = pwddb.value();
    res.send(value);
});
router.post('/saveNewPwd', function (req, res, next) {
    let form = req.body;
    pwddb.assign({'pwd': form.newpwd}).write();
    res.send(true);
});


function getRelaTree_getChild(relaTreeObj, allpeople) {
    let id = relaTreeObj.id;
    let filterItem = allpeople.filter(item => item.id == id);
    let children = [];
    let person = filterItem[0];
    if (person.relaperson != null && person.relaperson != '') {
        let relalist = person.relaperson.split(',');
        relalist.forEach(id => {
            let chilObj = {};
            chilObj.id = id;
            chilObj.name = allpeople.filter(item => item.id == id)[0].name;
            children.push(chilObj);
        });
    }
    relaTreeObj.children = children;
}

/**
 * 获得关系树
 * @param item
 * @param allpeople
 * @returns {{id, name}}
 */
function getRelaTree(relaTreeObj = {}, allpeople = [], peopleset = new Set()) {
    if (peopleset.has(relaTreeObj.id)) {
        return false;
    } else {
        peopleset.add(relaTreeObj.id);
        let id = relaTreeObj.id;
        let filterItem = allpeople.filter(item => item.id == id);
        let children = [];
        let person = filterItem[0];
        if (person.relaperson != null && person.relaperson != '') {
            let relalist = person.relaperson.split(',');
            relalist.forEach(id => {
                let chilObj = {};
                chilObj.id = id;
                chilObj.name = allpeople.filter(item => item.id == id)[0].name;
                getRelaTree(chilObj, allpeople, peopleset);
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
