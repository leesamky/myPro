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

casper.options.onResourceReceived=function(casper,request){
    "use strict";
    console.log(request.url)
}

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

casper.selectOptionByValue = function(selector, valueToMatch){
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



function getMatches(teamId){
    "use strict";
    var url='http://liansai.500.com/team/'+teamId+'/teamfixture/'
    this.open(url).then(function(){
        this.selectOptionByValue('#record','100')
        console.log('click 100 games')
    })

    this.waitForResource(function testResource(resource){
        return resource.url.indexOf("records=100")>0
    },function onReceived(){
        this.capture('100games.png')
        console.log('load 100games')

    })

    this.then(function(){
        this.click('a[hoa="2"]')
        console.log('click away team')
    })



    this.waitForResource(function testResource(resource){
        return resource.url.indexOf("hoa=2")>0
    },function onReceived(){
        this.capture('final.png')
        console.log('done')
        console.log('totally'+(Date.now()-t).toString())
    })
}













console.log('start')

casper.start('http://liansai.500.com/team/29/teamfixture/')
t=Date.now()
console.log('page opened')

casper.then(function(){

    // this.capture('new page.png')
    console.log('load page cost:'+(Date.now()-t).toString())
})



casper.then(function(){
    this.selectOptionByValue('#record','100')
    console.log('here')
})

casper.waitForResource(function testResource(resource){
    return resource.url.indexOf("records=100")>0
},function onReceived(){
    this.capture('100games.png')
    console.log('load 100games')

})

casper.then(function(){
    this.click('a[hoa="2"]')
    console.log('click away team')
})



casper.waitForResource(function testResource(resource){
    return resource.url.indexOf("hoa=2")>0
},function onReceived(){
    this.capture('final.png')
    console.log('done')
    console.log('totally'+(Date.now()-t).toString())
})

casper.run()