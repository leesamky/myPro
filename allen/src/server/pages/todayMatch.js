var express=require('express')
var app=express()
var teamInfo=require('server/db/model').teamInfo
var _=require('lodash')
var dataToStore=require('server/data/dataToStore.js')
var match=require('server/data/matchInfo.js')
var todayMatch=[]
//
app.get('/matchList',function(req,res){
    "use strict";
    console.log(todayMatch.length)
    if(_.isEmpty(todayMatch)){
        res.send(null)
    }
    res.send(todayMatch.pop())

})

app.get('/',function(req,res){
    "use strict";
    // teamInfo.find()
    //     .exec(function(error,results){
    //         if(error){console.log(error)}
    //         else{res.send(results)}
    //     })
    if(_.isEmpty(todayMatch)){
        res.send(null)
    }else{
        res.send(todayMatch)
    }

})



app.post('/',function(req,res){
    "use strict";

    res.send('success')
    todayMatch=req.body['matches']

    console.log(JSON.stringify(req.body))

    // var d2=new match(d1,d1.awayId)
    // console.log(JSON.stringify(d2))
    // teamInfo.create(data,function(error,results){
    //     if(error){console.log(error)}
    //     else{console.log(results)}
    // })

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

module.exports=app