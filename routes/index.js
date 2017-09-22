var express = require('express');
var router = express.Router();
import axios from 'axios'
var md5 = require("./md5");
var ip  = require('../moddleware/ip')
var tm= require('../mock/tm.json')//调门展示
var tmjc = require('../mock/tmjc.json');
var jh = require('../mock/jh.json');//检修计划维护
var api = require('./api')
var da = require("../mock/da.json")
//  console.log(api.get)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
   title: 'Express'
 });

});

axios.defaults.withCredentials=false;
const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie+= item + '=' + cookies[item] + '; '
    })
    return cookie
}
router.get('/zdmx',function(req,res,nexr){
    var json = require('../mock/zdmx.json')
    res.json(json)
})
router.get('/json',function(req,res,next){
    var json = require('../mock/data.json')
    res.json(json)
})
router.get("/zd",function(req,res,next){
    var data = require('../mock/zd.json')
    res.json(data)

})
router.get('/org',function(req,res,next){
    var data = require('../mock/org.json')
    res.json(data)
})
//var proxy = "http://10.10.98.108:8080/jsjd/"
var proxy  = "http://172.168.100.112:7001/jsjd/"
router.get('/jsjd/api', async(req, res, next) => {
  var url = proxy+"/platformAction.do?method=personalLogin";
  var url_ = url+ "&loginName=WANGX3314&password=96e79218965eb72c92a549dd5a330112&keyCode=www.baidu.com"
  var config = {url: url_,method: "post",requestHeader: {'Content-Type': 'application/json'}}
  let response = await axios(config);
  var cookie = response.headers['set-cookie'];
  //清除 "http-only"，"/path" 属性。
  for(let i =0;i<cookie.length;i++){
    cookie[i] = cookie[i].split(";")[0]
  }
  res.setHeader("Set-Cookie", cookie);
  res.json(cookie)
})

router.get('/jsjd/jg',async(req, res, next) => {
    var url = proxy+"portal/getJzqtList.do?orgid=c21834b4-1cb0-490f-a2a8-deeaf7f7e065"
    const cookies = req.cookies;
    let response = await api.get(url,"",cookies)
    res.status(200).json(response.data)
})
router.post('/jsjd/portal.do',async(req,res,next)=>{
   
    res.json(da)
})
router.get('/jsjd/fdl',async(req,res,next)=>{
    var url = proxy+"/portal/getdmyFDL.do";
    const cookies = req.cookies;
    let response = await api.get(url,"",cookies)
    res.json(response.data)
})
router.get("/jsjd/time",async(req,res,next)=>{
    const k = req.query
    const toUrl = Object.keys(k).map(function(i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(k[i])
    }).join('&')
    console.log(toUrl)
    var url_ = proxy+"/pblh/getValueAfterFifteenDay.do?org=4961c78b-178d-423e-bec4-453fc11262cd&rq=2017-4-9";
    const cookies = req.cookies;
    let response = await api.get(url_,"",cookies)
    res.json(response.data)
})
router.get('/jsjd/getorgid',async(req,res,next)=>{
    var url_ = proxy+"/portal/getUserOrgId.do";
    const cookies = req.cookies;
    let response = await api.post(url_,"",cookies)
    res.json(response.data)
})
router.get('/jsjd/header',async(req,res,next)=>{
    var url_ = proxy+"/pblh/getFixedData.do?org=4961c78b-178d-423e-bec4-453fc11262cd";
    const cookies = req.cookies;
    let response = await api.get(url_,"",cookies)
    res.json(response.data)
})
router.get('/jsjd/interval',async(req,res,next)=>{
    var url_ = proxy+"/pblh/getTimeInterval.do?org=472212af-1977-462b-a74a-a1f36ed6562d";
    const cookies = req.cookies;
    let response = await api.get(url_,"",cookies)
    res.json(response.data)
})
router.get('/jsjd/portal/getUserOrgId.do',async(req,res,next)=>{
    //var url_ = proxy+"/pblh/getTimeInterval.do?org=472212af-1977-462b-a74a-a1f36ed6562d";
    //const cookies = req.cookies;
    //let response = await api.get(url_,"",cookies)
    res.end("c21834b4-1cb0-490f-a2a8-deeaf7f7e065")
})
router.get("/jsjd/pblh/getTimeInterval.do",async(req,res,next)=>{
    const k = req.query
    const toUrl = Object.keys(k).map(function(i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(k[i])
    }).join('&')
    var _ip = ip(req)
    var url_ = proxy+req.url;
    console.log(url_)
    const cookies = req.cookies;
    let response = await api.get(url_,"",cookies)
    console.log(11)
    //res.json(response.data)
    //res.json({"ddd":"dd"})
})
router.post("/jsjd/tmzd.do",function(req,res){
   // console.log(req);
    res.json(tm)
})
router.post("/jsjd/portal/getJXJHList.do",function(req,res){
    res.json(jh)
})

module.exports = router;
var util={}
util.fixfen= function(str){
    if (str==''||str==null||str instanceof Object) return '';
    try {
       return str.toString().replace('分','分钟')
    } catch (error) {
        console.warn('不是字符串！')
    }
}
