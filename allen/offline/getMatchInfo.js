var _=require('lodash')
var request=require('request')
var cheerio=require('cheerio')
var iconv=require('iconv-lite')
var getTeaminfo=require('./getTeamInfo')//init the global variable
var match={
    'homeInfo':{
        'league':{
            'home':[],
            'away':[],
            'overall':[]
        }
    },
    'awayInfo':{
        'league':{
            'home':[],
            'away':[],
            'overall':[]
        }
    },
    'matchInfo':{},
    'homePastMatches':[],
    'homeFutureMatches':[],
    'awayPastMatches':[],
    'awayFutureMatches':[],
    'bothMatches':[]
}

var matchUrl=[ '欧U19',
    'http://liansai.500.com/team/5524/',
    'http://liansai.500.com/team/5526/',
    'http://odds.500.com/fenxi/shuju-626168.shtml',
    'http://liansai.500.com/zuqiu-4090/',
    '11-09&nbsp;19:00',
    '资格赛' ]

function objToSave(obj){
    "use strict";
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


function getMatchInfo(match,matchUrl){
    "use strict";
    var url=matchUrl[1]+'teamfixture/'
    var options={
        url:url,
        headers:{
            'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
        },
        encoding:null
    }
    request(options,function(error,response,body){
        "use strict";
        if(!error&&response.statusCode===200){
            var html=iconv.decode(body,'gb2312')
            var $=cheerio.load(html,{
                decodeEntities:false
            })
            $('div.ltab_bd table.jTrHover').find('tr').each(function () {
                var temp = {}
               if(_.isEmpty($(this).find('td').eq(0).find('a').text())) {
                   return
               }
                temp['league'] = $(this).find('td').eq(0).find('a').text()
                var s=$(this).find('td').eq(0).find('a').attr('href').split('/')
                temp['leagueId']=parseInt((s[s.length-2]).slice(6))
                temp['matchId'] = parseInt($(this).attr('id'))
                temp['date'] = $(this).find('td.td_time').text()
                var homeTeam = $(this).find('td.td_lteam').find('a').attr('href').split('/')
                temp['homeId']=parseInt(homeTeam[4])
                var awayTeam = $(this).find('td.td_rteam').find('a').attr('href').split('/')
                temp['awayId']=parseInt(awayTeam[4])
                var score = _.map(_.words($(this).find('td').eq(3).text()),_.parseInt)
                temp['homeFullTime']=score[0]
                temp['awayFullTime']=score[1]
                temp['homeFirstHalf']=score[2]
                temp['awayFirstHalf']=score[3]


                match['homePastMatches'].push(objToSave(temp))
            });
            console.log(match)

        }else{
            console.log(error)
        }
    })
}

getMatchInfo(match,matchUrl)