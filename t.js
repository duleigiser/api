var data= require("./mock/tm1.json")
if(!$.isArray(data.pagedata[0])){
    for (var i = 0;i < data.pagedata.length;i++){
        data.pagedata[i] =[data.pagedata[i]]
    }
}
