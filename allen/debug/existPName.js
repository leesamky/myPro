var _=require('lodash')
var fs=require('fs')

{
    let name_league=JSON.parse(fs.readFileSync('1128.txt',{encoding:'utf-8'}))
    let odd={}
    _.forEach(name_league,function(league){
        "use strict";
        _.forEach(league['teams'],function(team){
            odd[team['pname']]=team
        })
    })
    let matches=JSON.parse(fs.readFileSync('odd.txt',{encoding:'utf-8'}))

    let missingMatch=[]

    _.forEach(matches,function(match){
        "use strict";
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
    })
    missingMatch=_.groupBy(missingMatch,'league')
    fs.writeFileSync('missing',JSON.stringify(missingMatch,null,2),{encoding:'utf-8'})

}

// {
//     let matches=JSON.parse(fs.readFileSync('odd.txt',{encoding:'utf-8'}))
//     _.forEach(matches,function(match){
//         "use strict";
//         let temp={}
//         if(_.isUndefined(odd[match['home']])){
//             temp['league']=match['league']
//             temp['home']=match['home']
//             temp['starts']=match['starts']
//         }
//         if(_.isUndefined(odd[match['away']])){
//             temp['league']=match['league']
//             temp['away']=match['away']
//             temp['starts']=match['starts']
//         }
//         if(!_.isEmpty(temp)){
//             console.log(temp)
//         }
//     })
// }