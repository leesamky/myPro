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

var teamIds=[]
var server='http://localhost:8080/matches/matchIds'

casper.userAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36")

// casper.options.onResourceReceived=function(casper,request){
//     "use strict";
//     console.log(request.url)
// }

casper.options.onResourceRequested=BypassTeam

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

function selectOptionByValue(selector, valueToMatch){
    this.evaluate(function(selector, valueToMatch){
        var select = document.querySelector(selector),
            found = false;
        Array.prototype.forEach.call(select.children, function(opt, i){
            if (!found && opt.value.indexOf(valueToMatch) !== -1) {
                select.selectedIndex = i;
                found = true;
            }
        });
        // dispatch change event in case there is some kind of validation
        var evt = document.createEvent("UIEvents"); // or "HTMLEvents"
        evt.initUIEvent("change", true, true);
        select.dispatchEvent(evt);
    }, selector, valueToMatch);
};

casper.userAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36")


function openPage(url){
    "use strict";
    this.open(url).then(function(){
        console.log('page opened')
    })
}


function getMatches(){
    "use strict";
    var data={'matches':[]}
    console.log('teamIds are '+teamIds)
    if(!_.isEmpty(teamIds)){
        var teamId=teamIds.pop()
        var url='http://liansai.500.com/team/'+teamId+'/teamfixture/'
        console.log(url)

        this.thenOpen(url,function(response){
            console.log(response['status'])
        }).then(function(){


            selectOptionByValue.apply(this,['#record','100'])
            console.log('click 100 games')
        })



        this.waitForResource(function testResource(resource){
            return resource.url.indexOf("records=100")>0
        },function onReceived(){

            console.log('load 100games')
        })
        //


        this.then(function(){
            this.click('a[hoa="2"]')
            // console.log(data['matches'].length)
        })

        //
        this.waitForResource(function testResource(resource){
            return resource.url.indexOf("hoa=2")>0
        },function onReceived(){
            // this.capture('final.png')
            data = this.evaluate(function (data) {
                data = JSON.parse(data)

                $('div.lcontent_full').find('tbody.his_table').find('tr').each(function () {
                    var temp = {}
                    var score = _.map(_.words($(this).find('td').eq(3).text()), _.parseInt)
                    if (_.isEmpty($(this).find('td').eq(0).find('a').text()) || _.isNaN(score[2])) {
                        return
                    }
                    temp['match'] = $(this).find('td').eq(0).find('a').text()

                    temp['matchId'] = parseInt($(this).attr('id'))

                    temp['date'] = $(this).find('td.td_time').text()
                    var homeTeam = $(this).find('td.td_lteam').find('a').attr('href').split('/')
                    temp['homeId'] = parseInt(homeTeam[4])
                    var awayTeam = $(this).find('td.td_rteam').find('a').attr('href').split('/')
                    temp['awayId'] = parseInt(awayTeam[4])

                    temp['homeFullTime'] = score[0]
                    temp['awayFullTime'] = score[1]
                    temp['homeFirstHalf'] = score[2]
                    temp['awayFirstHalf'] = score[3]

                    data['matches'].push(temp)

                });
                // data['matches'].push(1)
                return data
            },JSON.stringify(data))
            // console.log('totally'+(Date.now()-t).toString())
            // console.log('Total away matches:'+data['matches'].length)
            // console.log(JSON.stringify(data))
        })


        this.then(function(){
            this.click('a[hoa="1"]')
            // console.log(data['matches'].length)
        })

        //
        this.waitForResource(function testResource(resource){
            return resource.url.indexOf("hoa=1")>0
        },function onReceived(){
            // this.capture('final.png')
            data = this.evaluate(function (data) {
                data = JSON.parse(data)

                $('div.lcontent_full').find('tbody.his_table').find('tr').each(function () {
                    var temp = {}
                    var score = _.map(_.words($(this).find('td').eq(3).text()), _.parseInt)
                    if (_.isEmpty($(this).find('td').eq(0).find('a').text()) || _.isNaN(score[2]) || _.isUndefined(score[2])) {
                        return
                    }
                    temp['match'] = $(this).find('td').eq(0).find('a').text()

                    temp['matchId'] = parseInt($(this).attr('id'))

                    temp['date'] = $(this).find('td.td_time').text()
                    var homeTeam = $(this).find('td.td_lteam').find('a').attr('href').split('/')
                    temp['homeId'] = parseInt(homeTeam[4])
                    var awayTeam = $(this).find('td.td_rteam').find('a').attr('href').split('/')
                    temp['awayId'] = parseInt(awayTeam[4])

                    temp['homeFullTime'] = score[0]
                    temp['awayFullTime'] = score[1]
                    temp['homeFirstHalf'] = score[2]
                    temp['awayFirstHalf'] = score[3]

                    data['matches'].push(temp)

                });
                // data['matches'].push(1)
                return data
            },JSON.stringify(data))
            // console.log('totally'+(Date.now()-t).toString())
            console.log('Total matches:'+data['matches'].length)
            sendData.call(this,data)
            // console.log(JSON.stringify(data))
        })
        this.run(getMatches)
    }else{

        getTeamIds.call(this)


    }

}

function getTeamIds(){
    "use strict";
    console.log('get ids from server')
    teamIds=this.evaluate(function(server){
            return JSON.parse(__utils__.sendAJAX(server,'GET',null,false))
        },server)

    console.log(teamIds)
    if(_.isEmpty(teamIds)){
        this.echo('all done')
        this.exit()
    }else{
        this.echo('get teams from the list')
        this.run(getMatches)
    }
}

function sendData(data){
    "use strict";
    var server='http://localhost:8080/matches'
    this.then(function(){

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

casper.start().then(function(){
    "use strict";
    this.echo('starting')
    teamIds=casper.evaluate(function(server){
        return JSON.parse(__utils__.sendAJAX(server,'GET',null,false))
    },server)
})
// t=Date.now()
casper.run(getMatches)
console.log('page opened')

