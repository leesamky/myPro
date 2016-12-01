
var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var fs=require('fs')

function get_line(options){
    "use strict";
    client.get_line(options,function(error,result){
        "use strict";
        if(error){console.log(error)}
        else{
            console.log(result)
        }

    })
}

module.exports=get_line