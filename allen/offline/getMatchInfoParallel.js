var _=require('lodash')
var request=require('request')
var cheerio=require('cheerio')
var iconv=require('iconv-lite')
var async = require('async');
var getTeaminfo=require('./getTeamInfo')//init the global variable

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

var urls=[ '欧U19',
    'http://liansai.500.com/team/5524/',
    'http://liansai.500.com/team/2654/',
    'http://odds.500.com/fenxi/shuju-626171.shtml',
    'http://liansai.500.com/zuqiu-4090/',
    '11-14&nbsp;19:00',
    '资格赛' ]

function getMatchInfo(urls){
    "use strict";
    console.log('now is '+urls[3])
    var match={
        'homeInfo':{},
        'awayInfo':{},
        'homePastMatches':[],
        'homeFutureMatches':[],
        'awayPastMatches':[],
        'awayFutureMatches':[],
        'bothMatches':[]
    }
    match['league']=urls[0]
    var s=urls[4].split('/')
    match['leagueId']=parseInt((s[s.length-2]).slice(6))
    var s=urls[3].split('/')
    match['matchId']=parseInt(s[4].split('-')[1])
    match['round']=urls[6]
    var s=urls[5]
    s='2016-'+s.replace('&nbsp;',' ')+' GMT-0000'
    match['date']=new Date(s)

    getTeaminfo(match,urls)
    async.parallel([
        getHomeMatches.bind(null,match,urls),
        getAwayMatches.bind(null,match,urls),
        getBothMatchInfo.bind(null,match,urls)
    ],function(err){
        if(err){console.log(err)}
        else{
            matchInfo.create([...match['homePastMatches'],...match['awayPastMatches']],function(err,result){
                matchData.create(match,function(err,result){
                    console.log(match.matchId+'done')
                    // callback(null)
                    // mongoose.disconnect()
                    // mongoose.connection.close()
                })
            })

        }
    })

}

function getBothMatchInfo(match,urls,callback){
    "use strict";
    var url=urls[3]
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


            var history=$('#team_jianzhan').find("span:contains('双方无交战历史')").length//both matches
            if(history){

            }else{
                $('#team_jiaozhan').find('td.dz').parent().slice(1).each(function(){
                    var temp={}
                    temp['league'] = $(this).find('td').eq(0).find('a').text()
                    var s=$(this).find('td').eq(0).find('a').attr('href').split('/')
                    temp['leagueId']=parseInt((s[s.length-2]).slice(6))
                    temp['date']=new Date($(this).find('td').eq(1).text()+' GMT-0000')
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
            }


            if($('div.M_box').find('h4:contains("赛前联赛积分排名")').length){//league

                if($('div.M_content').find('div.team_a').length){

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
                //
                if($('div.M_content').find('div.team_b').length){
                    match['awayInfo']['league']={
                        'overall':[],
                        'home':[],
                        'away':[]
                    }
                    $('div.team_b').find('th.th_one').parent().parent().find('tr').eq(1).find('td').each(function(){
                        match['awayInfo']['league']['overall'].push($(this).text())
                    })

                    $('div.team_b').find('th.th_one').parent().parent().find('tr').eq(2).find('td').each(function(){
                        match['awayInfo']['league']['home'].push($(this).text())
                    })

                    $('div.team_b').find('th.th_one').parent().parent().find('tr').eq(3).find('td').each(function(){
                        match['awayInfo']['league']['away'].push($(this).text())
                    })

                }

            }

            var cup=$('h4:contains("赛前杯赛排名")')// cup
            if(cup.length){
                match['homeInfo']['cup']=[]

                cup.parent().siblings().eq(1).find('tbody').find('tr').slice(0,1).each(function(){
                    var that=this
                    var temp=[]
                    $(that).find('th').each(function(){
                        temp.push($(this).text())
                    })
                    match['homeInfo']['cup'].push(temp)

                })
                cup.parent().siblings().eq(1).find('tbody').find('tr').slice(1).each(function(){
                    var that=this
                    var temp=[]
                    $(that).find('td').each(function(){
                        temp.push($(this).text())
                    })
                    match['homeInfo']['cup'].push(temp)

                })
                match['awayInfo']['cup']=match['homeInfo']['cup']

            }

            callback(null)
        }else{
            console.log(error)
            callback(error)

        }
    })
}

