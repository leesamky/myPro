

console.log('start')

for (let i=0;i<10;i++){
    getData()
}

function getData(){
    "use strict";

    var spawn=require('child_process').spawn,
        ls=spawn('casperjs',['--engine=slimerjs', '--disk-cache=true', 'casperGetMatches2.js'])

    ls.on('close',function(code){
        console.log('thread end by'+code )
    })
}