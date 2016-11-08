var _=require('lodash')
var $=require('jquery')
var casper=require('casper').create({
    clientScripts:[
        "jquery.js",
        "lodash.js"
    ],
    pageSettings: {
        loadImage: false,
        loadPlugins: false
    },
    verbose:true,
    timeout:0,
    stepTimeout:60000,
    waitTimeout:60000
})



casper.userAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36")

// casper.options.onResourceReceived=function(casper,request){
//     "use strict";
//     console.log(request.url)
// }

casper.options.onResourceRequested=BypassMain

function BypassTeam(casper,requestData,request){
    // console.log(requestData.url)
    var skip=[
        // 'stats',
        '.jpg',
        '.png',
        '.gif',
        'common',
        'top_v2',
        // 'liansaiteam'
        'redirection',

        'shell_v2.js',
        'push.js',
        'mvl.js',
        'rt.js',
        'bds_s',
        'bdsstyle',
        // '500_log',
        'baidu',
        'global.css',
        'liansai.css',
        'global_dxt.css',
        'footer.css',
        'google'
        // 'core_jq'
        // '.css'
    ]
    skip.forEach(function(needle){
        if(requestData.url.indexOf(needle)>0){
            request.abort()
        }
    })
}

function BypassMain(casper,requestData,request){
    // console.log(requestData.url)
    var skip=[
        '.jpg',
        '.png',
        '.gif',
        'baidu',
        'ckmap',
        '360.cn',
        'mediav',
        'dmp.360',
        'huodong',
        'mobile-redirection',
        'footer.css',
        'passport.500.com',
        'top_v2',
        'button',
        'google',
        '500_log.js',
        'stats.js',
        'common_ws',
        'global_dxt.css',
        'zq.css',
        'new_bifen.css'


    ]
    skip.forEach(function(needle){
        if(requestData.url.indexOf(needle)>0){
            request.abort()
        }
    })
}


var today={'matches':[]}
var server='http://localhost:8080/todayMatch'
casper.start().then(function(){
    "use strict";
    this.echo('starting')
    today=casper.evaluate(function(server){
        return JSON.parse(__utils__.sendAJAX(server,'GET',null,false))
    },server)

})

casper.then(function(){
    "use strict";
    if(_.isEmpty(today['matches'])){
        console.log('no data on server')
        var url="http://live.500.com/2h1.php"
        casper.thenOpen(url,function(){
            //casper.capture('page.png')
            today = this.evaluate(function(today) {
                today=JSON.parse(today)
                $('td.p_lr01').parent().each(function(){
                    var temp=[]
                    temp.push($(this).find('td').eq(1).text())
                    temp.push($(this).find('td').eq(5).find('a').attr('href'))
                    temp.push($(this).find('td').eq(7).find('a').attr('href'))
                    temp.push($(this).find('td').eq(13).find('a').eq(0).attr('href'))
                    temp.push($(this).find('td').eq(1).find('a').attr('href'))
                    temp.push($(this).find('td').eq(3).text())
                    today['matches'].push(temp)

                })

                return today;
            },JSON.stringify(today));
        })
    }
})







function getData(){

    "use strict";
    // casper.capture('temp.png')
    console.log(today['matches'])
    console.log("today is totally "+today['matches'].length)
    console.log('page cost:'+(Date.now()-t).toString())
    t=Date.now()
    data={
        'homeInfo':{
            'home':[],
            'away':[],
            'overall':[]
        },
        'awayInfo':{
            'home':[],
            'away':[],
            'overall':[]
        },
        'matchInfo':{},
        'homePastMatches':[],
        'homeFutureMatches':[],
        'awayPastMatches':[],
        'awayFutureMatches':[],
        'bothMatches':[]
    }
    this.options.onResourceRequested=BypassTeam
    if(!_.isEmpty(today['matches'])){
        var url=today['matches'].pop()
        console.log(url.length)
        data['matchInfo']['match']=url[0]
        data['matchInfo']['match_catagory']=url[4]
        data['matchInfo']['match_time']=url[5]
        getTeamInfo.apply(this,[url[1],1])
        getMatchInfo.apply(this,[url[1],1])
        getTeamInfo.apply(this,[url[2],2])
        getMatchInfo.apply(this,[url[2],2])

        bothMatches.call(this,url[3])
        outputData.call(this)
        // sendData.call(this)
        this.run(getData)
    }else{
        this.echo('All Done')
        this.exit()
    }
}
var data={},
    t=Date.now()

