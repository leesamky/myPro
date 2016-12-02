var express=require('express')
var app=express()


// var matchInfoModel=require('server/db/model').matchInfo
var _=require('lodash')
//
var fs=require('fs')
var name_league

app.get('/matchIds',function(req,res){
    "use strict";
    // if(_.isEmpty(global.odds)){
    //     res.send('odds is not ready')
    // }else{
    //     let name_league=JSON.parse(fs.readFileSync(__dirname+'/pNames.txt',{encoding:'utf-8'}))
    //     let pname={}
    //     _.forEach(name_league,function(league){
    //         "use strict";
    //         _.forEach(league['teams'],function(team){
    //             pname[team['pname']]=team
    //         })
    //     })
    //     // console.log(_.keys(odds).length)
    //     let display=[]
    //     _.forEach(global.odds,function(oddObj,key,obj){
    //         "use strict";
    //         let odd=obj[key]
    //         fs.writeFileSync('temp.txt',JSON.stringify(odd,null,2),{encoding:'utf-8'})
    //         // console.log(odd)
    //         if(!_.isUndefined(pname[odd['home']])&&!_.isUndefined(pname[odd['away']])){
    //             display.push(odd)
    //         }
    //
    //     })
    //    global.display= _.orderBy(display,['starts','league','matchId','number'],['asc','asc','asc','asc'])
    //     fs.writeFileSync('globaldisplay.txt',JSON.stringify(global.display,null,2),{encoding:'utf-8'})
        res.send(global.display)
        // let teamIds=[]
        // _.forEach(display,function(match){
        //     "use strict";
        //     teamIds.push(pname[match['home']],pname[match['away']])
        // })
        // console.log(_.uniq(teamIds).length)
    // }

})




app.get('/missingMatches',function(req,res){
    "use strict";
    if(_.isEmpty(global.odds)){
        res.send('odds are not ready')
    }else{
        name_league=JSON.parse(fs.readFileSync(__dirname+'/pNames.txt',{encoding:'utf-8'}))

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