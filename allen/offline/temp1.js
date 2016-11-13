var _=require('lodash')
var request=require('request')
var cheerio=require('cheerio')
var iconv=require('iconv-lite')
var async = require('async');
var getTeaminfo=require('./getTeamInfo')//init the global variable
var matchInfo=require('./model').matchInfo
var matchData=require('./model').matchData
var mongoose=require('mongoose')

var match={
    'homeInfo':{},
    'awayInfo':{},
    'homePastMatches':[],
    'homeFutureMatches':[],
    'awayPastMatches':[],
    'awayFutureMatches':[],
    'bothMatches':[]
}

var urls=[
    0,
    0,
    0,
    'http://odds.500.com/fenxi/shuju-621902.shtml'
]

function getBothMatchInfo(match,urls){
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



        }else{
            console.log(error)

        }
    })
}
getBothMatchInfo(match,urls)