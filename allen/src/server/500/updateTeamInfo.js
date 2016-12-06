// run alone to update the teamInfo file
var teamModel=require('server/db/model').teamInfo
var _=require('lodash')
var request=require('request')
var fs=require('fs')
global.updatedTeamList=false
var cheerio=require('cheerio')
var iconv=require('iconv-lite')
var async=require('async')
var util=require('util')
var fileStat=fs.statSync(__dirname+'/teamInfo')

var file=JSON.parse(fs.readFileSync(__dirname+'/teamInfo',{encoding:'utf-8'}))
var mongoose=require('mongoose')
global.teamInfo=[]
var teamMissing=[]
var teamIds=[]
var completeIds=[]
for(let i=1;i<=9999;i++){
    completeIds.push(i)
}

_.forEach(file,function(obj,index,arr){
    "use strict";
    if(!_.isEmpty(obj)) {
        teamIds.push(obj.teamId)
        global.teamInfo[obj.teamId] = obj
    }
})

if(fileStat.mtime.toLocaleDateString()==new Date().toLocaleDateString()){
    console.log('Today already check the list, read data from file')
    global.updatedTeamList=true
}else{
    console.log('Today did not check the list, now start to check the update')
    var temp=_.difference(completeIds,teamIds)
    _.forEach(temp,function(v){
        "use strict";
        if(v>9300){
            teamMissing.push(v)
        }
    })

    var update=false

    console.log('get the data')
    async.eachLimit(teamMissing,8,updateTeamInfo,function(err){
        if(err){console.log(err)}

        if(update){
            var teamModel=require('server/db/model').teamInfo
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
                    // console.log(result)
                    global.updatedTeamList=true
                    console.log('Finish updating the server')
                    // mongoose.connection.close()
                }
            })
        }else{
            fs.writeFileSync('teamInfo',JSON.stringify(global.teamInfo),{encoding:'utf-8'})
            console.log('Write to file, today no update')
            // mongoose.connection.close()
        }


    })

}


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
            }
            callback(null)
        }else{
            callback(error)
        }
    })
}




module.exports=updateTeamInfo







