var fs=require('fs')
var _=require('lodash')
var teamInfo=JSON.parse(fs.readFileSync('teamInfo',{encoding:'utf-8'}))
var teamName=[]
_.forEach(teamInfo,function(o){
    "use strict";
    if(!_.isEmpty(o)){
        if(o['en_name'].endsWith(' FC')){
            teamName.push(o['en_name'].slice(0,-3))
        }else{
            teamName.push(o['en_name'])
        }

    }
})

fs.writeFileSync('teamName.txt',JSON.stringify(teamName,null,2),{encoding:'utf-8'})

// {
//     let odd=JSON.parse(fs.readFileSync('odd.txt',{encoding:'utf-8'}))
//     let oddName=[]
//     _.forEach(odd,function(obj){
//         "use strict";
//         oddName.push(_.pick(obj,['home','away','league']))
//     })
//     _.forEach(oddName,function(obj){
//         "use strict";
//         if(!_.includes(teamName,obj.home)){
//             console.log(obj)
//         }
//     })
// }