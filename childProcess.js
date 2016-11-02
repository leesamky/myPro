

console.log('start')

for (let i=0;i<20;i++){
    getData()
}

function getData(){
    "use strict";

    var spawn=require('child_process').spawn,
        ls=spawn('casperjs',['--engine=slimerjs', '--disk-cache=true', 'getTeamInfo.js'])

    ls.on('close',function(code){
        console.log('thread end by'+code )
    })
}