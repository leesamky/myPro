var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var fs=require('fs')
var _=require('lodash')
global.leagues={}
var path=require('path')
function get_leaguesNow(options){
    "use strict";

    client.get_leagues(options,function(error,results){
        "use strict";
        if(error){console.log(error)}
        else if(_.isEmpty(results)){
            console.log('leagues Empty Response')
        }
        else{
            global.leagues=results
            console.log('get the leagues')
            // let fileName=path.resolve(__dirname,'./files')+'/leagues.txt'
            // fs.writeFileSync(fileName,JSON.stringify(results,null,2),{encoding:'utf-8'})
        }
    })


}

module.exports=get_leaguesNow