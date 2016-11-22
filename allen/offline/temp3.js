var mongoose=require('mongoose')
var matchInfo=require('./model').matchInfo
var matchData=require('./model').matchData
var _=require('lodash')

var arr=[
    { league: '斯伐超', leagueId: 3917 },
    { league: '斯伐超', leagueId: 3917 },
    { league: '斯伐超', leagueId: 3917 },
    { league: '斯伐超', leagueId: 3917 },
    { league: '斯伐超', leagueId: 3917 },
    { league: '斯伐超', leagueId: 3917 },
    { league: '斯伐超', leagueId: 3917 },
    { league: '斯伐超', leagueId: 3917 },
    { league: '斯伐超', leagueId: 3917 },
    { league: '斯伐超', leagueId: 3917 }
]

// console.log(_.uniqWith(arr,_.isEqual))
matchInfo.find({date:{$gte:new Date('2016-01-01')}})

    // .and([
    //     {matchGoals:{$gte:3}},
    //     {firstHalfGoals:{$lte:1}}
    // ])
    // .and({date:{$gte:new Date('2016-01-01')}})
    // .sort('-date')
    // .limit(5)
    // .skip(100)
    .select('-_id league leagueId')

    .exec(function(error,results){
        "use strict";
        if(error){console.log(error)}
        else{
            console.log(_.uniqWith(JSON.parse(JSON.stringify(results)),_.isEqual))
        }
    })