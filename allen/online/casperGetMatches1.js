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

var teamIds=[29,39]

function openPage(url){
    "use strict";
    this.open(url).then(function(){
        console.log('page opened')
    })
}


function getMatches(){
    "use strict";
    var data={'matches':[]}
    if(!_.isEmpty(teamIds)){
        var teamId=teamIds.pop()
        var url='http://liansai.500.com/team/'+teamId+'/teamfixture/'
        console.log(url)
        this.thenOpen(url).then(function(){
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
            console.log('totally'+(Date.now()-t).toString())
            // console.log('Total away matches:'+data['matches'].length)
            // console.log(JSON.stringify(data))
        })
        this.run(getMatches)
    }else{
        this.echo('all done')
        this.exit()
    }

}




casper.start('starting')
t=Date.now()
casper.run(getMatches)
console.log('page opened')

