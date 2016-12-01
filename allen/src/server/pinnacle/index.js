const get_leagues=require('./get_leagues')
const get_sports=require('./get_sports')
const get_fixtures=require('./get_fixtures')
const get_odds=require('./get_odds')
const get_line=require('./get_line')
const place_bet=require('./place_bet')
const makeOdd=require('./makeOdd')
const uuid=require('uuid')
var async=require('async')
var _=require("lodash")
global.odds=[]
var path=require('path')
var missingPName=require('./missingPName')
var fs=require('fs')
var display=require('./makeDisplay')
// var options={
//     uniqueRequestId:uuid(),
//     acceptBetterLine:true,
//     stake:1,
//     winRiskStake:'RISK',
//     sportId:29,
//     eventId:665292973,
//     periodNumber:0,
//     betType:'MONEYLINE',
//     team:'Draw',
//     oddsFormat:'Decimal',
//     lineId: 355210131
// }



// get_leagues()
// get_sports()
// get_fixtures()
// get_odds()
// get_line(options)
// place_bet(options)

async.series([get_fixtures,get_odds,get_leagues],function(err){
    "use strict";
    if(err){console.log(err)}
    else{
        global.odds=makeOdd()//make odd file
        let fileName=path.resolve(__dirname,'./files')+'/odds.txt'
        fs.writeFileSync(fileName,JSON.stringify(global.odds,null,2),{encoding:'utf-8'})
        missingPName()//make missing file
        global.display=display()//make display file
        fileName=path.resolve(__dirname,'./files')+'/display.txt'
        fs.writeFileSync(fileName,JSON.stringify(global.display,null,2),{encoding:'utf-8'})

        console.log('done')
    }
})