var obj= {
    "668821498FH": {
        "starts": "2016-12-03T00:15:00Z",
        "home": "Quilmes",
        "away": "Sarmiento Junin",
        "rotNum": "2001",
        "liveStatus": 2,
        "status": "I",
        "parlayRestriction": 2,
        "leagueId": 1740,
        "league": "Argentina - Primera Division",
        "matchId": 668821498,
        "lineId": 355760234,
        "number": 1,
        "cutoff": "2016-12-03T00:14:20Z",
        "maxSpread": 1000,
        "maxTotal": 1000,
        "spreads": [
            {
                "hdp": -0.25,
                "home": 2.29,
                "away": 1.68
            }
        ],
        "totals": [
            {
                "points": 0.75,
                "over": 1.862,
                "under": 2.02
            }
        ]
    }
}

var _=require('lodash')
console.log(_.values(obj))