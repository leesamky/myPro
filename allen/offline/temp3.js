var mongoose=require('mongoose')
var matchInfo=require('./model').matchInfo
var matchData=require('./model').matchData
var _=require('lodash')
matchInfo.find()
    .or([
        {homeId:753},
        {awayId:753}
    ])
    // .and([
    //     {matchGoals:{$gte:3}},
    //     {firstHalfGoals:{$lte:1}}
    // ])
    // .and({date:{$gte:new Date('2016-01-01')}})
    // .sort('-date')
    // .limit(5)
    .skip(100)
    .select({__id:0})

    .exec(function(error,results){
        "use strict";
        if(error){console.log(error)}
        else{
            console.log(results)
        }
    })