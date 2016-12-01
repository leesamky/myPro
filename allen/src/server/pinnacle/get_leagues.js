var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var fs=require('fs')
var _=require('lodash')
global.leagues={}
var path=require('path')
function get_leagues(options,callback){
    "use strict";
    setTimeout(function(){
        client.get_leagues(options,function(error,results){
            "use strict";
            if(error){callback(error)}
            else if(_.isEmpty(results)){
                console.log('leagues Empty Response')
                callback(null)
            }
            else{
                global.leagues=results
                console.log('get the leagues')
                // let fileName=path.resolve(__dirname,'./files')+'/leagues.txt'
                // fs.writeFileSync(fileName,JSON.stringify(results,null,2),{encoding:'utf-8'})
                callback(null)
            }
        })
    },60000)

}

module.exports=get_leagues