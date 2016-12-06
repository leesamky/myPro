var mongoose=require('mongoose')
var Todo=require('server/db/todoModel')
var express=require('express')
var app=express()

app.get('/',function(req,res){
    "use strict";
    Todo.find().
    exec(function(error,results){
        if(error){console.log(error)}
        else{res.jsonp(results)}
    })
})

app.post('/',function(req,res){
    "use strict";
    Todo.create(req.body,function(error,results){
        if(error){console.log(error)}
        else{res.send(results)}
    })
})

app.put('/:id',function(req,res){
    "use strict";
    Todo.findOneAndUpdate({_id:req.params.id},{$set:{task:req.body.task}},{new:true},function(error,result){
        if(error){console.log(error)}
        else{res.send(result)}
    })
})

app.delete('/:id',function(req,res){
    "use strict";
    Todo.findOneAndRemove({_id:req.params.id},function(error,result){
        if(error){console.log(error)}
        else{res.send('deleted')}
    })
})

module.exports=app