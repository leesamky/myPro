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
    stepTimeout:30000,
    waitTimeout:30000
})

var data={},
    t=Date.now(),
    teamIds={'list':[]}



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

function getTeamInfo(teamId){
    "use strict";
    var url="http://liansai.500.com/team/"+teamId+"/"

    this.thenOpen(url).then(function(){

        data = this.evaluate(function(data) {
            data=JSON.parse(data)
            data['gb_name'] = $('h2.lsnav_qdnav_name').text()
            data['en_name']=$('div.itm_name_en').text()
            return data;
        },JSON.stringify(data));
    })
}

var server='http://localhost:8080/teamInfo'
function sendData(teamId){
    "use strict";
    this.then(function(){
        if(_.isEmpty(data['gb_name'])){
            console.log(teamId+'does not exist')
            return
        }else{
            data['teamId']=teamId
        }
        data['Ids']=teamIds['list']
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



function getData(){

    "use strict";

    // console.log('page cost:'+(Date.now()-t).toString())
    t=Date.now()
    data={}

    if(!_.isEmpty(teamIds['list'])){
        var teamId=teamIds['list'].pop()
        getTeamInfo.call(this,teamId)
        sendData.call(this,teamId)
        this.run(getData)

    }else{
        this.echo('All Done')
        this.exit()
    }
}

var server_list='http://localhost:8080/teamInfo/teamList'
casper.start().then(function(){
    "use strict";
    console.log('starting')
    teamIds['list']=casper.evaluate(function(server_list){
        return JSON.parse(__utils__.sendAJAX(server_list,'GET',null,false))
    },server_list)
})

casper.then(function(){
    "use strict";
    if(_.isEmpty(teamIds['list'])){

        console.log('no list on the server')
        for (var i=1;i<=9385;i++){
            teamIds['list'].push(i)
        }
        console.log(teamIds['list'])
    }else{
        console.log('get list from server. Totally '+teamIds['list'].length)
    }
})
//hahanew


casper.run(getData)