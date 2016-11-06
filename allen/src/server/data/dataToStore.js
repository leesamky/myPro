var teamInfo=require('server/db/model').teamInfo

module.exports=function(obj){
    "use strict";
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
                            console.log(JSON.stringify(obj))                                            //here can code to save to database
                        }
                    })
            }
        })
}