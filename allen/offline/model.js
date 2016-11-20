var mongoose=require('mongoose')
var Schema=mongoose.Schema
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/soccer')

var leagueSchema=Schema({
    leagueId:{
        type:Number,
        index:true,
        unique:true
    },
    leagueCN:{
        type:String,
        index:true,
    },
    teamsId:[],
    teamsCn:[]
})



var matchDataSchema=Schema({
    homeInfo:{},
    awayInfo:{},
    homePastMatches:[],
    homeFutureMatches:[],
    awayPastMatches:[],
    awayFutureMatches:[],
    bothMatches:[],
    league:{
        type:String,
        index:true
    },
    leagueId:{
        type:Number,
        index:true,
    },
    matchId:{
        type:Number,
        index:true,
        unique:true
    },
    date:{
        type:Date
    },
    round:{
        type:String
    }

})



var teamInfoSchema=Schema({
    en_name:{
        type:String,
    },
    gb_name:{
        type:String,
    },
    teamId:{
        type:Number,
        required:true,
        index:true,
        unique:true
    }
})

var matchInfoSchema=Schema({
    away:{
        type:String,
        index:true,
        required:true
    },
    awayFullTime:{
        type:Number,
        required:true
    },
    awayFirstHalf:{
        type:Number
    },
    awaySecondHalf:{
        type:Number
    },
    awayId:{
        type:Number,
        required:true,
        index:true
    },
    away_cn:{
        type:String,
        index:true,
    },
    date:{
        type:Date
    },
    home:{
        type:String,
        index:true,
        required:true
    },
    homeFirstHalf:{
        type:Number
    },
    homeSecondHalf:{
        type:Number
    },
    homeFullTime:{
        type:Number,
        required:true
    },
    homeId:{
        type:Number,
        required:true,
        index:true
    },
    home_cn:{
        type:String,
        index:true,
    },
    league:{
        type:String,
        index:true
    },
    leagueId:{
        type:Number,
        index:true,
    },
    matchId:{
        type:Number,
        index:true,
        unique:true
    },
    matchGoals:{
        type:Number,
        required:true
    },
    firstHalfGoals:{
        type:Number
    },
    secondHalfGoals:{
        type:Number
    }
})

module.exports.teamInfo=mongoose.model('teamInfo',teamInfoSchema)
module.exports.matchInfo=mongoose.model('matchInfo',matchInfoSchema)
module.exports.matchData=mongoose.model('matchData',matchDataSchema)
module.exports.league=mongoose.model('league',leagueSchema)