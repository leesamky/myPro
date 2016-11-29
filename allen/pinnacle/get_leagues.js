var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var fs=require('fs')
global.leagues={}
var path=require('path')
function get_leagues(callback){
    "use strict";
    var options={
        sportId:29
    }
    client.get_leagues(options,function(error,results){
        "use strict";
        if(error){callback(error)}
        else{
            global.leagues=results
            let fileName=path.resolve(__dirname,'./files')+'/leagues.txt'
            fs.writeFileSync(fileName,JSON.stringify(results,null,2),{encoding:'utf-8'})
            callback(null)
        }
    })
}

module.exports=get_leagues