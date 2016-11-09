var request=require('request')
var cheerio=require('cheerio')
var iconv=require('iconv-lite')
var _=require('lodash')


function getTodayMatch(){
    "use strict";

    var options={
        url:'http://live.500.com/2h1.php',
        headers:{
            'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
        },
        encoding:null
    }
    return new Promise(function(resolve,reject){
        request(options,function(error,response,body){
            "use strict";
            if(!error&&response.statusCode===200){
                var today={'matches':[]}
                var html=iconv.decode(body,'gb2312')
                var $=cheerio.load(html,{
                    decodeEntities:false
                })
                $('td.p_lr01').parent().each(function(){
                    var temp=[]
                    temp.push($(this).find('td').eq(1).text())
                    temp.push($(this).find('td').eq(5).find('a').attr('href'))
                    temp.push($(this).find('td').eq(7).find('a').attr('href'))
                    temp.push($(this).find('td').eq(13).find('a').eq(0).attr('href'))
                    temp.push($(this).find('td').eq(1).find('a').attr('href'))
                    temp.push($(this).find('td').eq(3).text())
                    temp.push($(this).find('td').eq(2).text())
                    today['matches'].push(temp)

                })
                resolve(today)
            }else{
                reject(error,response)
            }
        })
    })
}

module.exports=getTodayMatch

