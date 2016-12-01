var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var fs=require('fs')

function place_bet(options){
    "use strict";
    client.place_bet(options,function(error,result){
        "use strict";
        if(error){console.log(error)}
        else{
            console.log(result)
        }
    })
}

module.exports=place_bet