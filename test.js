var fs = require('fs');
var path = require('path');

var datapath = path.join(__dirname, 'data');

fs.readFile(datapath+'/people.json',function (err,data) {
    if(err){
        return console.error(err);
    }
    let person = data.toString();//将二进制的数据转换为字符串
    person = JSON.parse(person);//将字符串转换为json对象
    console.log(person[0])


    person[0].age = '2';
    var str = JSON.stringify(person);
    fs.writeFile(datapath+'/people.json',str,function(err){
        if(err){
            console.error(err);
        }
        console.log('----------修改-------------');
    })

})