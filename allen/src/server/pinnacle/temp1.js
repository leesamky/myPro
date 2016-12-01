var fs=require('fs')

var _=require('lodash')

var odds=JSON.parse(fs.readFileSync('odds.txt',{encoding:'utf-8'}))
var obj={}
_.forEach(odds,function(odd){
    "use strict";
    var num
    if(odd.number===0){
        num='FT'
    }else if(odd.number===1){
        num='FH'
    }else{
        num='SH'
    }
    obj[odd.matchId+num]=odd
})

console.log(obj)