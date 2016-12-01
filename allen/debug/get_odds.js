
var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var fs=require('fs')
var path=require('path')
global.fullMatches={}

function get_odds(){
    "use strict";
    var options={
        sportId:29,
        "last": 355441466,
        oddsFormat:'DECIMAL'
    }
    client.get_odds(options,function(error,result){
        "use strict";
        if(error){console.log(error)}
        else{
            global.fullMatches=result
            let fileName=path.resolve(__dirname,'./files')+'/updateMatches.txt'
            fs.writeFileSync(fileName,JSON.stringify(result,null,2),{encoding:'utf-8'})

        }

    })
}

get_odds()