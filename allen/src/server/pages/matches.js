var express=require('express')
var app=express()
var async=require('async')
var getPastMatches=require('server/500/getPastMatches')
var mongoose=require('mongoose')

// var matchInfoModel=require('server/db/model').matchInfo
var _=require('lodash')
//
var fs=require('fs')
let name_league=JSON.parse(fs.readFileSync(__dirname+'/pNames.txt',{encoding:'utf-8'}))
let pname={}
_.forEach(name_league,function(league){
    "use strict";
    _.forEach(league['teams'],function(team){
        pname[team['pname']]=team
    })
})
app.get('/matchIds',function(req,res){
    "use strict";
        var teamIds=[]
        _.forEach(global.display,function(match){
            "use strict";

            teamIds.push(pname[match['home']]['teamId'],pname[match['away']]['teamId'])
        })
        teamIds=_.uniq(teamIds)
        async.eachLimit(teamIds,5,getPastMatches,function(err){
            mongoose.connection.close()
            console.log('done updating past matches')
        })
        res.send(teamIds)


})

app.get('/display',function(req,res){
    "use strict";
    if(global.update){
        let data=[]
        _.forEach(global.display,function(match){
            if(match.number===0){
                match['gb_home']=pname[match['home']]['gb_name']
                match['gb_away']=pname[match['away']]['gb_name']
                data.push(match)
            }
        })
        res.send(_.orderBy(data,['starts','league','matchId','number'],['asc','asc','asc','asc']))
        global.update=false
        // console.log('send to client')
    }else{
        res.send(null)
        // console.log('send null')
    }

})


app.get('/missingMatches',function(req,res){
    "use strict";
    if(_.isEmpty(global.odds)){
        res.send('odds are not ready')
    }else{
        // name_league=JSON.parse(fs.readFileSync(__dirname+'/pNames.txt',{encoding:'utf-8'}))

        let odd={}
        _.forEach(name_league,function(league){
            "use strict";
            _.forEach(league['teams'],function(team){
                odd[team['pname']]=team
            })
        })
        let missingMatch=[]

        _.forEach(global.odds,function(match){
            "use strict";
            if(match['number']===0){
                let temp={}
                if(_.isUndefined(odd[match['home']])){
                    temp['league']=match['league']
                    temp['home']=match['home']
                    temp['starts']=match['starts']
                }
                if(_.isUndefined(odd[match['away']])){
                    temp['league']=match['league']
                    temp['away']=match['away']
                    temp['starts']=match['starts']
                }
                if(!_.isEmpty(temp)){
                    missingMatch.push(temp)
                }
            }

        })
        missingMatch=_.groupBy(missingMatch,'league')
        fs.writeFileSync(__dirname+'/missingMatch.txt',JSON.stringify(missingMatch,null,2),{encoding:'utf-8'})
        res.send(missingMatch)
    }
})

module.exports=app