
function updateScore(ScoutScore, BET_COLOR, BET_AMOUNT, WinnerColor, OVER_UNDER, MATCH_OUTCOME) {
  if (OVER_UNDER == 0 && MATCH_OUTCOME <= 50 && WinnerColor === BET_COLOR) {
    ScoutScore = ScoutScore + BET_AMOUNT + BET_AMOUNT;
    console.log(ScoutScore);
    return ScoutScore;
  }
  if (OVER_UNDER == 1 && MATCH_OUTCOME > 50 && WinnerColor === BET_COLOR) {
    ScoutScore = ScoutScore + BET_AMOUNT + BET_AMOUNT;
    console.log(ScoutScore);
    return ScoutScore;
  }
  else if ((OVER_UNDER == 1 && MATCH_OUTCOME > 50) || (OVER_UNDER == 0 && MATCH_OUTCOME <= 50)) {
    ScoutScore = ScoutScore + BET_AMOUNT;
    console.log(ScoutScore);
    return ScoutScore;
  }
  else if (WinnerColor === BET_COLOR) {
    ScoutScore = ScoutScore + BET_AMOUNT;
    console.log(ScoutScore);
    return ScoutScore;
  }
  else if (BET_AMOUNT == 0) {
    return ScoutScore;
  }
  else if (BET_COLOR === 'null' && BET_AMOUNT > 0) {
    return ScoutScore - BET_AMOUNT;
  }
  else { //assuming you selected both wrong value on over under and team bet is wrong
    ScoutScore = ScoutScore - BET_AMOUNT - BET_AMOUNT;
    return ScoutScore;
  }
}

function Scout(ScoutName, BET_COLOR, WinnerColor, BET_AMOUNT, ScoutScore, OVER_UNDER, MATCH_OUTCOME) {


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

// will get from tba later
//ScoutScore is supposed to be the amount of money the said scout has
const WinnerColor = [];
const leaderboard = [];
const ScoutName = [];
const BET_COLOR = [];
const BET_AMOUNT = [];
const ScoutScore = [];
const OVER_UNDER = [];
const MATCH_OUTCOME = [];
const MatchNumber = [];
$.ajax({
  type: 'GET',
  url: `${ROOT_URL}match_fields`,
  success: function (fields) {

    $.ajax({
      type: 'GET',
      url: `${ROOT_URL}all`,
      success: function (response) {
        $.ajax({
          type: 'GET',
          url: `${ROOT_URL}casino_data`,
          success: function (result) {
            $.ajax({
              url: `https://www.thebluealliance.com/api/v3/event/2017${COMP_ID}/matches`,
              headers: {
                'X-TBA-Auth-Key': 'c94TkHlN655vkfGJK6xThPLQZC9KUhBk0dJKx32vtlGQzRApVwc1IGtEOuoqozvP'
              },
              method: 'GET',
              dataType: 'json',
              success: function (data) {
                let users = {}
                let matchesAccounted = {}
                for (let user of result) {
                  users[user["ScoutName"]] = user["ScoutScore"];
                  matchesAccounted[user["ScoutName"]] = user["MatchesAccounted"].split(',')
                }
                console.log(users)

                for (let i = 0; i < response.length; i++) {

                  ScoutName[i] = response[i]['ScoutName'];

                  BET_COLOR[i] = response[i]['BET_COLOR'];
                  BET_AMOUNT[i] = response[i]['BET_AMOUNT'];
                  OVER_UNDER[i] = response[i]['OVER_UNDER'];
                  ScoutScore[i] = users.hasOwnProperty(ScoutName[i]) ? users[ScoutName[i]] : 0;
                  MatchNumber[i] = response[i]['MatchNumber'];

                  for (let j = 0; j < data.length; j++) {
                    if (MatchNumber[i] == data[i]['match_number']) {

                      WinnerColor[i] = data[i]['winning_alliance'].substring(0, 1);
                    }
                  }

                }

                let scouts = {};

                console.log(matchesAccounted)
                for (let i = 0; i < ScoutName.length; i++) {

                  console.log((ScoutName[i]));
                  if (!matchesAccounted.hasOwnProperty(ScoutName[i])) {
                    matchesAccounted[ScoutName[i]] = [];
                  }

                  let scoutmodel = new Scout(ScoutName[i], BET_COLOR[i], WinnerColor[i], BET_AMOUNT[i], ScoutScore[i], OVER_UNDER[i], MATCH_OUTCOME);
                  if (matchesAccounted[ScoutName[i]].includes(`${MatchNumber[i]}`)) {
                    scouts[scoutmodel.ScoutName] = scoutmodel.ScoutScore
                    continue;
                  }
                  else { matchesAccounted[ScoutName[i]].push(`${MatchNumber[i]}`) }
                  if (scouts.hasOwnProperty(scoutmodel.ScoutName)) {
                    scouts[scoutmodel.ScoutName] += scoutmodel.ScoutScore;
                  }
                  else scouts[scoutmodel.ScoutName] = scoutmodel.ScoutScore
                }

                for (const [key, value] of Object.entries(users)) {
                  leaderboard.push({ "ScoutName": key, "ScoutScore": value });
                }



                let spec = new Array(leaderboard.length).fill(TableSpec.NORMAL)

                console.log(matchesAccounted)
                leaderboard.sort((a, b) => (a.ScoutScore < b.ScoutScore) ? 1 : -1);
                for (let k = 0; k < leaderboard.length; k++) {
                  console.log(leaderboard[k].ScoutName + " " + leaderboard[k].ScoutScore);
                }

                let fin = '';
                for (let person of leaderboard) {
                  fin += person.ScoutScore + "|" + person.ScoutName + "|" + matchesAccounted[person.ScoutName].join(',') + "~";
                }
                fin = fin.slice(0, fin.length - 1);
                console.log(fin)
                console.log(leaderboard)
                console.log(users)
                createTable(leaderboard, [{ "Field": "ScoutName" }, { "Field": "ScoutScore" }], spec, "leaderboard", null, null, false, 200)

                $.ajax({
                  type: 'GET',
                  url: `${ROOT_URL}add_casino/~/|/${fin}`,


                  success: function (dt) {

                  }


                }
                )




              }
            });
          }
        })


      }
    })
  }
})



