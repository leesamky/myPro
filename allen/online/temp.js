var fs=require('fs')
var _=require('lodash')
{
    let odd=JSON.parse(fs.readFileSync('odd.txt',{encoding:'utf-8'}))
    let home=[]
    let away=[]
    let p=JSON.parse(fs.readFileSync('matchesWithPname.txt',{encoding:'utf-8'}))
    let pName={}
    _.forEach(p,function(pmatch){
        "use strict";

        pName[pmatch['pname']]=pmatch
    })
    // console.log(pName)
    let noHome=[]
    _.forEach(odd,function(pMatch){
        "use strict";
        if(_.isUndefined(pName[pMatch['away']])){
            noHome.push(_.pick(pMatch,['away','league']))
        }
    })
    let skip=[
        "Germany - Oberliga Bayern Nord","Germany - Oberliga Bayern Sud",
        "Germany - Oberliga Baden-Wurttemberg","Guatemala - Liga Nacional",
        "Ukraine - Youth Championship U21","Czech Republic - U21 League",
        "Russia - Youth Championship U21","Brazil - U20","Israel - Liga Alef",
        "Czech Republic - U19 League","England - Northern Premier League",
        "England - Southern Premier League","England - Isthmian Premier League",
        "Bangladesh - Premier League",'Ukraine - U19 League',"Denmark - U19",
        "Germany - Oberliga Nordost Nord","Germany - Oberliga Nordost Sud",
        "Germany - Oberliga Rheinland-Pfalz/Saar","Germany - Oberliga Schleswig-Holstein",
        "Germany - Oberliga Bremen","Germany - Oberliga Hamburg","Germany - Oberliga Niedersachsen",
        "Portugal - U19 Championship","El Salvador - Primera Division","Honduras - Liga Nacional",
        "Indonesia - Soccer Championship","Ecuador - Serie B",
        "Germany - Oberliga Niederrhein","Germany - Oberliga Westfalen",
        "Czech Republic - FNL","Hong Kong - HKFA 1. Division","England - Premier League 2"
    ]
    let group=_.groupBy(noHome,'league')
    console.log(_.omit(group,skip))
}