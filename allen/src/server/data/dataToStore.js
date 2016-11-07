var teamInfo=require('server/db/model').teamInfo
var matchInfo=require('server/db/model').matchInfo
var _=require('lodash')
var match=require('server/data/matchInfo.js')
module.exports=function(obj){
    "use strict";
    matchInfo.findOne({'matchId':obj['matchId']})
        .exec(function(error,result){
            if(error){console.log(error)}
            else{
                if(!_.isEmpty(result)){
                    console.log(obj.matchId+' already exitst')
                }else{
                    teamInfo.findOne({'teamId':obj['awayId']})
                        .exec(function(error,result){
                            if(error){console.log(error)}
                            else{
                                obj['away']=result['en_name']

                                teamInfo.findOne({'teamId':obj['homeId']})//second query
                                    .exec(function(error,result){
                                        if(error){console.log(error)}
                                        else{
                                            obj['home']=result['en_name']
                                            obj['homeSecondHalf']=obj['homeFullTime']-obj['homeFirstHalf']
                                            obj['awaySecondHalf']=obj['awayFullTime']-obj['awayFirstHalf']
                                            obj['date']=new Date(obj['date'])
                                            obj['matchGoals']=obj['homeFullTime']+obj['awayFullTime']
                                            obj['firstHalfGoals']=obj['homeFirstHalf']+obj['awayFirstHalf']
                                            obj['secondHalfGoals']=obj['homeSecondHalf']+obj['awaySecondHalf']
                                            matchInfo.create(obj,function(error,results){
                                                if(error){console.log(error)}
                                                else{
                                                    console.log(results)
                                                }
                                            })
                                        }
                                    })
                            }
                        })
                }
            }
        })



}