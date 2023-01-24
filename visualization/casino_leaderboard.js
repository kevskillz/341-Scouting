const ScoutName = ['Dathan', 'Kevin', 'Matt'];
const ScoutScore = [0, 0, 0];
const BET_COLOR = ['blue', 'blue', 'blue'];
const OVER_UNDER = [1, 1, 1];
const BET_AMOUNT = [25, 75, 50];
var WinnerColor = 'blue';
var MATCH_OUTCOME = 51;
const leaderboard = [];

for(let i = 0; i < ScoutName.length; i++){
            let scoutmodel = new Scout(ScoutName[i], BET_COLOR[i], WinnerColor,BET_AMOUNT[i], ScoutScore[i], OVER_UNDER[i], MATCH_OUTCOME);
      leaderboard[i] = scoutmodel;
}


function Scout(ScoutName, BET_COLOR, WinnerColor,BET_AMOUNT, ScoutScore, OVER_UNDER, MATCH_OUTCOME) {


      this.ScoutName = ScoutName;
  this.BET_COLOR = BET_COLOR;
  this.BET_AMOUNT = BET_AMOUNT;
  this.ScoutScore = ScoutScore;
  this.OVER_UNDER = OVER_UNDER;
  this.MATCH_OUTCOME = MATCH_OUTCOME;
  this.WinnerColor = WinnerColor;
  //defining parameters of object
 
  this.ScoutScore = updateScore(ScoutScore, BET_COLOR, BET_AMOUNT, WinnerColor, OVER_UNDER, MATCH_OUTCOME);
 }
                  //meant to update score on leaderboard

function updateScore(ScoutScore, BET_COLOR, BET_AMOUNT, WinnerColor, OVER_UNDER, MATCH_OUTCOME) {
      if(OVER_UNDER == 0 && MATCH_OUTCOME <= 50 && WinnerColor === BET_COLOR){
  ScoutScore = ScoutScore + BET_AMOUNT + BET_AMOUNT;
  return ScoutScore;
  }
      if(OVER_UNDER == 1 && MATCH_OUTCOME > 50 && WinnerColor === BET_COLOR){
  ScoutScore = ScoutScore + BET_AMOUNT + BET_AMOUNT;
  return ScoutScore;
  }
  else if((OVER_UNDER == 1 && MATCH_OUTCOME > 50) ||(OVER_UNDER == 0 && MATCH_OUTCOME <= 50)){
  ScoutScore = ScoutScore + BET_AMOUNT;
  return ScoutScore;
  }
  else if(WinnerColor === BET_COLOR){
  ScoutScore = ScoutScore + BET_AMOUNT;
  return ScoutScore;
  }
      else if(BET_AMOUNT == 0){
  return ScoutScore;
 }
      else if(BET_COLOR === 'null' && BET_AMOUNT > 0){
  return ScoutScore - BET_AMOUNT;
 }
      else { //assuming you selected both wrong value on over under and team bet is wrong
  ScoutScore = ScoutScore - BET_AMOUNT - BET_AMOUNT;
  return ScoutScore;
 }
}

leaderboard.sort((a, b) => (a.ScoutScore < b.ScoutScore) ? 1 : -1);
for(let k = 0; k< leaderboard.length; k++){
console.log(leaderboard[k].ScoutName + " " + leaderboard[k].ScoutScore);
}
