//test
var ScoutName = 'Jimmy';
var ScoutScore = 0;
var BET_COLOR = 'red';
var WinnerColor = 'blue';
var BET_AMOUNT = 50;
var ScoutScore = 0;
var OVER_UNDER = 1;
var MATCH_OUTCOME = 51; //not sure amount how we are determining this but innitially making it so Jimmy won if score over 50
//matt correct variable names and also the website isn't propperly getting the data from match_fields

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
 
                  //meant to update score on leaderboard
}

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


let Scout01 = new Scout(ScoutName, BET_COLOR, WinnerColor,BET_AMOUNT, ScoutScore, OVER_UNDER, MATCH_OUTCOME)
console.log(Scout01);


