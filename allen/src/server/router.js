var getData=require('server/pages/pinnacle')
var todayMatch=require('server/pages/todayMatch')

module.exports=function(app){
    "use strict";
    app.use('/pinnacle',getData)
    app.use('/matches',todayMatch)
}