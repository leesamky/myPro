var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var sportsModel=require('./modelPinnacle').sports
var leagueModel=require('./modelPinnacle').leagues
var fs=require('fs')
var _=require('lodash')
var leagueObj={}//{leagueid:leagueObj}
// var corners=[]//the leagues which are corners

{
    let file=JSON.parse(fs.readFileSync('league.txt',{encoding:'utf-8'}))
    _.forEach(file,function(obj){
        "use strict";
        leagueObj[obj["id"]]=obj

    })
    // console.log(corners)

}
var fixtures={}
{
    let file=JSON.parse(fs.readFileSync('fixtures.txt',{encoding:'utf-8'}))
    let fixturesMatches=[]
    _.forEach(file["league"],function(matchObj){
        "use strict";
        fixturesMatches.push(matchObj)
    })
    // console.log(fixturesMatches.length)

    _.forEach(fixturesMatches,function(leagueMatches){//fixture with leagues
        "use strict";
        _.forEach(leagueMatches["events"],function(match){

            if(!_.isUndefined(leagueObj[leagueMatches["id"]])){
                match['leagueId']=leagueMatches["id"]
                match['league']=leagueObj[leagueMatches["id"]]['name']
                match['matchId']=match['id']
                delete match['id']
                fixtures[match['matchId']]=match
            }

        })
    })
    // console.log(_.orderBy(fixtures,['starts'],['desc']))
}
var odd=[]
{
    let file=JSON.parse(fs.readFileSync('fullMatch.txt',{encoding:'utf-8'}))
    let leaguesOdd={}
    _.forEach(file["leagues"],function(league){//remove the corners leagues
        "use strict";
        if(!_.includes(leagueObj[league["id"]]["name"],"Corners")){
            leaguesOdd[league['id']]=league
        }
    })
    let matchOdd=[]
    _.forEach(leaguesOdd,function(league){
        "use strict";
        _.forEach(league['events'],function(matches){

            _.forEach(matches['periods'],function(match){
                match['matchId']=matches['id']

                matchOdd.push(match)
            })
        })
    })

    _.forEach(matchOdd,function(match){
        "use strict";
        let temp=_.assign({},fixtures[match['matchId']],match)
        odd.push(temp)
    })

}

console.log(_.orderBy(odd,['starts','matchId','number'],['asc','asc','asc']))








var options={
    sportid:29,
    // leagueIds:[1980],
    // "last": 353797290,
    oddsFormat:'Decimal'
}




//
// client.get_odds(options,function(error,result){
//     "use strict";
//
//     fs.writeFileSync('fullMatch.txt',JSON.stringify(result,null,2),{encoding:'utf-8'})
//     console.log('write the fullMatch to fullMatch.txt')
//     // console.log(JSON.stringify(result,null,2))
//
//
// })

// client.get_fixtures(options,function(error,result){
//     "use strict";
//     if(error){console.log(error)}
//     else{
//         fs.writeFileSync('fixtures.txt',JSON.stringify(result,null,2),{encoding:'utf-8'})
//         console.log('write fixture to disk')
//     }
// })

// client.get_sports(null,function(error,result){
//     "use strict";
//     if(error){console.log(error)}
//     else{
//         fs.writeFileSync('sports.txt',JSON.stringify(result,null,2),{encoding:'utf-8'})
//     }
// })

// client.get_leagues(options,function(error,results){
//     "use strict";
//     if(error){console.log(error)}
//     else{
//         fs.writeFileSync('league.txt',JSON.stringify(results,null,2),{encoding:'utf-8'})
//         console.log('write league to disk')
//     }
// })
// leagueModel.find()
//     .exec(function(error,results){
//         "use strict";
//         if(error){console.log(error)}
//         else{
//             _.forEach(results,function(o){
//                 if(_.includes(o.name,'England')){
//                     console.log(JSON.stringify(o,null,2))
//                 }
//             })
//         }
//     })

// leagueModel.find({id:6820})
//     .exec(function(error,results){
//         "use strict";
//         console.log(results)
//     })