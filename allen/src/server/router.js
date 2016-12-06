var getData=require('server/pages/pinnacle')
// var todayMatch=require('server/pages/todayMatch')
var matches=require('server/pages/matches')
// var todos=require('server/pages/todos.js')

module.exports=function(app){
    "use strict";
    app.use('/pinnacle',getData)
    // app.use('/matches',todayMatch)
    app.use('/matches',matches)
    // app.use('/todos',todos)
}