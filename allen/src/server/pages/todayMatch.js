var express=require('express')
var app=express()
var teamInfo=require('server/db/model').teamInfo
var _=require('lodash')
var dataToStore=require('server/data/dataToStore.js')
var match=require('server/data/matchInfo.js')
//
// app.get('/teamList',function(req,res){
//     "use strict";
//     console.log(links.length)
//     if(_.isEmpty(links)){
//         res.send([])
//     }
//     res.send(links.pop())
//
// })

app.get('/',function(req,res){
    "use strict";
    // teamInfo.find()
    //     .exec(function(error,results){
    //         if(error){console.log(error)}
    //         else{res.send(results)}
    //     })
    res.send([])
})



app.post('/',function(req,res){
    "use strict";

    res.send('success')

    _.forEach(req.body['awayPastMatches'],function(match){
        dataToStore(match)
    })

    _.forEach(req.body['homePastMatches'],function(match){
        dataToStore(match)
    })

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