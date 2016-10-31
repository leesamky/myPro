var teamInfoRouter=require('server/pages/todo')

module.exports=function(app){
    "use strict";
    app.use('/teamInfo',teamInfoRouter)
}