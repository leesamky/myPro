var teamInfoRouter=require('server/pages/todo')
var todayMatch=require('server/pages/todayMatch')

module.exports=function(app){
    "use strict";
    app.use('/teamInfo',teamInfoRouter)
    app.use('/matches',todayMatch)
}