/**
 * lowdb初始化
 * */
var path = require('path');
const lodashId = require('lodash-id')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.join(__dirname,'db.json'))
const db = low(adapter)
db._.mixin(lodashId)
db.defaults({
    people: [],
    pwd:{'pwd':'1'},
}).write();
exports = module.exports = db;
