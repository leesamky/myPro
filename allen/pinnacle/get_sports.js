
var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var fs=require('fs')

function get_sports(){
    "use strict";
    client.get_sports(null,function(error,result){
        "use strict";
        if(error){console.log(error)}
        else{
            fs.writeFileSync('sports.txt',JSON.stringify(result,null,2),{encoding:'utf-8'})
            console.log('write sports to sports.txt')
        }
    })
}

module.exports=get_sports

