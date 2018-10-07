var fs = require('fs');
var path = require('path');
const readFile = require("util").promisify(fs.readFile);
const writeFile = require("util").promisify(fs.writeFile);

// var datapath = path.join(__dirname, 'data');

var peopleRepository = {
    save : async function(obj = {}){
        try {
            const data = await readFile(__dirname + '/people.json', "utf-8");
            let people = data.toString();//将二进制的数据转换为字符串
            people = JSON.parse(people);//将字符串转换为json对象
            if(obj.id !=null && obj.id != ''){
                obj.date = Date.now();
                people.splice(people.findIndex(item => item.id === obj.id), 1,obj);
            }else{
                console.log('11111111111')
                obj.id = Date.now();
                obj.date = Date.now();
                people.push(obj);
            }

            var str = JSON.stringify(people);
            const err = writeFile(__dirname + '/people.json', str)
        }catch(err) {
            console.log('Error', err);
        }

        // fs.readFile(__dirname+'/people.json',function (err,data) {
        //     if(err){
        //         return console.error(err);
        //     }
        //
        // })
    },
    get : async function(obj = {}){
        try {
            const data = await readFile(__dirname+'/people.json',"utf-8");
            let person = data.toString();//将二进制的数据转换为字符串
            person = JSON.parse(person);//将字符串转换为json对象
            return person;
        } catch (err) {
            console.log('Error', err);
        }
    }
}

exports = module.exports = peopleRepository;

// fs.readFile(datapath+'/people.json',function (err,data) {
//     if(err){
//         return console.error(err);
//     }
//     let person = data.toString();//将二进制的数据转换为字符串
//     person = JSON.parse(person);//将字符串转换为json对象
//     console.log(person[0])
//
//
//     person[0].age = '2';
//     var str = JSON.stringify(person);
//     fs.writeFile(datapath+'/people.json',str,function(err){
//         if(err){
//             console.error(err);
//         }
//         console.log('----------修改-------------');
//     })
//
// })