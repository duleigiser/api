var data = require('./trend.json');
var path  = require('path')
var fs = require('fs')
var moment = require('moment'); 
const target = path.join(__dirname, './config.json');

var a = new Date().getTime();

for(var i =0;i<data.length;i++){
    data[i].sort(function(a,b){
        return Date.parse(a[0])-Date.parse(b[0])
    })
    for(var j=0;j<data[i].length;j++){
        if(i===1){
            data[i][j][0]= new Date(data[i][j][0]).getTime()-86400000
        }else{
            
            data[i][j][0]= new Date(data[i][j][0]).getTime()
        }
    }
}

var b = new Date().getTime()-a;
console.log(b)
fs.writeFileSync(target, JSON.stringify(data), 'utf-8');

var c = new Date().getTime()-a;
console.log(c)