var mongoose=require('mongoose')
var Schema=mongoose.Schema

mongoose.connect('mongodb://localhost/teamInfo')

var teamInfoSchema=Schema({
    en_name:String,
    gb_name:String,
    teamId:Number
})

module.exports.teamInfo=mongoose.model('teamInfo',teamInfoSchema)