function getTeamInfo(link,num){
    "use strict";
    this.thenOpen(link).then(function(){
        var name
        if(num==1){
            name='homeInfo'
        }else{
            name='awayInfo'
        }

        var team=link.split('/')

        data[name]['teamId']=parseInt(team[team.length-2])
        data = this.evaluate(function(data,name) {
            var temp={}
            data=JSON.parse(data)
            data[name]['gb_name'] = $('h2.lsnav_qdnav_name').text()
            data[name]['en_name']=$('div.itm_name_en').text()
            return data;
        },JSON.stringify(data),name);
    })
}

function getMatchInfo(link,num){
    "use strict";
    var past,future
    if(num==1){
        past='homePastMatches'
        future='homeFutureMatches'
    }else{
        past='awayPastMatches'
        future='awayFutureMatches'
    }
    var url=link+'teamfixture/'
    this.thenOpen(url).then(function(){
        data = this.evaluate(function (data,past,future) {
            data = JSON.parse(data)

            $('div.ltab_bd table.jTrHover').find('tr').each(function () {
                var temp = {}
                if(_.isEmpty($(this).find('td').eq(0).find('a').text())){
                    return
                }
                temp['match'] = $(this).find('td').eq(0).find('a').text()

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

                data[past].push(temp)
            });


            $('#f_table').find('tr').each(function(){
                var temp={}
                temp['match'] = $(this).find('td').eq(0).find('a').text()
                if(_.isEmpty(temp['match'])){
                    return
                }
                temp['matchId'] = parseInt($(this).attr('id'))

                temp['date'] = $(this).find('td.td_time').text()
                var homeTeam = $(this).find('td.td_lteam').find('a').attr('href').split('/')
                temp['home']=parseInt(homeTeam[4])
                var awayTeam = $(this).find('td.td_rteam').find('a').attr('href').split('/')
                temp['away']=parseInt(awayTeam[4])

                data[future].push(temp)
            })

            return data

        },JSON.stringify(data),past,future);
    })


}


function bothMatches(url){
    "use strict";

    this.thenOpen(url).then(function(){

        data = this.evaluate(function(data) {
            data=JSON.parse(data)

            $('div.team_a').find('tbody').find('tr').eq(1).find('td').each(function(){
                data['homeInfo']['overall'].push($(this).text())
            })
            $('div.team_a').find('tbody').find('tr').eq(2).find('td').each(function(){
                data['homeInfo']['home'].push($(this).text())
            })
            $('div.team_a').find('tbody').find('tr').eq(3).find('td').each(function(){
                data['homeInfo']['away'].push($(this).text())
            })
            $('div.team_b').find('tbody').find('tr').eq(1).find('td').each(function(){
                data['awayInfo']['overall'].push($(this).text())
            })
            $('div.team_b').find('tbody').find('tr').eq(2).find('td').each(function(){
                data['awayInfo']['home'].push($(this).text())
            })
            $('div.team_b').find('tbody').find('tr').eq(3).find('td').each(function(){
                data['awayInfo']['away'].push($(this).text())
            })
            if(_.isEmpty($('#team_jiaozhan').find('table.pub_table'))){
                return data
            }
            $('#team_jiaozhan').find('table.pub_table').find('tbody').find('tr').slice(2).each(function(){
                var temp={}
                temp['match'] = $(this).find('td').eq(0).find('a').text()
                temp['match_catagory']=$(this).find('td').eq(0).find('a').attr('href')
                temp['date']=$(this).find('td').eq(1).text()
                var str=_.words($(this).find('td').eq(2).text())

                if(str.length===6){
                    temp['homeRank']=str[0]
                    temp['home']=str[1]
                    temp['homeFullTime']=str[2]
                    temp['awayFullTime']=str[3]
                    temp['away']=str[4]
                    temp['awayRank']=str[5]
                }else{
                    temp['home']=str[0]
                    temp['homeFullTime']=str[1]
                    temp['awayFullTime']=str[2]
                    temp['away']=str[3]
                }
                data['bothMatches'].push(temp)
            })

            return data;
        },JSON.stringify(data));


    })
}

function outputData(){
    "use strict";

    this.then(function(){

        delete data['undefined']
        delete data['']
        for(var key in data){
            if(_.isArray(data[key])){
                console.log(key)
                _.forEach(data[key],function(value,key){
                    console.log(JSON.stringify(value))
                })
            }else{
                console.log(key+':'+JSON.stringify(data[key]))
            }

        }

    })
}

function sendData(){
    "use strict";
    this.then(function(){
        data['links']=today['matches']
        this.evaluate(function(server,data){
            // data=JSON.parse(data)
            return JSON.parse(__utils__.sendAJAX(server,'POST',data,false,{
                contentType:"application/json",
                charset:"utf-8",
                dataType:"json"
            }))
        },server,JSON.stringify(data))
    })

}

//hahanew


casper.run(getData)