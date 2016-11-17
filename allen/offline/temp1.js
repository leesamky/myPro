var request=require('request')
var arr=[1,2,3]
var url='http://localhost:8080/todayMatches'
var options={
    url:url,
    headers:{
        'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
    },
    encoding:null,
    method:'post',
    json:arr
}

request(options,function(error,response,body){
    "use strict";
    if(!error&&response.statusCode===200){
        console.log('done')
    }else{
        console.log(error)
    }
})






