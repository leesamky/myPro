var mongoose=require('mongoose')
var matchInfo=require('./model').matchInfo
var matchData=require('./model').matchData

matchInfo.find()
    .and([{homeId:29},{awayId:93}])
    .select('-_id')
    .exec(function(error,results){
        "use strict";
        if(error){console.log(error)}
        else{
            console.log(results)
        }
    })