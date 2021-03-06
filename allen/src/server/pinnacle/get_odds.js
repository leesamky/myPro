
var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var fs=require('fs')
var path=require('path')
var _=require('lodash')
global.odds={}
global.display=[]
global.update=false

function get_odds(options,callback){
    "use strict";
    setTimeout(function(){
        client.get_odds(options,function(error,result){
            "use strict";
            if(error){console.log(error)
            }
            else if(_.isEmpty(result)){
                // console.log('odds empty response')
                callback(null)
            }
            else{
                if(_.isEmpty(global.fixtures)){
                    console.log('no fixtures file')
                    callback(null)
                }else{
                    let leagueObj={}//{leagueid:leagueObj}
                    _.forEach(global.leagues,function(obj){
                        "use strict";
                        leagueObj[obj["id"]]=obj
                    })
                    // let file=JSON.parse(fs.readFileSync('fullMatch.txt',{encoding:'utf-8'}))
                    let leaguesOdd={}
                    _.forEach(result["leagues"],function(league){//remove the corners leagues
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
                        let temp=_.assign({},global.fixtures[match['matchId']],match)
                        if(!_.every([temp['spreads'],temp['moneyline'],temp['totals'],temp['teamTotal']],_.isUndefined)){
                            let num
                            if(temp.number===0){
                                num='FT'
                            }else if(temp.number===1){
                                num='FH'
                            }else{
                                num='SH'
                            }
                            global.odds[temp.matchId+num]=temp


                        }

                    })

                    // let name_league=JSON.parse(fs.readFileSync(__dirname+'/pNames.txt',{encoding:'utf-8'}))
                    // let pname={}
                    // _.forEach(name_league,function(league){
                    //     "use strict";
                    //     _.forEach(league['teams'],function(team){
                    //         pname[team['pname']]=team
                    //     })
                    // })

                    let display=[]
                    _.forEach(global.odds,function(oddObj,key,obj){
                        "use strict";
                        let odd=obj[key]
                        // fs.writeFileSync('temp.txt',JSON.stringify(odd,null,2),{encoding:'utf-8'})
                        // console.log(odd)
                        if(!_.isUndefined(global.pname[odd['home']])&&!_.isUndefined(global.pname[odd['away']])){
                            display.push(odd)
                        }

                    })

                    global.display= _.orderBy(display,['starts','league','matchId','number'],['asc','asc','asc','asc'])
                    global.updateDisplay=true
                    console.log('update display')
                    // fs.writeFileSync(options['since']+'result.txt',JSON.stringify(result,null,2),{encoding:'utf-8'})
                    //
                    // fs.writeFileSync(options['since']+'global.txt',JSON.stringify(global.display,null,2),{encoding:'utf-8'})
                    options['since']=result['last']
                    callback(null)
                }

            }
        })
    },6000)

}

module.exports=get_odds