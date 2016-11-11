var matchInfo=require('./getMatchInfoParallel')
var mongoose=require('mongoose')
var matchUrl=[ '欧U19',
    'http://liansai.500.com/team/5524/',
    'http://liansai.500.com/team/5526/',
    'http://odds.500.com/fenxi/shuju-581388.shtml',
    'http://liansai.500.com/zuqiu-4090/',
    '11-09&nbsp;19:00',
    '资格赛' ]
//
// matchInfo(matchUrl)
//
var matchInfo=require('./model').matchInfo
var matchData=require('./model').matchData
    matchInfo.find()
        .exec(function(err,results){
            "use strict";
            if(err){console.log(err)}
            else{
                console.log(results.length)
                matchData.find()
                    .exec(function(err,result){
                        if(err){console.log(err)}
                        else{
                            console.log(JSON.stringify(result,null,2))
                        }
                    })
            }
        })

