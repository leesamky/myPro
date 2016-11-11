var _=require('lodash')
var request=require('request')
var cheerio=require('cheerio')
var iconv=require('iconv-lite')
var getTeaminfo=require('./getTeamInfo')//init the global variable
var match={
    'homeInfo':{},
    'awayInfo':{},
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
    'http://odds.500.com/fenxi/shuju-581388.shtml',
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
    var url=matchUrl[3]
    var options={
        url:url,
        headers:{
            'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
        },
        encoding:null,
        gzip:true
    }
    request(options,function(error,response,body){
        "use strict";
        if(!error&&response.statusCode===200){
            var html=iconv.decode(body,'gb2312')
            var $=cheerio.load(html,{
                decodeEntities:false
            })

            $('#team_jiaozhan').find('td.dz').parent().slice(1).each(function(){
                var temp={}
                temp['league'] = $(this).find('td').eq(0).find('a').text()
                var s=$(this).find('td').eq(0).find('a').attr('href').split('/')
                temp['leagueId']=parseInt((s[s.length-2]).slice(6))
                temp['date']=new Date($(this).find('td').eq(1).text())
                var str=_.words($(this).find('td').eq(2).text())
                if(str.length===6){
                    temp['homeRank']=parseInt(str[0])
                    temp['home']=str[1]
                    temp['homeFullTime']=parseInt(str[2])
                    temp['awayFullTime']=parseInt(str[3])
                    temp['away']=str[4]
                    temp['awayRank']=parseInt(str[5])
                }else{
                    temp['home']=str[0]
                    temp['homeFullTime']=parseInt(str[1])
                    temp['awayFullTime']=parseInt(str[2])
                    temp['away']=str[3]
                }
                match['bothMatches'].push(temp)
            })
            // console.log(match['bothMatches'])
            if($('div.team_a').length){
                match['homeInfo']['league']={
                    'overall':[],
                    'home':[],
                    'away':[]
                }
                $('div.team_a').find('th.th_one').parent().parent().find('tr').eq(1).find('td').each(function(){
                    match['homeInfo']['league']['overall'].push($(this).text())
                })

                $('div.team_a').find('th.th_one').parent().parent().find('tr').eq(2).find('td').each(function(){
                    match['homeInfo']['league']['home'].push($(this).text())
                })

                $('div.team_a').find('th.th_one').parent().parent().find('tr').eq(3).find('td').each(function(){
                    match['homeInfo']['league']['away'].push($(this).text())
                })

            }

            if($('div.team_b').length){
                match['awayInfo']['league']={
                    'overall':[],
                    'home':[],
                    'away':[]
                }
                $('div.team_a').find('th.th_one').parent().parent().find('tr').eq(1).find('td').each(function(){
                    match['awayInfo']['league']['overall'].push($(this).text())
                })

                $('div.team_a').find('th.th_one').parent().parent().find('tr').eq(2).find('td').each(function(){
                    match['awayInfo']['league']['home'].push($(this).text())
                })

                $('div.team_a').find('th.th_one').parent().parent().find('tr').eq(3).find('td').each(function(){
                    match['awayInfo']['league']['away'].push($(this).text())
                })

            }
            





        }else{
            console.log(error)
        }
    })
}

getMatchInfo(match,matchUrl)