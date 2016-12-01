var express=require('express')
var app=express()


var pinnacle=require('pinnacle-sports')
var client=pinnacle.createClient('ZW764330','Hailan@001')
var fs=require('fs')
var path=require('path')
var get_odds=require('../pinnacle/get_odds')
var get_leagues=require('../pinnacle/get_leagues')
var get_fixtures=require('../pinnacle/get_fixtures')
var async=require('async')



var optionsOdds={
    sportId:29,
    oddsFormat:'DECIMAL'
}



async.forever(
    get_odds.bind(null,optionsOdds)
)

var optionsLeagues={
    sportId:29
}

async.forever(
    get_leagues.bind(null,optionsLeagues),
    function finish(err){
        "use strict";
        if(err){
            console.log(err)
        }
    }
)

var optionsFixtures={
    sportId:29
}

async.forever(
    get_fixtures.bind(null,optionsFixtures),
    function finish(err){
        "use strict";
        if(err){
            console.log(err)
        }
    }
)

module.exports=app