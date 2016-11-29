var _=require('lodash')
var request=require('request')
var cheerio=require('cheerio')
var iconv=require('iconv-lite')
var fs=require('fs')


{
    // get the file pname.txt contains the league name, home,away from odd file(pinnacle)
    // use it to find out which name is missing from database

    let file=JSON.parse(fs.readFileSync('odd.txt',{encoding:'utf-8'}))
    let pnames=[]
    _.forEach(file,function(obj){
        "use strict";
        if(!_.includes(obj['league'],'Cup') && obj['number']!==1){
            pnames.push(_.pick(obj,['home','away','league']))
        }
    })

    fs.writeFileSync('pnames.txt',JSON.stringify(_.groupBy(pnames,'league'),null,2),{encoding:'utf-8'})
    console.log('done')
}




// make the file leagueWithTeamName from 500.com to group the team names with the league

// var file=JSON.parse(fs.readFileSync('leagueWithTeams.txt',{encoding:'utf-8'}))
// var teams=JSON.parse(fs.readFileSync('teamInfo',{encoding:'utf-8'}))
//
//
//
//
//
// _.forEach(file,function(league){
//     "use strict";
//     _.forEach(league['teams'],function(teamId,index,arr){
//         arr[index]=teams[teamId]
//         arr[index]['league']=league['league']
//         arr[index]['pname']=''
//         delete arr[index]['_id']
//         delete arr[index]["__v"]
//
//     })
// })
//
// fs.writeFileSync('leagueWithTeamName.txt',JSON.stringify(file,null,2),{encoding:'utf-8'})
// console.log('done')