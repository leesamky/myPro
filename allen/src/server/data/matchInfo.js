var _=require('lodash')
function Match(obj,id){
    "use strict";

    this.homeTeam=obj.home;
    this.awayTeam=obj.away;
    var omit,team
    if(id===obj.homeId){
        omit=this.awayTeam
        team=this.homeTeam
    }else{
        omit=this.homeTeam
        team=this.awayTeam
    }


    this[this.homeTeam+'FullTime']=obj.homeFullTime
    this[this.awayTeam+'FullTime']=obj.awayFullTime
    this[this.homeTeam+'FirstHalf']=obj.homeFirstHalf
    this[this.awayTeam+'FirstHalf']=obj.awayFirstHalf
    this[this.homeTeam+'SecondHalf']=obj.homeSecondHalf
    this[this.awayTeam+'SecondHalf']=obj.awaySecondHalf
    if(obj.homeFullTime>obj.awayFullTime){                                               //match result
        this[this.homeTeam+'WinsTheMatch']=true
        this[this.awayTeam+'LosesTheMatch']=true
    }else if(obj.homeFullTime===obj.awayFullTime){
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

    if(obj.homeFullTime>obj.awayFullTime){                                           //Full Time Double Chance
        this[this.homeTeam+'WinsOrTiesTheMatch']=true
        this[this.homeTeam+'WinsOrLosesTheMatch']=true
        this[this.awayTeam+'TiesOrLosesTheMatch']=true
        this[this.awayTeam+'WinsOrLosesTheMatch']=true
    }else if(obj.homeFullTime===obj.awayFullTime){
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
    if(obj.awayFullTime===0){
        this[this.homeTeam+'KeepsCleanSheet']=true
    }

    if(obj.homeFullTime===0){
        this[this.awayTeam+'KeepsCleanSheet']=true
    }

    //win to Nil
    if(obj.awayFullTime===0 && obj.homeFullTime>0){
        this[this.homeTeam+'WinsToNil']=true
    }

    if(obj.homeFullTime===0 && obj.awayFullTime>0){
        this[this.awayTeam+'WinToNil']=true
    }

                                                                                         // score in both halves
    if(obj.homeFirstHalf>0 && obj.homeSecondHalf>0){
        this[this.homeTeam+'ScoresInBothHalves']=true
    }

    if(obj.awayFirstHalf>0 && obj.awaySecondHalf>0){
        this[this.awayTeam+'ScoresInBothHalves']=true
    }

    if(obj.homeFullTime+0.5>obj.awayFullTime){                                   //FullTime asia handicap
        this[this.homeTeam+'+0.5']=true
    }else{
        this[this.awayTeam+'-0.5']=true
    }

    if(obj.homeFullTime+1.5>obj.awayFullTime){
        this[this.homeTeam+'+1.5']=true
    }else{
        this[this.awayTeam+'-1.5']=true
    }

    if(obj.homeFullTime+2.5>obj.awayFullTime){
        this[this.homeTeam+'+2.5']=true
    }else{
        this[this.awayTeam+'-2.5']=true
    }

    if(obj.homeFullTime+3.5>obj.awayFullTime){
        this[this.homeTeam+'+3.5']=true
    }else{
        this[this.awayTeam+'-3.5']=true
    }


    if(obj.homeFullTime-0.5>obj.awayFullTime){
        this[this.homeTeam+'-0.5']=true
    }else{
        this[this.awayTeam+'+0.5']=true
    }

    if(obj.homeFullTime-1.5>obj.awayFullTime){
        this[this.homeTeam+'-1.5']=true
    }else{
        this[this.awayTeam+'+1.5']=true
    }

    if(obj.homeFullTime-2.5>obj.awayFullTime){
        this[this.homeTeam+'-2.5']=true
    }else{
        this[this.awayTeam+'+2.5']=true
    }

    if(obj.homeFullTime-3.5>obj.awayFullTime){
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

    if(obj.homeFullTime-0.5>0){                                             //hometeam match goals
        this[this.homeTeam+'MatchGoalsOver0.5']=true
    }

    if(obj.homeFullTime-1.5>0){
        this[this.homeTeam+'MatchGoalsOver1.5']=true
    }

    if(obj.homeFullTime-2.5>0){
        this[this.homeTeam+'MatchGoalsOver2.5']=true
    }

    if(obj.homeFullTime-3.5>0){
        this[this.homeTeam+'MatchGoalsOver3.5']=true
    }

    if(obj.homeFullTime-4.5>0){
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

    if(obj.awayFullTime-0.5>0){                                          //awayteam match goals
        this[this.awayTeam+'MatchGoalsOver0.5']=true
    }

    if(obj.awayFullTime-1.5>0){
        this[this.awayTeam+'MatchGoalsOver1.5']=true
    }

    if(obj.awayFullTime-2.5>0){
        this[this.awayTeam+'MatchGoalsOver2.5']=true
    }

    if(obj.awayFullTime-3.5>0){
        this[this.awayTeam+'MatchGoalsOver3.5']=true
    }

    if(obj.awayFullTime-4.5>0){
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

    if(obj.homeFullTime>0&&obj.awayFullTime>0){                                 //Full Time both team to score
        this['bothTeamsToScoreInTheMatch']=true
    }else{
        this['notbothTeamsToScoreInTheMatch']=true
    }

    if(obj.homeFirstHalf>0&&obj.awayFirstHalf>0){                               //Full Time both team to score
        this['bothTeamsToScoreInFirstHalf']=true
    }else{
        this['notbothTeamsToScoreInFirstHalf']=true
    }

    if(obj.homeSecondHalf>0&&obj.awaySecondHalf>0){                              //Full Time both team to score
        this['bothTeamsToScoreInSecondHalf']=true
    }else{
        this['notbothTeamsToScoreInSecondHalf']=true
    }


    _.forOwn(this,function(value,key,object){                                       // delete omit team
        if(_.startsWith(key,omit)){
            delete object[key]
        }
    })


    if(team===this.homeTeam){                                                       //first Half/Full Time

        if(obj.homeFirstHalf>obj.awayFirstHalf){

            this['halfTime/fullTime']='win/'
        }else if(obj.homeFirstHalf===obj.awayFirstHalf){
            this['halfTime/fullTime']='tie/'
        }else{
            this['halfTime/fullTime']='lose/'
        }
        
        if(obj.homeFullTime>obj.awayFullTime){

            this['halfTime/fullTime']+='win'
        }else if(obj['homeFullTime']==obj['awayFullTime']){


            this['halfTime/fullTime']+='tie'
        }else{
            this['halfTime/fullTime']+='lose'
        }
    }else{
        if(obj.awayFirstHalf>obj.homeFirstHalf){
            this['halfTime/fullTime']='win/'
        }else if(obj.awayFirstHalf===obj.homeFirstHalf){
            this['halfTime/fullTime']='tie/'
        }else{
            this['halfTime/fullTime']='lose/'
        }

        if(obj.awayFullTime>obj.homeFullTime){
            this['halfTime/fullTime']+='win'
        }else if(obj.awayFullTime===obj.homeFullTime){

            this['halfTime/fullTime']+='tie'
        }else{
            this['halfTime/fullTime']+='lose'
        }
    }

    if(team===this.homeTeam){                                                       //match result and both team to score


        if(obj.homeFullTime>obj.awayFullTime){

            this['matchResult/bothTeamsToScore']='win/'
        }else if(obj['homeFullTime']==obj['awayFullTime']){


            this['matchResult/bothTeamsToScore']='tie/'
        }else{
            this['matchResult/bothTeamsToScore']='lose/'
        }

        if(obj.homeFullTime>0&&obj.awayFullTime>0){
            this['matchResult/bothTeamsToScore']+='yes'
        }else{
            this['matchResult/bothTeamsToScore']+='no'
        }
    }else{


        if(obj.awayFullTime>obj.homeFullTime){
            this['matchResult/bothTeamsToScore']='win/'
        }else if(obj.awayFullTime===obj.homeFullTime){

            this['matchResult/bothTeamsToScore']='tie/'
        }else{
            this['matchResult/bothTeamsToScore']='lose/'
        }

        if(obj.awayFullTime>0&&obj.homeFullTime>0){
            this['matchResult/bothTeamsToScore']+='yes'
        }else{
            this['matchResult/bothTeamsToScore']+='no'
        }
    }

    if(team===this.homeTeam){                                                   //full time correct score
        this['correct score']=[obj.homeFullTime,obj.awayFullTime]
    }else{
        this['correct score']=[obj.awayFullTime,obj.homeFullTime]
    }


    if(team===this.homeTeam){                                                       //match result and total goals


        if(obj.homeFullTime>obj.awayFullTime){

            this['matchResult/totalGoalsAbove2.5']='win/'
        }else if(obj['homeFullTime']==obj['awayFullTime']){


            this['matchResult/totalGoalsAbove2.5']='tie/'
        }else{
            this['matchResult/totalGoalsAbove2.5']='lose/'
        }

        if(obj.matchGoals>2.5){
            this['matchResult/totalGoalsAbove2.5']+='yes'
        }else{
            this['matchResult/totalGoalsAbove2.5']+='no'
        }
    }else{


        if(obj.awayFullTime>obj.homeFullTime){
            this['matchResult/totalGoalsAbove2.5']='win/'
        }else if(obj.awayFullTime===obj.homeFullTime){

            this['matchResult/totalGoalsAbove2.5']='tie/'
        }else{
            this['matchResult/totalGoalsAbove2.5']='lose/'
        }

        if(obj.matchGoals>2.5){
            this['matchResult/totalGoalsAbove2.5']+='yes'
        }else{
            this['matchResult/totalGoalsAbove2.5']+='no'
        }
    }

    if(obj.matchGoals>2.5){                                                         //totalGoalsAbove2.5/bothTeamToScore
        this['totalGoalsAbove2.5/bothTeamToScore']='yes/'
    }else{
        this['totalGoalsAbove2.5/bothTeamToScore']='no/'
    }

    if(obj.homeFullTime>0&&obj.awayFullTime>0){
        this['totalGoalsAbove2.5/bothTeamToScore']+='yes'
    }else{
        this['totalGoalsAbove2.5/bothTeamToScore']+='no'
    }

    if(obj.matchGoals<2){
        this['under2Goals']=true
    }else if(obj.matchGoals<4){
        this['2or3Goals']=true
    }else{
        this['over3Goals']=true
    }

    if(obj.homeFirstHalf>0&&obj.awayFirstHalf>0){                                       //bothTeamsToScoreInBothHalves
        this['bothTeamsToScoreInBothHalves']='yes/'
    }else{
        this['bothTeamsToScoreInBothHalves']='no/'
    }

    if(obj.homeSecondHalf>0&&obj.awaySecondHalf>0){
        this['bothTeamsToScoreInBothHalves']+='yes'
    }else{
        this['bothTeamsToScoreInBothHalves']+='no'
    }

    if(obj.firstHalfGoals>obj.secondHalfGoals){                                     //halfWithMostGoals
        this['halfWithMostGoals']='first'
    }else if(obj.firstHalfGoals===obj.secondHalfGoals){
        this['halfWithMostGoals']='tie'
    }else{
        this['halfWithMostGoals']='second'
    }

    if(team===this.homeTeam){                                                   //highest score half
        if(obj.homeFirstHalf>obj.homeSecondHalf){
            this[team+'HighestScoreHalf']='first'
        }else if(obj.homeFirstHalf===obj.homeSecondHalf){
            this[team+'HighestScoreHalf']='tie'
        }else{
            this[team+'HighestScoreHalf']='second'
        }
    }else{
        if(obj.awayFirstHalf>obj.awaySecondHalf){
            this[team+'HighestScoreHalf']='first'
        }else if(obj.awayFirstHalf===obj.awaySecondHalf){
            this[team+'HighestScoreHalf']='tie'
        }else{
            this[team+'HighestScoreHalf']='second'
        }
    }

    if(team===this.homeTeam){                                                       //team odd/even
        if(obj.homeFullTime%2){
            this[team+'Odd/EvenGoals']='odd'
        }else{
            this[team+'Odd/EvenGoals']='even'
        }
    }else{
        if(obj.awayFullTime%2){
            this[team+'Odd/EvenGoals']='odd'
        }else{
            this[team+'Odd/EvenGoals']='even'
        }
    }

    if(team===this.homeTeam){                                                       //team first Half odd/even
        if(obj.homeFirstHalf%2){
            this[team+'FirstHalfOdd/EvenGoals']='odd'
        }else{
            this[team+'FirstHalfOdd/EvenGoals']='even'
        }
    }else{
        if(obj.awayFirstHalf%2){
            this[team+'FirstHalfOdd/EvenGoals']='odd'
        }else{
            this[team+'FirstHalfOdd/EvenGoals']='even'
        }
    }

    if(team===this.homeTeam){                                                       //team Second Half odd/even
        if(obj.homeSecondHalf%2){
            this[team+'SecondHalfOdd/EvenGoals']='odd'
        }else{
            this[team+'SecondHalfOdd/EvenGoals']='even'
        }
    }else{
        if(obj.awaySecondHalf%2){
            this[team+'SecondHalfOdd/EvenGoals']='odd'
        }else{
            this[team+'SecondHalfOdd/EvenGoals']='even'
        }
    }

    if(obj.matchGoals%2){                                                       //match Goals odd/even
        this['matchGoalsOdd/Even']='odd'
    }else{
        this['matchGoalsOdd/Even']='even'
    }

    if(obj.firstHalfGoals%2){                                                       //firstHalf Goals odd/even
        this['firstHalfGoalsOdd/Even']='odd'
    }else{
        this['firstHalfGoalsOdd/Even']='even'
    }

    if(obj.secondHalfGoals%2){                                                       //secondHalf Goals odd/even
        this['secondHalfGoalsOdd/Even']='odd'
    }else{
        this['secondHalfGoalsOdd/Even']='even'
    }





    //match result/both team to score to be recalculated in object by put fulltime result and both team to score
}




module.exports=Match
