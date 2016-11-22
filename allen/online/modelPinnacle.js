var mongoose=require('mongoose')
var Schema=mongoose.Schema
mongoose.Promise=global.Promise
mongoose.connect('mongodb://localhost/pinnacle')

var sportsSchema=Schema({
    id:{
        type:Number,
        index:true,
        unique:true,
        required:true
    },
    name:{
        type:String,
        index:true,
        unique:true,
        required:true
    }
})

var leaguesSchema=Schema({
    id:{
        type:Number,
        index:true,
        unique:true,
        required:true
    },
    name:{
        type:String,
        index:true,
        required:true
    },
    homeTeamType:{
        type:String,
        index:true,
        required:true
    }
})

module.exports.sports=mongoose.model('sports',sportsSchema)
module.exports.leagues=mongoose.model('league',leaguesSchema)
