var _=require('lodash')
function Match(obj){
    "use strict";
    this.homeTeam=obj.home;
    this.awayTeam=obj.away;

    this[this.homeTeam+'FullTime']=obj.homeFulltime
    this[this.awayTeam+'FullTime']=obj.awayFulltime
    this[this.homeTeam+'FirstHalf']=obj.homeFirstHalf
    this[this.awayTeam+'FirstHalf']=obj.awayFirstHalf
    this[this.homeTeam+'SecondHalf']=obj.homeSecondHalf
    this[this.awayTeam+'SecondHalf']=obj.awaySecondHalf

    if(obj.homeFulltime>obj.awayFulltime){                                               //match result
        this[this.homeTeam+'WinsTheMatch']=true
        this[this.awayTeam+'LosesTheMatch']=true
    }else if(obj.homeFulltime===obj.awayFulltime){
        this[this.homeTeam+'TiesTheMatch']=true
        this[this.awayTeam+'TiesTheMatch']=true
    }else{
        this[this.homeTeam+'LosesTheMatch']=true
        this[this.awayTeam+'WinsTheMatch']=true
    }

    if(obj.homeFirstHalf>obj.awayFirstHalf){                                          //First Half result
        this[this.homeTeam+'WinsFirstHalf']=true
        this[this.awayTeam+'LosesFirstHalf']=true
    }else if(obj.homeFirstHalf===obj.awayFirstHalf){
        this[this.homeTeam+'TiesFirstHalf']=true
        this[this.awayTeam+'TiesFirstHalf']=true
    }else{
        this[this.homeTeam+'LosesFirstHalf']=true
        this[this.awayTeam+'WinsFirstHalf']=true
    }

    if(obj.homeFulltime>obj.awayFulltime){                                           //Full Time Double Chance
        this[this.homeTeam+'WinsOrTiesTheMatch']=true
        this[this.homeTeam+'WinsOrLosesTheMatch']=true
        this[this.awayTeam+'TiesOrLosesTheMatch']=true
        this[this.awayTeam+'WinsOrLosesTheMatch']=true
    }else if(obj.homeFulltime===obj.awayFulltime){
        this[this.homeTeam+'WinsOrTiesTheMatch']=true
        this[this.homeTeam+'TiesOrLosesTheMatch']=true
        this[this.awayTeam+'TiesOrLosesTheMatch']=true
        this[this.awayTeam+'WinsOrTiesTheMatch']=true
    }else{
        this[this.homeTeam+'TiesOrLosesTheMatch']=true
        this[this.homeTeam+'WinsOrLosesTheMatch']=true
        this[this.awayTeam+'WinsOrTiesTheMatch']=true
        this[this.awayTeam+'WinsOrLosesTheMatch']=true
    }

    if(obj.homeFirstHalf>obj.awayFirstHalf){                                       //First Half Double Chance
        this[this.homeTeam+'WinsOrTiesFirstHalf']=true
        this[this.homeTeam+'WinsOrLosesFirstHalf']=true
        this[this.awayTeam+'TiesOrLosesFirstHalf']=true
        this[this.awayTeam+'WinsOrLosesFirstHalf']=true
    }else if(obj.homeFirstHalf===obj.awayFirstHalf){
        this[this.homeTeam+'WinsOrTiesFirstHalf']=true
        this[this.homeTeam+'TiesOrLosesFirstHalf']=true
        this[this.awayTeam+'TiesOrLosesFirstHalf']=true
        this[this.awayTeam+'WinsOrTiesFirstHalf']=true
    }else{
        this[this.homeTeam+'TiesOrLosesFirstHalf']=true
        this[this.homeTeam+'WinsOrLosesFirstHalf']=true
        this[this.awayTeam+'WinsOrTiesFirstHalf']=true
        this[this.awayTeam+'WinsOrLosesFirstHalf']=true
    }


    if(obj.homeSecondHalf>obj.awaySecondHalf){                                       //Second Half Double Chance
        this[this.homeTeam+'WinsOrTiesSecondHalf']=true
        this[this.homeTeam+'WinsOrLosesSecondHalf']=true
        this[this.awayTeam+'TiesOrLosesSecondHalf']=true
        this[this.awayTeam+'WinsOrLosesSecondHalf']=true
    }else if(obj.homeSecondHalf===obj.awaySecondHalf){
        this[this.homeTeam+'WinsOrTiesSecondHalf']=true
        this[this.homeTeam+'TiesOrLosesSecondHalf']=true
        this[this.awayTeam+'TiesOrLosesSecondHalf']=true
        this[this.awayTeam+'WinsOrTiesSecondHalf']=true
    }else{
        this[this.homeTeam+'TiesOrLosesSecondHalf']=true
        this[this.homeTeam+'WinsOrLosesSecondHalf']=true
        this[this.awayTeam+'WinsOrTiesSecondHalf']=true
        this[this.awayTeam+'WinsOrLosesSecondHalf']=true
    }

    if(obj.homeSecondHalf>obj.awaySecondHalf){                                        //Second Half result
        this[this.homeTeam+'WinsSecondHalf']=true
        this[this.awayTeam+'LosesSecondHalf']=true
    }else if(obj.homeSecondHalf===obj.awaySecondHalf){
        this[this.homeTeam+'TiesSecondHalf']=true
        this[this.awayTeam+'TiesSecondHalf']=true
    }else{
        this[this.homeTeam+'LosesSecondHalf']=true
        this[this.awayTeam+'WinsSecondHalf']=true
    }

    if(obj.homeFirstHalf>obj.awayFirstHalf||obj.homeSecondHalf>obj.awaySecondHalf){      //homeWinEitherHalf
        this[this.homeTeam+'WinsEitherHalf']=true
    }else{
        this[this.homeTeam+'WinsEitherHalf']=false
    }

    if(obj.awayFirstHalf>obj.homeFirstHalf||obj.awaySecondHalf>obj.homeSecondHalf){      //awayWinsEitherHalf
        this[this.awayTeam+'WinsEitherHalf']=true
    }

                                                                                         //Team scores in halves
    if(obj.homeFirstHalf>0){
        this[this.homeTeam+'ScoresInFirstHalf']=true
    }

    if(obj.awayFirstHalf>0){
        this[this.awayTeam+'ScoresInFirstHalf']=true
    }

    if(obj.homeSecondHalf>0){
        this[this.homeTeam+'ScoresInSecondtHalf']=true
    }

    if(obj.awaySecondHalf>0){
        this[this.awayTeam+'ScoresInSecondtHalf']=true
    }

                                                                                           //keeps clean sheet
    if(obj.awayFulltime===0){
        this[this.homeTeam+'KeepsCleanSheet']=true
    }

    if(obj.homeFulltime===0){
        this[this.awayTeam+'KeepsCleanSheet']=true
    }

    //win to Nil
    if(obj.awayFulltime===0 && obj.homeFulltime>0){
        this[this.homeTeam+'WinsToNil']=true
    }

    if(obj.homeFulltime===0 && obj.awayFulltime>0){
        this[this.awayTeam+'WinToNil']=true
    }

                                                                                         // score in both halves
    if(obj.homeFirstHalf>0 && obj.homeSecondHalf>0){
        this[this.homeTeam+'ScoresInBothHalves']=true
    }

    if(obj.awayFirstHalf>0 && obj.awaySecondHalf>0){
        this[this.awayTeam+'ScoresInBothHalves']=true
    }

    if(obj.homeFulltime+0.5>obj.awayFulltime){                                   //FullTime asia handicap
        this[this.homeTeam+'+0.5']=true
    }else{
        this[this.awayTeam+'-0.5']=true
    }

    if(obj.homeFulltime+1.5>obj.awayFulltime){
        this[this.homeTeam+'+1.5']=true
    }else{
        this[this.awayTeam+'-1.5']=true
    }

    if(obj.homeFulltime+2.5>obj.awayFulltime){
        this[this.homeTeam+'+2.5']=true
    }else{
        this[this.awayTeam+'-2.5']=true
    }

    if(obj.homeFulltime+3.5>obj.awayFulltime){
        this[this.homeTeam+'+3.5']=true
    }else{
        this[this.awayTeam+'-3.5']=true
    }


    if(obj.homeFulltime-0.5>obj.awayFulltime){
        this[this.homeTeam+'-0.5']=true
    }else{
        this[this.awayTeam+'+0.5']=true
    }

    if(obj.homeFulltime-1.5>obj.awayFulltime){
        this[this.homeTeam+'-1.5']=true
    }else{
        this[this.awayTeam+'+1.5']=true
    }

    if(obj.homeFulltime-2.5>obj.awayFulltime){
        this[this.homeTeam+'-2.5']=true
    }else{
        this[this.awayTeam+'+2.5']=true
    }

    if(obj.homeFulltime-3.5>obj.awayFulltime){
        this[this.homeTeam+'-3.5']=true
    }else{
        this[this.awayTeam+'+3.5']=true
    }



    if(obj.homeFirstHalf+0.5>obj.awayFirstHalf){                                 //FirstHalf asia handicap
        this[this.homeTeam+'FirstHalf+0.5']=true
    }else{
        this[this.awayTeam+'FirstHalf-0.5']=true
    }

    if(obj.homeFirstHalf+1.5>obj.awayFirstHalf){
        this[this.homeTeam+'FirstHalf+1.5']=true
    }else{
        this[this.awayTeam+'FirstHalf-1.5']=true
    }

    if(obj.homeFirstHalf+2.5>obj.awayFirstHalf){
        this[this.homeTeam+'FirstHalf+2.5']=true
    }else{
        this[this.awayTeam+'FirstHalf-2.5']=true
    }

    if(obj.homeFirstHalf+3.5>obj.awayFirstHalf){
        this[this.homeTeam+'FirstHalf+3.5']=true
    }else{
        this[this.awayTeam+'FirstHalf-3.5']=true
    }


    if(obj.homeFirstHalf-0.5>obj.awayFirstHalf){
        this[this.homeTeam+'FirstHalf-0.5']=true
    }else{
        this[this.awayTeam+'FirstHalf+0.5']=true
    }

    if(obj.homeFirstHalf-1.5>obj.awayFirstHalf){
        this[this.homeTeam+'FirstHalf-1.5']=true
    }else{
        this[this.awayTeam+'FirstHalf+1.5']=true
    }

    if(obj.homeFirstHalf-2.5>obj.awayFirstHalf){
        this[this.homeTeam+'FirstHalf-2.5']=true
    }else{
        this[this.awayTeam+'FirstHalf+2.5']=true
    }

    if(obj.homeFirstHalf-3.5>obj.awayFirstHalf){
        this[this.homeTeam+'FirstHalf-3.5']=true
    }else{
        this[this.awayTeam+'FirstHalf+3.5']=true
    }

    if(obj.homeSecondHalf+0.5>obj.awaySecondHalf){                               //SecondHalf asia handicap
        this[this.homeTeam+'SecondHalf+0.5']=true
    }else{
        this[this.awayTeam+'SecondHalf-0.5']=true
    }

    if(obj.homeSecondHalf+1.5>obj.awaySecondHalf){
        this[this.homeTeam+'SecondHalf+1.5']=true
    }else{
        this[this.awayTeam+'SecondHalf-1.5']=true
    }

    if(obj.homeSecondHalf+2.5>obj.awaySecondHalf){
        this[this.homeTeam+'SecondHalf+2.5']=true
    }else{
        this[this.awayTeam+'SecondHalf-2.5']=true
    }

    if(obj.homeSecondHalf+3.5>obj.awaySecondHalf){
        this[this.homeTeam+'SecondHalf+3.5']=true
    }else{
        this[this.awayTeam+'SecondHalf-3.5']=true
    }


    if(obj.homeSecondHalf-0.5>obj.awaySecondHalf){
        this[this.homeTeam+'SecondHalf-0.5']=true
    }else{
        this[this.awayTeam+'SecondHalf+0.5']=true
    }

    if(obj.homeSecondHalf-1.5>obj.awaySecondHalf){
        this[this.homeTeam+'SecondHalf-1.5']=true
    }else{
        this[this.awayTeam+'SecondHalf+1.5']=true
    }

    if(obj.homeSecondHalf-2.5>obj.awaySecondHalf){
        this[this.homeTeam+'SecondHalf-2.5']=true
    }else{
        this[this.awayTeam+'SecondHalf+2.5']=true
    }

    if(obj.homeSecondHalf-3.5>obj.awaySecondHalf){
        this[this.homeTeam+'SecondHalf-3.5']=true
    }else{
        this[this.awayTeam+'SecondHalf+3.5']=true
    }

    if(obj.homeFulltime-0.5>0){                                             //hometeam match goals
        this[this.homeTeam+'MatchGoalsOver0.5']=true
    }

    if(obj.homeFulltime-1.5>0){
        this[this.homeTeam+'MatchGoalsOver1.5']=true
    }

    if(obj.homeFulltime-2.5>0){
        this[this.homeTeam+'MatchGoalsOver2.5']=true
    }

    if(obj.homeFulltime-3.5>0){
        this[this.homeTeam+'MatchGoalsOver3.5']=true
    }

    if(obj.homeFulltime-4.5>0){
        this[this.homeTeam+'MatchGoalsOver4.5']=true
    }

    if(obj.homeFirstHalf-0.5>0){                                            //hometeam FirstHalf goals
        this[this.homeTeam+'FirstHalfGoalsOver0.5']=true
    }

    if(obj.homeFirstHalf-1.5>0){
        this[this.homeTeam+'FirstHalfGoalsOver1.5']=true
    }

    if(obj.homeFirstHalf-2.5>0){
        this[this.homeTeam+'FirstHalfGoalsOver2.5']=true
    }

    if(obj.homeFirstHalf-3.5>0){
        this[this.homeTeam+'FirstHalfGoalsOver3.5']=true
    }

    if(obj.homeFirstHalf-4.5>0){
        this[this.homeTeam+'FirstHalfGoalsOver4.5']=true
    }

    if(obj.homeSecondHalf-0.5>0){                                           //hometeam SecondHalf goals
        this[this.homeTeam+'SecondHalfGoalsOver0.5']=true
    }

    if(obj.homeSecondHalf-1.5>0){
        this[this.homeTeam+'SecondHalfGoalsOver1.5']=true
    }

    if(obj.homeSecondHalf-2.5>0){
        this[this.homeTeam+'SecondHalfGoalsOver2.5']=true
    }

    if(obj.homeSecondHalf-3.5>0){
        this[this.homeTeam+'SecondHalfGoalsOver3.5']=true
    }

    if(obj.homeSecondHalf-4.5>0){
        this[this.homeTeam+'SecondHalfGoalsOver4.5']=true
    }

    if(obj.awayFulltime-0.5>0){                                          //awayteam match goals
        this[this.awayTeam+'MatchGoalsOver0.5']=true
    }

    if(obj.awayFulltime-1.5>0){
        this[this.awayTeam+'MatchGoalsOver1.5']=true
    }

    if(obj.awayFulltime-2.5>0){
        this[this.awayTeam+'MatchGoalsOver2.5']=true
    }

    if(obj.awayFulltime-3.5>0){
        this[this.awayTeam+'MatchGoalsOver3.5']=true
    }

    if(obj.awayFulltime-4.5>0){
        this[this.awayTeam+'MatchGoalsOver4.5']=true
    }

    if(obj.awayFirstHalf-0.5>0){                                         //awayteam FirstHalf goals
        this[this.awayTeam+'FirstHalfGoalsOver0.5']=true
    }

    if(obj.awayFirstHalf-1.5>0){
        this[this.awayTeam+'FirstHalfGoalsOver1.5']=true
    }

    if(obj.awayFirstHalf-2.5>0){
        this[this.awayTeam+'FirstHalfGoalsOver2.5']=true
    }

    if(obj.awayFirstHalf-3.5>0){
        this[this.awayTeam+'FirstHalfGoalsOver3.5']=true
    }

    if(obj.awayFirstHalf-4.5>0){
        this[this.awayTeam+'FirstHalfGoalsOver4.5']=true
    }

    if(obj.awaySecondHalf-0.5>0){                                        //awayteam SecondHalf goals
        this[this.awayTeam+'SecondHalfGoalsOver0.5']=true
    }

    if(obj.awaySecondHalf-1.5>0){
        this[this.awayTeam+'SecondHalfGoalsOver1.5']=true
    }

    if(obj.awaySecondHalf-2.5>0){
        this[this.awayTeam+'SecondHalfGoalsOver2.5']=true
    }

    if(obj.awaySecondHalf-3.5>0){
        this[this.awayTeam+'SecondHalfGoalsOver3.5']=true
    }

    if(obj.awaySecondHalf-4.5>0){
        this[this.awayTeam+'SecondHalfGoalsOver4.5']=true
    }
                                                                            //total match goals over/under
    if(obj.matchGoals>0.5){
        this['matchGoalsOver0.5']=true
    }

    if(obj.matchGoals>1.5){
        this['matchGoalsOver1.5']=true
    }

    if(obj.matchGoals>2.5){
        this['matchGoalsOver2.5']=true
    }

    if(obj.matchGoals>3.5){
        this['matchGoalsOver3.5']=true
    }

    if(obj.matchGoals>4.5){
        this['matchGoalsOver4.5']=true
    }

    if(obj.matchGoals>5.5){
        this['matchGoalsOver5.5']=true
    }

    if(obj.matchGoals>6.5){
        this['matchGoalsOver6.5']=true
    }

    if(obj.matchGoals<0.5){
        this['matchGoalsUnder0.5']=true
    }

    if(obj.matchGoals<1.5){
        this['matchGoalsUnder1.5']=true
    }

    if(obj.matchGoals<2.5){
        this['matchGoalsUnder2.5']=true
    }

    if(obj.matchGoals<3.5){
        this['matchGoalsUnder3.5']=true
    }

    if(obj.matchGoals<4.5){
        this['matchGoalsUnder4.5']=true
    }

    if(obj.matchGoals<5.5){
        this['matchGoalsUnder5.5']=true
    }

    if(obj.matchGoals<6.5){
        this['matchGoalsUnder6.5']=true
    }

    if(obj.firstHalfGoals>0.5){                                                 //First Half Goals
        this['firstHalfGoalsOver0.5']=true
    }

    if(obj.firstHalfGoals>1.5){
        this['firstHalfGoalsOver1.5']=true
    }

    if(obj.firstHalfGoals>2.5){
        this['firstHalfGoalsOver2.5']=true
    }

    if(obj.firstHalfGoals>3.5){
        this['firstHalfGoalsOver3.5']=true
    }

    if(obj.firstHalfGoals>4.5){
        this['firstHalfGoalsOver4.5']=true
    }

    if(obj.firstHalfGoals>5.5){
        this['firstHalfGoalsOver5.5']=true
    }

    if(obj.firstHalfGoals>6.5){
        this['firstHalfGoalsOver6.5']=true
    }

    if(obj.firstHalfGoals<0.5){
        this['firstHalfGoalsUnder0.5']=true
    }

    if(obj.firstHalfGoals<1.5){
        this['firstHalfGoalsUnder1.5']=true
    }

    if(obj.firstHalfGoals<2.5){
        this['firstHalfGoalsUnder2.5']=true
    }

    if(obj.firstHalfGoals<3.5){
        this['firstHalfGoalsUnder3.5']=true
    }

    if(obj.firstHalfGoals<4.5){
        this['firstHalfGoalsUnder4.5']=true
    }

    if(obj.firstHalfGoals<5.5){
        this['firstHalfGoalsUnder5.5']=true
    }

    if(obj.firstHalfGoals<6.5){
        this['firstHalfGoalsUnder6.5']=true
    }

    if(obj.secondHalfGoals>0.5){                                                 //Second Half Goals
        this['secondHalfGoalsOver0.5']=true
    }

    if(obj.secondHalfGoals>1.5){
        this['secondHalfGoalsOver1.5']=true
    }

    if(obj.secondHalfGoals>2.5){
        this['secondHalfGoalsOver2.5']=true
    }

    if(obj.secondHalfGoals>3.5){
        this['secondHalfGoalsOver3.5']=true
    }

    if(obj.secondHalfGoals>4.5){
        this['secondHalfGoalsOver4.5']=true
    }

    if(obj.secondHalfGoals>5.5){
        this['secondHalfGoalsOver5.5']=true
    }

    if(obj.secondHalfGoals>6.5){
        this['secondHalfGoalsOver6.5']=true
    }

    if(obj.secondHalfGoals<0.5){
        this['secondHalfGoalsUnder0.5']=true
    }

    if(obj.secondHalfGoals<1.5){
        this['secondHalfGoalsUnder1.5']=true
    }

    if(obj.secondHalfGoals<2.5){
        this['secondHalfGoalsUnder2.5']=true
    }

    if(obj.secondHalfGoals<3.5){
        this['secondHalfGoalsUnder3.5']=true
    }

    if(obj.secondHalfGoals<4.5){
        this['secondHalfGoalsUnder4.5']=true
    }

    if(obj.secondHalfGoals<5.5){
        this['secondHalfGoalsUnder5.5']=true
    }

    if(obj.secondHalfGoals<6.5){
        this['secondHalfGoalsUnder6.5']=true
    }

    if(obj.homeFulltime>0&&obj.awayFulltime>0){                                 //Full Time both team to score
        this['bothTeamToScoreInTheMatch']=true
    }else{
        this['notBothTeamToScoreInTheMatch']=true
    }

    if(obj.homeFirstHalf>0&&obj.awayFirstHalf>0){                               //Full Time both team to score
        this['bothTeamToScoreInFirstHalf']=true
    }else{
        this['notBothTeamToScoreInFirstHalf']=true
    }

    if(obj.homeSecondHalf>0&&obj.awaySecondHalf>0){                              //Full Time both team to score
        this['bothTeamToScoreInSecondHalf']=true
    }else{
        this['notBothTeamToScoreInSecondHalf']=true
    }

    if(obj.homeFirstHalf>obj.awayFirstHalf){                                          //First half/Full Time
        this['halfTime/fullTime']=this.homeTeam
    }else if(obj.homeFirstHalf===obj.awayFirstHalf){
        this['halfTime/fullTime']='tie'
    }else{
        this['halfTime/fullTime']=this.awayTeam
    }

    if(obj.homeFulltime>obj.awayFulltime){
        this['halfTime/fullTime']+=('/'+this.homeTeam)
    }else if(obj.homeFulltime===obj.awayFulltime){
        this['halfTime/fullTime']+=('/'+'tie')
    }else{
        this['halfTime/fullTime']+=('/'+this.awayTeam)
    }

    //match result/both team to score to be recalculated in object by put fulltime result and both team to score
}

var m={
    away:'Man Unit',
    home:'Liver Pool',
    awayFulltime:2,
    homeFulltime:2,
    awayFirstHalf:1,
    homeFirstHalf:0,
    awaySecondHalf:6,
    homeSecondHalf:6,
    matchGoals:5,
    firstHalfGoals:1,
    secondHalfGoals:2
}

var match1=new Match(m)
console.log(JSON.stringify(match1,2))