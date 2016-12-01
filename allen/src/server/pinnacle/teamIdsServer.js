// this file to make the list of team ids to upload to server to run the casper to fetch the data

var fs=require('fs')
var _=require('lodash')
{
    let odds=JSON.parse(fs.readFileSync('odd.txt',{encoding:'utf-8'}))
    let name_league=JSON.parse(fs.readFileSync('1129.txt',{encoding:'utf-8'}))
    let pname={}
    _.forEach(name_league,function(league){
        "use strict";
        _.forEach(league['teams'],function(team){
            pname[team['pname']]=team
        })
    })
    console.log(_.keys(odds).length)
    let display=[]
    _.forEach(odds,function(odd){
        "use strict";
        if(!_.isUndefined(pname[odd['home']])&&!_.isUndefined(pname[odd['away']])){
            display.push(odd)
        }

    })
    let teamIds=[]
    _.forEach(display,function(match){
        "use strict";
        teamIds.push(pname[match['home']],pname[match['away']])
    })
    console.log(_.uniq(teamIds).length)
    // fs.writeFileSync('display.txt',JSON.stringify(_.orderBy(display,['starts','league','number'],['asc','asc','asc']),null,2),{encoding:'utf-8'})
}