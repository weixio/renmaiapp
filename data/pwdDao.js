var fs = require('fs');
var path = require('path');
const readFile = require("util").promisify(fs.readFile);
const writeFile = require("util").promisify(fs.writeFile);

const pwdDao = {
    save : async function(newpwd = ''){
        try {
            const data = await readFile(__dirname + '/pwd.json', "utf-8");
            let pwd = data.toString();//将二进制的数据转换为字符串
            const pwdobj = JSON.parse(pwd);
            pwdobj.pwd = newpwd;
            const str = JSON.stringify(pwdobj);
            const err = writeFile(__dirname + '/pwd.json', str)
            return err
        }catch(err) {
            console.log('Error', err);
        }
    },
    get : async function(){
        console.log('ffff')
        try {
            const data = await readFile(__dirname+'/pwd.json',"utf-8");
            let person = data.toString();//将二进制的数据转换为字符串
            person = JSON.parse(person);//将字符串转换为json对象
            return person;
        } catch (err) {
            console.log('Error', err);
        }
    }

}
exports = module.exports = pwdDao;
