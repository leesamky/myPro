var fs=require('fs')
var path=require('path')
var s1=[1,2,3]
var s=path.resolve(__dirname,'./files')+'/1.txt'

fs.writeFileSync(s,JSON.stringify(s1))