var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var sportsModel=require('./modelPinnacle').sports
var leagueModel=require('./modelPinnacle').leagues
var _=require('lodash')
var options={
    sportid:29,
    // leagueIds:[1980],
    // "last": 353758134,
    oddsFormat:'Decimal'
}


// function toDecimal(val){
//     "use strict";
//     if(val>0){
//         return ((val/100)+1)
//     }else if(val<0){
//         return (100/Math.abs(val)+1)
//     }else{
//         return val
//     }
//
// }
//
//
// function decimalOdd(o){
//     "use strict";
//     _.forEach(o['periods'],function(match){
//         if(!_.isEmpty(match['spreads'])){
//             _.forEach(match['spreads'],function(hdp){
//                 hdp.home=toDecimal(hdp.home)
//                 hdp.away=toDecimal(hdp.away)
//             })
//         }
//         if(!_.isEmpty(match['moneyline'])){
//             match['moneyline']['home']=toDecimal(match['moneyline']['home'])
//             match['moneyline']['away']=toDecimal(match['moneyline']['away'])
//             match['moneyline']['draw']=toDecimal(match['moneyline']['draw'])
//         }
//         if(!_.isEmpty(match['totals'])){
//             _.forEach(match['totals'],function(hdp){
//                 hdp.over=toDecimal(hdp.over)
//                 hdp.under=toDecimal(hdp.under)
//             })
//         }
//         if(!_.isEmpty(match['teamTotal'])){
//             match['teamTotal']['home']['over']=toDecimal(match['teamTotal']['home']['over'])
//             match['teamTotal']['home']['under']=toDecimal(match['teamTotal']['home']['under'])
//             match['teamTotal']['away']['over']=toDecimal(match['teamTotal']['away']['over'])
//             match['teamTotal']['away']['under']=toDecimal(match['teamTotal']['away']['under'])
//         }
//     })
//     // return o
// }


// var game={
//     "id": 660426671,
//     "periods": [
//         {
//             "lineId": 353731855,
//             "number": 0,
//             "cutoff": "2016-11-26T12:30:00Z",
//             "maxSpread": 4000,
//             "maxMoneyline": 2000,
//             "maxTotal": 3000,
//             "maxTeamTotal": 1000,
//             "spreads": [
//                 {
//                     "hdp": 1.5,
//                     "home": 118,
//                     "away": -127
//                 },
//                 {
//                     "altLineId": 1277676621,
//                     "hdp": 2,
//                     "home": -143,
//                     "away": 132
//                 },
//                 {
//                     "altLineId": 1277676623,
//                     "hdp": 1.75,
//                     "home": -106,
//                     "away": -100
//                 },
//                 {
//                     "altLineId": 1277676625,
//                     "hdp": 1.25,
//                     "home": 151,
//                     "away": -166
//                 },
//                 {
//                     "altLineId": 1277676627,
//                     "hdp": 1,
//                     "home": 216,
//                     "away": -248
//                 }
//             ],
//             "moneyline": {
//                 "home": 942,
//                 "away": -325,
//                 "draw": 528
//             },
//             "totals": [
//                 {
//                     "points": 3,
//                     "over": -126,
//                     "under": 114
//                 },
//                 {
//                     "altLineId": 1277676622,
//                     "points": 2.5,
//                     "over": -199,
//                     "under": 172
//                 },
//                 {
//                     "altLineId": 1277676624,
//                     "points": 2.75,
//                     "over": -162,
//                     "under": 143
//                 },
//                 {
//                     "altLineId": 1277676626,
//                     "points": 3.25,
//                     "over": 105,
//                     "under": -115
//                 },
//                 {
//                     "altLineId": 1277676628,
//                     "points": 3.5,
//                     "over": 130,
//                     "under": -144
//                 }
//             ],
//             "teamTotal": {
//                 "home": {
//                     "points": 0.5,
//                     "over": -119,
//                     "under": 105
//                 },
//                 "away": {
//                     "points": 2.25,
//                     "over": -128,
//                     "under": 112
//                 }
//             }
//         },
//         {
//             "lineId": 353731857,
//             "number": 1,
//             "cutoff": "2016-11-26T12:30:00Z",
//             "maxSpread": 2000,
//             "maxTotal": 2000,
//             "spreads": [
//                 {
//                     "hdp": 0.5,
//                     "home": 123,
//                     "away": -136
//                 }
//             ],
//             "totals": [
//                 {
//                     "points": 1.25,
//                     "over": -113,
//                     "under": 102
//                 }
//             ]
//         }
//     ]
// }
//
// console.log(JSON.stringify(decimalOdd(game),null,2))
// //

//
client.get_odds(options,function(error,result){
    "use strict";

    // _.forEach(result['leagues'][0]['events'],function(match) {
    //     decimalOdd(match)
    // })

    console.log(JSON.stringify(result,null,2))


})

// client.get_fixtures(options,function(error,result){
//     "use strict";
//     console.log(error)
//     console.log(JSON.stringify(result,null,2))
// })

// client.get_sports(null,function(error,result){
//     "use strict";
//     if(error){console.log(error)}
//     else{
//         sportsModel.create(result,function(error,result){
//             if(error){console.log(error)}
//             else{
//                 console.log(result)
//             }
//         })
//     }
// })

// client.get_leagues(options,function(error,results){
//     "use strict";
//     if(error){console.log(error)}
//     else{
//         leagueModel.create(results,function(error,result){
//             if(error){console.log(error)}
//             else{
//                 console.log(result)
//             }
//         })
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