var express=require('express')
var app=express()

var matchInfoModel=require('server/db/model').matchInfo
var _=require('lodash')

var todayMatch=[]

var fs=require('fs')
var _=require('lodash')


var file=JSON.parse(fs.readFileSync(__dirname+'/teamInfo.txt',{encoding:'utf-8'}))
var teamIds=[]
var teamInfo=[]
_.forEach(file,function(obj,index,arr){
    "use strict";
    if(!_.isEmpty(obj)) {
        teamIds.push(obj.teamId)
        teamInfo[obj.teamId]=obj
    }
})

teamIds=_.chunk(teamIds,1)
// teamIds=[[1,2,3,4]]
// console.log('TEAM IDS TOTALLY'+teamIds.length)
app.get('/matchIds',function(req,res){
    "use strict";
    if(!_.isEmpty(teamIds)){
        res.send(teamIds.pop())
    }else{
        res.send(null)
    }

})

app.get('/',function(req,res){
    "use strict";
    res.send([teamIds.length])



})



app.post('/',function(req,res){
    "use strict";

    res.send('success')
    // console.log(JSON.stringify(req.body['matches'],null,2))
    var matches=_.map(req.body['matches'],objToSave)
    console.log(req.body['teamId']+'  total matches:'+matches.length)

    if(matches.length){
        matchInfoModel.create(matches)
    }


})

app.put('/:id',function(req,res){
    "use strict";
    // Todo.findOneAndUpdate({_id:req.params.id},{task:req.body.task,isCompleted:req.body.isCompleted},{new:true},function(error,results){
    //     if(error){console.log(error)}
    //     else{res.send(results)}
    // })
})

app.delete('/:id',function(req,res){
    "use strict";
    // Todo.findOneAndRemove({_id:req.params.id},function(error,results){
    //     if(error){console.log(error)}
    //     else{res.send(results)}
    // })
})


function objToSave(obj){
    "use strict";
    obj['away']=_.isUndefined(teamInfo[obj.awayId]['en_name'])?'':teamInfo[obj.awayId]['en_name']
    obj['away_cn']=_.isUndefined(teamInfo[obj.awayId]['gb_name'])?'':teamInfo[obj.awayId]['gb_name']
    obj['home']=_.isUndefined(teamInfo[obj.homeId]['en_name'])?'':teamInfo[obj.homeId]['en_name']
    obj['home_cn']=_.isUndefined(teamInfo[obj.homeId]['gb_name'])?'':teamInfo[obj.homeId]['gb_name']
    obj['homeSecondHalf']=obj['homeFullTime']-obj['homeFirstHalf']
    obj['awaySecondHalf']=obj['awayFullTime']-obj['awayFirstHalf']
    obj['date']=new Date(obj['date']+'GMT-0000')//something wrong
    obj['matchGoals']=obj['homeFullTime']+obj['awayFullTime']
    obj['firstHalfGoals']=obj['homeFirstHalf']+obj['awayFirstHalf']
    obj['secondHalfGoals']=obj['homeSecondHalf']+obj['awaySecondHalf']
    return obj
}

module.exports=app