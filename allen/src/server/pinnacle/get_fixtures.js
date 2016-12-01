
var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var fs=require('fs')
var path=require('path')
var _=require('lodash')
global.fixtures={}
function get_fixtures(options,callback){
    "use strict";
    setTimeout(function(){
        client.get_fixtures(options,function(error,result){
            "use strict";
            if(error){
                console.log(error)
            }else if(_.isEmpty(result)){
                console.log('fixtures Response Empty')
                callback(null)
            }
            else{
                if(_.isEmpty(global.leagues)){
                    console.log('no leagues file')
                    callback(null)
                }else{
                    let leagueObj={}//{leagueid:leagueObj}
                    _.forEach(global.leagues,function(obj){
                        "use strict";
                        leagueObj[obj["id"]]=obj
                    })
                    // global.fixtures={}

                    // let file=JSON.parse(fs.readFileSync('fixtures.txt',{encoding:'utf-8'}))
                    let fixturesMatches=[]
                    _.forEach(result["league"],function(matchObj){
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
                                global.fixtures[match['matchId']]=match
                            }

                        })
                    })
                    // console.log(_.orderBy(fixtures,['starts'],['desc']))

                    options['since']=result['last']
                    callback()
                }


            }
        })
    },6000)

}

module.exports=get_fixtures