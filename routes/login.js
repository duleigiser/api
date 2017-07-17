
var express = require('express');
var router = express.Router();

const request = require('request-promise-native').defaults({jar: true});
const path = require('path');
const tough = require('tough-cookie');
import axios from 'axios'
const proxy  = "http://172.168.100.112:7001/jsjd/"
//var trend=require('../moddleware/trend.json')

axios.defaults.withCredentials=false;
// 浏览器header
const headers = {
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,fr;q=0.2',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Host': '127.0.0.1:3000',
    'Save-Data': 'on',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
};

let cookieJar = request.jar();

async function login(name,password){
    const resCookie = _formatCookie((await request({
        method:'POST',
        url:proxy+"/platformAction.do?method=personalLogin&loginName=WANGX3314&password=96e79218965eb72c92a549dd5a330112&keyCode=www.baidu.com",
        jar:cookieJar,
        headers:Object.assign(headers,{
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            ,'DNT':'1'
        }),
        gzip:true,
        resolveWithFullResponse: true
    })).headers['set-cookie'])
    //console.log(resCookie)
    for(let i=0;i<resCookie.length;i++){
        for(let key in resCookie[i]){
            var  obj ={
                key:key,
                value: resCookie[i][key],
                domain:'172.168.100.112',
                path:"/",
            }
        }
        //console.log(obj)
        var cookie = new tough.Cookie(obj);
        console.log(cookie)
        cookieJar.setCookie(cookie,proxy)
    }
    
    return cookieJar
    //console.log(obj)
   // let cookie = new tough.Cookie(obj);
    //console.log(cookie)
    //cookieJar.setCookie(cookie,proxy)
    //console.log(resCookie);
   // console.log(cookiefix);
}
router.get('/trend',function(req,res,next){
    var _callback = req.query.callback;
    if(_callback){
        res.type("text/javascript")
        res.send(_callback+'('+JSON.stringify(trend)+')')
    }else{
        res.json({'code':'nojsosp'})
        //res.json(trend)
    }
})

router.get('/jg',async(req, res, next) => {
  var url = proxy+"/portal/getdmyFDL.do";
    var res1 = JSON.parse(await request({
        method:"get",
        uri:url,
        jar:cookieJar,
        gzip:true
    }))
    //console.log(cookieJar)
    //console.log(res1)
    res.json(res1)
})
router.get('/la',async(req,res,next)=>{
    console.log(req)
    var url = proxy+"/portal/getProject.do?pagenum=1&pagesize=2&ispage=true&orgid=a61365e2-969d-4352-b3f8-805027ab9f1d"
    var res1 = JSON.parse(await request({
        method:"get",
        uri:url,
        jar:cookieJar,
        gzip:true
    }))

    res.json(res1)
})
function _formatCookie(cookies) {
    //console.log(cookies)
    if (typeof cookies === 'string')
        return _format(cookies);
    for (let i of cookies.keys())
        cookies[i] = _format(cookies[i]);
    return cookies;

    function _format(cookie) {
        const result = { };
        for (let each of cookie.split('; '))
            if((each.indexOf('HttpOnly')>-1) || (each.indexOf("path")>-1)){}//清除HttpOnly
            else result[each.split('=')[0]] = each.split('=')[1];
        return result
    }
}

function isObjectEmpty(obj) {
    for (let key in obj)
        if (Object.prototype.hasOwnProperty.call(obj, key))
            return false;
    return true;
}
login()
router.get('/', function(req, res, next) {
    //console.log(login())
   res.json({"la":"登录成功"})
})

module.exports = router;