module.exports = function(req) {
    //console.log(req)
    var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, 'http://');
    var port = 3000
  return ip+":"+port;
};
