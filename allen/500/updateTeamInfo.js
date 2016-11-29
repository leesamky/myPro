// run alone to update the teamInfo file
var teamModel=require('./model').teamInfo
var _=require('lodash')
var request=require('request')
var fs=require('fs')
var getTeaminfo=require('./getTeamInfo')//init the global variable
var cheerio=require('cheerio')
var iconv=require('iconv-lite')
var async=require('async')
var file=JSON.parse(fs.readFileSync('teamInfo',{encoding:'utf-8'}))
var mongoose=require('mongoose')
global.teamInfo=[]
global.teamMissing=[]
var teamIds=[]
var completeIds=[]
for(let i=1;i<=9999;i++){
    completeIds.push(i)
}

_.forEach(file,function(obj,index,arr){
    "use strict";
    if(!_.isEmpty(obj)) {
        teamIds.push(obj.teamId)
        teamInfo[obj.teamId] = obj
    }
})

teamMissing=_.difference(completeIds,teamIds)

var update=false

function updateTeamInfo(teamId,callback){
    "use strict";
    var options={
        url:'http://liansai.500.com/team/'+teamId,
        headers:{
            'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
        },
        encoding:null
    }

    request(options,function(error,response,body) {
        "use strict";
        if (!error && response.statusCode === 200) {
            var html = iconv.decode(body, 'gb2312')
            var $ = cheerio.load(html, {
                decodeEntities: false
            })

            var en_name = $('div.itm_name_en').text()
            var gb_name = $('h2.lsnav_qdnav_name').text()
            if (!_.isEmpty(en_name) && !_.isEmpty(gb_name)) {
                var obj={
                    teamId:teamId,
                    en_name:en_name,
                    gb_name:gb_name

                }
                global.teamInfo[teamId]=obj
                console.log(teamId + ' has update')
                console.log(global.teamInfo[teamId])
                update=true
            }else{
                console.log(teamId+' has no update')
            }
            callback(null)
        }else{
            callback(error)
        }
    })
}


console.log('get the data')
async.eachLimit(teamMissing,8,updateTeamInfo,function(err){
    if(err){console.log(err)}

    if(update){
        fs.writeFileSync('teamInfo',JSON.stringify(global.teamInfo),{encoding:'utf-8'})
        console.log('finish updating local file, now update the server')
        var file=JSON.parse(fs.readFileSync('teamInfo',{encoding:'utf-8'}))
        var teamInfos=[]
        _.forEach(file,function(obj,index,arr){
            "use strict";
            if(!_.isEmpty(obj)) {
                delete obj['_id']
                delete obj['__v']
                teamInfos.push(obj)
            }
        })
        teamModel.create(teamInfos,function(error,result){
            "use strict";
            if(error){console.log(error)}
            else{
                console.log(result)
                console.log('end of the app')
            }
        })
    }else{
        console.log('no update')
        mongoose.connection.close()
    }


})







