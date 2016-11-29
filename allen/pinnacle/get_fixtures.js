
var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var fs=require('fs')
var path=require('path')
global.fixtures={}
function get_fixtures(callback){
    "use strict";
    var options={
        sportId:29
    }
    client.get_fixtures(options,function(error,result){
        "use strict";
        if(error){console.log(error)}
        else{
            global.fixtures=result
            let fileName=path.resolve(__dirname,'./files')+'/fixtures.txt'
            fs.writeFileSync(fileName,JSON.stringify(result,null,2),{encoding:'utf-8'})
            callback(null)
        }
    })
}

module.exports=get_fixtures