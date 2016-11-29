
var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var fs=require('fs')
var path=require('path')
global.fullMatches={}

function get_odds(callback){
    "use strict";
    var options={
        sportId:29,
        oddsFormat:'DECIMAL'
    }
    client.get_odds(options,function(error,result){
        "use strict";
        if(error){callback(error)}
        else{
            global.fullMatches=result
            let fileName=path.resolve(__dirname,'./files')+'/fullMatches.txt'
            fs.writeFileSync(fileName,JSON.stringify(result,null,2),{encoding:'utf-8'})
            callback(null)
        }

    })
}

module.exports=get_odds