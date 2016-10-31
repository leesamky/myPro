var express=require('express')
var app=express()
var PORT=3001
var bodyParser=require('body-parser')
var path=require('path')
var teamInfo=require('server/router')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

teamInfo(app)

app.all('/',function(req,res){
    "use strict";
    res.sendFile(path.join(__dirname,'public/index.html'))
})

app.listen(PORT,function(){
    "use strict";
    console.log('Server is listening on PORT '+PORT)
})