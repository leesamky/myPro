var _=require('lodash')
var request=require('request')
var cheerio=require('cheerio')
var iconv=require('iconv-lite')
var fs=require('fs')
var file=JSON.parse(fs.readFileSync('league2016.txt',{encoding:'utf-8'}))
var async=require('async')

var leagues=[]

function getMatchInfo(obj,callback){
    "use strict";
    var url='http://liansai.500.com/zuqiu-'+obj['leagueId']
    var options={
        url:url,
        headers:{
            'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
        },
        encoding:null
        // gzip:true
    }
    request(options,function(error,response,body){
        "use strict";

        if(!error&&response.statusCode===200){
            var html=iconv.decode(body,'gb2312')
            var $=cheerio.load(html,{
                decodeEntities:false
            })
            obj['teams']=[]
            console.log(url)
            $('table.lstable1').find('tr').slice(1).each(function(){

                obj['teams'].push(parseInt(_.words($(this).find('td').eq(1).find('a').attr('href'))[1]))

            })
            leagues.push(obj)

            callback(null)
            }else{
                callback(error)
            }
    })
}

console.log('get the data')
async.eachLimit(file,5,getMatchInfo,function(err){
    if(err){console.log(err)}
    else{
        var count=0
        _.forEach(leagues,function(obj){
            "use strict";
            count+=obj['teams'].length
        })
        console.log(count)
        fs.writeFileSync('leagueWithTeams.txt',JSON.stringify(leagues,null,2),{encoding:'utf-8'})
        console.log('done')
    }


})



