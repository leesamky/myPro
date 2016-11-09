var mongoose=require('mongoose')
var _=require('lodash')
var request=require('request')
var getTodayMatch=require('./getTodayMatch')
var teamInfo=require('./model').teamInfo

function getTeamInfo(match,matchUrl){
    "use strict";
    var team=matchUrl[1].split('/')
    var teamId=parseInt(team[team.length-2])
    match['homeInfo']['teamId']=teamId
    teamInfo.findOne({teamId:teamId})
        .exec(function(err,result){
            if(err){console.log(err)}
            else{
                match['homeInfo']['gb_name']=result['gb_name']
                match['homeInfo']['en_name']=result['en_name']


            }
        })
    var team=matchUrl[2].split('/')
    var teamId=parseInt(team[team.length-2])
    match['awayInfo']['teamId']=teamId
    teamInfo.findOne({teamId:teamId})
        .exec(function(err,result){
            if(err){console.log(err)}
            else{
                match['awayInfo']['gb_name']=result['gb_name']
                match['awayInfo']['en_name']=result['en_name']


            }
        })

}

module.exports=getTeamInfo