// function getBothMatchInfo(match,urls,callback){
//     "use strict";
//     var url=urls[3]
//     var options={
//         url:url,
//         headers:{
//             'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//         },
//         encoding:null,
//         gzip:true
//     }
//     request(options,function(error,response,body){
//         "use strict";
//         if(!error&&response.statusCode===200){
//             var html=iconv.decode(body,'gb2312')
//             var $=cheerio.load(html,{
//                 decodeEntities:false
//             })
//
//             $('#team_jiaozhan').find('td.dz').parent().slice(1).each(function(){
//                 var temp={}
//                 temp['league'] = $(this).find('td').eq(0).find('a').text()
//                 var s=$(this).find('td').eq(0).find('a').attr('href').split('/')
//                 temp['leagueId']=parseInt((s[s.length-2]).slice(6))
//                 temp['date']=new Date($(this).find('td').eq(1).text()+' GMT-0000')
//                 var str=_.words($(this).find('td').eq(2).text())
//                 if(str.length===6){
//                     temp['homeRank']=parseInt(str[0])
//                     temp['home']=str[1]
//                     temp['homeFullTime']=parseInt(str[2])
//                     temp['awayFullTime']=parseInt(str[3])
//                     temp['away']=str[4]
//                     temp['awayRank']=parseInt(str[5])
//                 }else{
//                     temp['home']=str[0]
//                     temp['homeFullTime']=parseInt(str[1])
//                     temp['awayFullTime']=parseInt(str[2])
//                     temp['away']=str[3]
//                 }
//                 match['bothMatches'].push(temp)
//             })
//             // console.log(match['bothMatches'])
//             if($('div.team_a').length){
//                 match['homeInfo']['league']={
//                     'overall':[],
//                     'home':[],
//                     'away':[]
//                 }
//                 $('div.team_a').find('th.th_one').parent().parent().find('tr').eq(1).find('td').each(function(){
//                     match['homeInfo']['league']['overall'].push($(this).text())
//                 })
//
//                 $('div.team_a').find('th.th_one').parent().parent().find('tr').eq(2).find('td').each(function(){
//                     match['homeInfo']['league']['home'].push($(this).text())
//                 })
//
//                 $('div.team_a').find('th.th_one').parent().parent().find('tr').eq(3).find('td').each(function(){
//                     match['homeInfo']['league']['away'].push($(this).text())
//                 })
//
//             }
//
//             if($('div.team_b').length){
//                 match['awayInfo']['league']={
//                     'overall':[],
//                     'home':[],
//                     'away':[]
//                 }
//                 $('div.team_a').find('th.th_one').parent().parent().find('tr').eq(1).find('td').each(function(){
//                     match['awayInfo']['league']['overall'].push($(this).text())
//                 })
//
//                 $('div.team_a').find('th.th_one').parent().parent().find('tr').eq(2).find('td').each(function(){
//                     match['awayInfo']['league']['home'].push($(this).text())
//                 })
//
//                 $('div.team_a').find('th.th_one').parent().parent().find('tr').eq(3).find('td').each(function(){
//                     match['awayInfo']['league']['away'].push($(this).text())
//                 })
//
//             }
//
//             callback(null)
//         }else{
//             console.log(error)
//             callback(error)
//         }
//     })
// }

function getHomeMatches(match,urls,callback){
    "use strict";
    var url=urls[1]+'teamfixture/'
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


                match['homePastMatches'].push(objToSave(temp))
            });

            $('#f_table').find('tr').each(function(){
                var temp={}

                if(_.isEmpty($(this).find('td').eq(0).find('a').text())){
                    return
                }
                temp['league'] = $(this).find('td').eq(0).find('a').text()
                var s=$(this).find('td').eq(0).find('a').attr('href').split('/')
                temp['leagueId']=parseInt((s[s.length-2]).slice(6))
                temp['matchId'] = parseInt($(this).attr('id'))

                temp['date'] = new Date($(this).find('td.td_time').text()+' GMT-0000')
                var homeTeam = $(this).find('td.td_lteam').find('a').attr('href').split('/')
                temp['homeId']=parseInt(homeTeam[4])
                temp['home']=_.isUndefined(global.teamInfo[temp['homeId']])?'':global.teamInfo[temp['homeId']]['en_name']
                temp['home_cn']=_.isUndefined(global.teamInfo[temp['homeId']])?'':global.teamInfo[temp['homeId']]['gb_name']
                var awayTeam = $(this).find('td.td_rteam').find('a').attr('href').split('/')
                temp['awayId']=parseInt(awayTeam[4])
                temp['away']=_.isUndefined(global.teamInfo[temp['awayId']])?'':global.teamInfo[temp['awayId']]['en_name']
                temp['away_cn']=_.isUndefined(global.teamInfo[temp['awayId']])?'':global.teamInfo[temp['awayId']]['gb_name']

                match['homeFutureMatches'].push(temp)
            })
            callback(null)
        }else{
            console.log(error)
            callback(error)
        }
    })
}

function getAwayMatches(match,urls,callback){
    "use strict";
    var url=urls[2]+'teamfixture/'
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


                match['awayPastMatches'].push(objToSave(temp))
            });
            $('#f_table').find('tr').each(function(){
                var temp={}

                if(_.isEmpty($(this).find('td').eq(0).find('a').text())){
                    return
                }
                temp['league'] = $(this).find('td').eq(0).find('a').text()
                var s=$(this).find('td').eq(0).find('a').attr('href').split('/')
                temp['leagueId']=parseInt((s[s.length-2]).slice(6))
                temp['matchId'] = parseInt($(this).attr('id'))

                temp['date'] = new Date($(this).find('td.td_time').text()+' GMT-0000')
                var homeTeam = $(this).find('td.td_lteam').find('a').attr('href').split('/')
                temp['homeId']=parseInt(homeTeam[4])
                temp['home']=_.isUndefined(global.teamInfo[temp['homeId']])?'':global.teamInfo[temp['homeId']]['en_name']
                temp['home_cn']=_.isUndefined(global.teamInfo[temp['homeId']])?'':global.teamInfo[temp['homeId']]['gb_name']
                var awayTeam = $(this).find('td.td_rteam').find('a').attr('href').split('/')
                temp['awayId']=parseInt(awayTeam[4])
                temp['away']=_.isUndefined(global.teamInfo[temp['awayId']])?'':global.teamInfo[temp['awayId']]['en_name']
                temp['away_cn']=_.isUndefined(global.teamInfo[temp['awayId']])?'':global.teamInfo[temp['awayId']]['gb_name']

                match['awayFutureMatches'].push(temp)
            })
            callback(null)


        }else{
            console.log(error)
            callback(error)
        }
    })
}


// module.exports=getMatchInfo
getMatchInfo(urls)