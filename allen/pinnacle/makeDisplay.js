var fs=require('fs')
var _=require('lodash')
function display(){
    "use strict";

    let name_league=JSON.parse(fs.readFileSync('pNames.txt',{encoding:'utf-8'}))
    let pname={}
    _.forEach(name_league,function(league){
        "use strict";
        _.forEach(league['teams'],function(team){
            pname[team['pname']]=team
        })
    })

    let display=[]
    _.forEach(global.odds,function(odd){
        "use strict";
        if(!_.isUndefined(pname[odd['home']])&&!_.isUndefined(pname[odd['away']])){
            display.push(odd)
        }

    })

    return _.orderBy(display,['starts','league','matchId','number'],['asc','asc','asc','asc'])
    // let teamIds=[]
    // _.forEach(display,function(match){
    //     "use strict";
    //     teamIds.push(pname[match['home']],pname[match['away']])
    // })
    // console.log(_.uniq(teamIds).length)

}

module.exports=display
