// import axios from 'axios'
// function md(){
//     return app.all('*', async(req, res, next) => {
//         var url = "http://172.168.100.110:7001/jsjd/platformAction.do?method=personalLogin&loginName=WANGX3314&password=96e79218965eb72c92a549dd5a330112&keyCode=www.baidu.com"
//         var config = {url: url,method: "post",requestHeader: {'Content-Type': 'application/json'}}
//         let response = await axios(config);
//         var header = response.headers;
//         var cookies = {};
//         res.writeHead(200,{
//             'Set-Cookie': header["set-cookie"],
//             'Content-Type': 'text/plain'
//         })
//         //res.cookie('resc', 'dfa', { expires: new Date(Date.now() + 900000), httpOnly: true });
//         res.json(response.data)
//         next()
//     })
// }
// module.exports = md
// const parseCookie = cookies => {
//     let cookie = ''
//     Object.keys(cookies).forEach(item => {
//         cookie+= item + '=' + cookies[item] + '; '
//     })
//     return cookie
// }
// router.get('/jg',async(req, res, next) => {
//     var url = "http://172.168.100.110:7001/jsjd/portal/getProject.do?pagenum=1&pagesize=2&ispage=true&orgid=a61365e2-969d-4352-b3f8-805027ab9f1d"
//     const cookie = parseCookie(cookies)
//     var config = {url: url,method: "get",headers: {cookie}}
//     let response = await axios(config)
//     res.json(response.data)
// })
var _ = require('lodash');

var urllib = require('url');
var request = require('request');
exports.proxy = function(req,res,next){
    var url = decodeURIComponent(req.query.url);
    request({
        url:url,
        method:"post",
        headers:{
            'content-type':"application/json",
        }
    }).on('response',function(response){
        res.set(response.headers)
    }).pipe(res)
}
router.get('/jg',async(req, res, next) => {
    var url = "http://172.168.100.116:8080/jsjd/portal/getProject.do?pagenum=1&pagesize=2&ispage=true&orgid=a61365e2-969d-4352-b3f8-805027ab9f1d"
    const cookie = parseCookie(cookies)
    var config = {url: url,method: "get",headers: {cookie}}
    let response = await axios(config)
    res.json(response.data)
})