var matchInfo=require('./getMatchInfoParallel')
var mongoose=require('mongoose')
var todayMatch=require('./getTodayMatch')
var async=require('async')
var request=require('request')


todayMatch().then((val=>{
    "use strict";
    // console.log(val.slice(5,9))
    // val.forEach(function(val){
    //     console.log(val[3])
    // })
    console.log('get the data')
    console.log('totally: '+val.length)
    async.eachLimit(val,1,matchInfo,function(err){
        mongoose.connection.close()
        console.log('done')
    })

}))
// var matchUrl=[ '欧U19',
//     'http://liansai.500.com/team/5524/',
//     'http://liansai.500.com/team/5526/',
//     'http://odds.500.com/fenxi/shuju-581388.shtml',
//     'http://liansai.500.com/zuqiu-4090/',
//     '11-09&nbsp;19:00',
//     '资格赛' ]
//
// matchInfo(matchUrl)
//
// var matchInfo=require('./model').matchInfo
// var matchData=require('./model').matchData
//     matchInfo.find()
//         .exec(function(err,results){
//             "use strict";
//             if(err){console.log(err)}
//             else{
//                 console.log(results.length)
//                 matchData.find()
//                     .exec(function(err,result){
//                         if(err){console.log(err)}
//                         else{
//                             console.log(JSON.stringify(result,null,2))
//                             mongoose.disconnect()
//                         }
//                     })
//             }
//         })
// var dataObj=[
//     [1,2,3],
//     [2,3,4]
// ]

// function test(item,callback){
//     "use strict";
//     console.log(item); // print the key
//     callback(); // tell async that the iterator has completed

// }
// async.forEach(dataObj, test, function(err) {
//     console.log('iterating done');
// });