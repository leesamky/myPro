s1={
    "sportId": 29,
    "last": 91484316,
    "league": [
        {
            "id": 9320,
            "events": [
                {
                    "starts": "2016-12-01T13:00:00Z",
                    "home": "Vereya",
                    "away": "Beroe Stara Zagora",
                    "rotNum": "2986",
                    "liveStatus": 1,
                    "status": "O",
                    "parlayRestriction": 2,
                    "leagueId": 9320,
                    "league": "Bulgaria - A PFG",
                    "eventId": 669058667
                }
            ]
        }
    ]
}
var _=require('lodash')
s2={
    "sportId": 29,
    "last": 91484315,
    "league": [
        {
            "id": 9320,
            "events": [
                {
                    "starts": "2016-12-01T13:00:00Z",
                    "home": "Vereya",
                    "away": "Beroe Stara Zagora",
                    "rotNum": "2986",
                    "liveStatus": 1,
                    "status": "O",
                    "parlayRestriction": 2,
                    "leagueId": 9320,
                    "league": "Bulgaria - A PFG",
                    "eventId": 669058667
                }
            ]
        }
    ]
}

console.log(_.isEqual(s1,s2))