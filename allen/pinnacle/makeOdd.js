var fs=require('fs')
var _=require('lodash')




function makeOdd(){
    "use strict";
    var leagueObj={}//{leagueid:leagueObj}
    {
        // let file=JSON.parse(fs.readFileSync('league.txt',{encoding:'utf-8'}))
        _.forEach(global.leagues,function(obj){
            "use strict";
            leagueObj[obj["id"]]=obj

        })


    }
    var fixtures={}
    {
        // let file=JSON.parse(fs.readFileSync('fixtures.txt',{encoding:'utf-8'}))
        let fixturesMatches=[]
        _.forEach(global.fixtures["league"],function(matchObj){
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
        // let file=JSON.parse(fs.readFileSync('fullMatch.txt',{encoding:'utf-8'}))
        let leaguesOdd={}
        _.forEach(global.fullMatches["leagues"],function(league){//remove the corners leagues
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
            if(!_.every([temp['spreads'],temp['moneyline'],temp['totals'],temp['teamTotal']],_.isUndefined)){
                odd.push(temp)
            }

        })

        // console.log(_.groupBy(odd,'matchId'))

    }
    return _.orderBy(odd,['starts','league','matchId','number'],['asc','asc','asc','asc'])
}

module.exports=makeOdd
