var matchInfo=require('./model').matchInfo
var matchData=require('./model').matchData
var mongoose=require('mongoose')
var _=require('lodash')

matchData.find()
    .exec(function(error,results){
        "use strict";
        if(error){console.log(error)}
        else{
            _.forEach(results,function(result){
                console.log(JSON.stringify(result,null,2))
            })
        }
    })






