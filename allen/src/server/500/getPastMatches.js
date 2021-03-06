var _=require('lodash')
var request=require('request')
var cheerio=require('cheerio')
var iconv=require('iconv-lite')
var async = require('async');
var fs=require('fs')

var matchInfoModel=require('server/db/model').matchInfo
// global.teamInfo=[]
// var file=JSON.parse(fs.readFileSync(__dirname+'/teamInfo',{encoding:'utf-8'}))
// _.forEach(file,function(match){
//     "use strict";
//     if(!_.isEmpty(match)){
//         global.teamInfo[match['teamId']]=match
//     }
// })

function objToSave(obj){
    "use strict";
    // console.log(global.teamInfo[obj.homeId])
    obj['away']=global.teamInfo[obj.awayId]['en_name']
    obj['away_cn']=global.teamInfo[obj.awayId]['gb_name']
    obj['home']=global.teamInfo[obj.homeId]['en_name']
    obj['home_cn']=global.teamInfo[obj.homeId]['gb_name']
    obj['homeSecondHalf']=obj['homeFullTime']-obj['homeFirstHalf']
    obj['awaySecondHalf']=obj['awayFullTime']-obj['awayFirstHalf']
    obj['date']=new Date(obj['date'])
    obj['matchGoals']=obj['homeFullTime']+obj['awayFullTime']
    obj['firstHalfGoals']=obj['homeFirstHalf']+obj['awayFirstHalf']
    obj['secondHalfGoals']=obj['homeSecondHalf']+obj['awaySecondHalf']
    return obj
}


function getPastMatches(id,callback){
    "use strict";
    var url="http://liansai.500.com/team/"+id+'/teamfixture/'
    var options={
        url:url,
        headers:{
            'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
        },
        encoding:null
    }
    // console.log(url)
    request(options,function(error,response,body){
        "use strict";
        if(!error&&response.statusCode===200){
            var html=iconv.decode(body,'gb2312')
            var $=cheerio.load(html,{
                decodeEntities:false
            })
            var matches=[]
            $('div.ltab_bd table.jTrHover').find('tr').each(function () {
                var temp = {}
                var score_temp = _.map(_.words($(this).find('td').eq(3).text()),_.parseInt)
                if(_.isEmpty($(this).find('td').eq(0).find('a').text())||_.isUndefined(score_temp[2])) {
                    return
                }
                temp['league'] = $(this).find('td').eq(0).find('a').text()
                var s=$(this).find('td').eq(0).find('a').attr('href').split('/')
                temp['leagueId']=parseInt((s[s.length-2]).slice(6))
                temp['matchId'] = parseInt($(this).attr('id'))
                temp['date'] = $(this).find('td.td_time').text()+' GMT-0000'
                var homeTeam = $(this).find('td.td_lteam').find('a').attr('href').split('/')
                temp['homeId']=parseInt(homeTeam[4])
                var awayTeam = $(this).find('td.td_rteam').find('a').attr('href').split('/')
                temp['awayId']=parseInt(awayTeam[4])
                var score = _.map(_.words($(this).find('td').eq(3).text()),_.parseInt)
                temp['homeFullTime']=score[0]
                temp['awayFullTime']=score[1]
                temp['homeFirstHalf']=score[2]
                temp['awayFirstHalf']=score[3]


                matches.push(objToSave(temp))
            });

            matchInfoModel.create(matches,function(error,result){
                console.log('done '+id)
                callback(null)
            })
            // callback(null)
        }else{
            console.log(error)
            callback(error)
        }
    })
}

module.exports=getPastMatches