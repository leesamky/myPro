// read the file to get the global variable teamInfo and export the function getTeamInfo
var _=require('lodash')
var request=require('request')
var getTodayMatch=require('./getTodayMatch')
var fs=require('fs')

var file=JSON.parse(fs.readFileSync('teamInfo',{encoding:'utf-8'}))
global.teamInfo=[]


_.forEach(file,function(obj,index,arr){
    "use strict";
    if(!_.isEmpty(obj)){
        teamInfo[obj.teamId]=obj
    }

})



// console.log(global.teamInfo[5524],global.teamInfo[5526])


function getTeamInfo(match,matchUrl){
    "use strict";
    var team=matchUrl[1].split('/')
    var teamId=parseInt(team[team.length-2])

    if(!_.isEmpty(global.teamInfo[teamId])){//in case the database does not have the team
        match['homeInfo']['teamId']=teamId
        match['homeInfo']['gb_name']=global.teamInfo[teamId]['gb_name']
        match['homeInfo']['en_name']=global.teamInfo[teamId]['en_name']
    }


    var team=matchUrl[2].split('/')
    var teamId=parseInt(team[team.length-2])
    if(!_.isEmpty(global.teamInfo[teamId])) {//in case the database does not have the team


        match['awayInfo']['teamId'] = teamId
        match['awayInfo']['gb_name'] = global.teamInfo[teamId]['gb_name']
        match['awayInfo']['en_name'] = global.teamInfo[teamId]['en_name']

    }

    return match


}
// console.log(teamMissing.length)
// console.log(getTeamInfo(match,matchUrl))


module.exports=getTeamInfo



// var match={
//     'homeInfo':{
//         'league':{
//             'home':[],
//             'away':[],
//             'overall':[]
//         }
//     },
//     'awayInfo':{
//         'league':{
//             'home':[],
//             'away':[],
//             'overall':[]
//         }
//     },
//     'matchInfo':{},
//     'homePastMatches':[],
//     'homeFutureMatches':[],
//     'awayPastMatches':[],
//     'awayFutureMatches':[],
//     'bothMatches':[]
// }
//
// var matchUrl=[ '欧U19',
//     'http://liansai.500.com/team/5524/',
//     'http://liansai.500.com/team/5526/',
//     'http://odds.500.com/fenxi/shuju-626168.shtml',
//     'http://liansai.500.com/zuqiu-4090/',
//     '11-09&nbsp;19:00',
//     '资格赛' ]