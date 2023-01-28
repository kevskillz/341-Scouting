
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
      url: `${ROOT_URL}from_comp/${localStorage.getItem('COMP')}`,
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


                for (let i = 0; i < ScoutName.length; i++) {

                 
                  let scoutmodel = new Scout(ScoutName[i], BET_COLOR[i], WinnerColor[i], BET_AMOUNT[i], ScoutScore[i], OVER_UNDER[i], MATCH_OUTCOME);
                  if (matchesAccounted[ScoutName[i]].includes(`${MatchNumber[i]}`)) {
                    scouts[scoutmodel.ScoutName] = scoutmodel.ScoutScore
                    continue;
                  }
                  else { matchesAccounted[ScoutName[i]].push( `${MatchNumber[i]}`) }
                  if (scouts.hasOwnProperty(scoutmodel.ScoutName)) {
                    scouts[scoutmodel.ScoutName] += scoutmodel.ScoutScore;
                  }
                  else scouts[scoutmodel.ScoutName] = scoutmodel.ScoutScore
                }

                for (const [key, value] of Object.entries(scouts)) {
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
                createTable(leaderboard, [{ "Field": "ScoutName" }, { "Field": "ScoutScore" }], spec, "leaderboard", null, null, false)

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

var padding = {top:20, right:40, bottom:0, left:0},
            w = 500 - padding.left - padding.right,
            h = 500 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [],
            color = d3.scale.category20();//category20c()
            //randomNumbers = getRandomNumbers();
        //http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results
        var data = [
                    {"label":" -10 Daisy Dollars",  "value":1,  "question":"At least it was only 10 points"}, // padding
                    {"label":"-50 Daisy Dollars",  "value":2,  "question":"RIP"}, //font-family
                    {"label":"-30 Daisy Dolalrs",  "value":3,  "question":"Meh"}, //color
                    {"label":"+100 Daisy Dollars",  "value":4,  "question":"Round 2?"}, //font-weight
                    {"label":"-200 Daisy Dollars",  "value":5,  "question":"unlucky..."}, //font-size
                    {"label":"+1 Daisy Dollars",  "value":6,  "question":"At least you won something"}, //background-color
                    {"label":"-40 Daisy Dollars",  "value":7,  "question":"oof"}, //nesting
                    {"label":"+0", "value":8, "question":"Try your luck next time!"}
        ];
        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width",  w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);
        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
        var vis = container
            .append("g");
            
        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);
        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
            
        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })
            .attr("d", function (d) { return arc(d); });
        // add the text
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            })
            .attr("text-anchor", "end")
            .text( function(d, i) {
                return data[i].label;
            });
        container.on("click", spin);
        function spin(d){
            
            container.on("click", null);
            //all slices have been seen, all done
            console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
            if(oldpick.length == data.length){
                console.log("done");
                container.on("click", null);
                return;
            }
            var  ps       = 360/data.length,
                 pieslice = Math.round(1440/data.length),
                 rng      = Math.floor((Math.random() * 1440) + 360);
                
            rotation = (Math.round(rng / ps) * ps);
            
            picked = Math.round(data.length - (rotation % 360)/ps);
            picked = picked >= data.length ? (picked % data.length) : picked;
            if(oldpick.indexOf(picked) !== -1){
                d3.select(this).call(spin);
                return;
            } else {
                oldpick.push(picked);
            }
            rotation += 90 - Math.round(ps/2);
            vis.transition()
                .duration(3000)
                .attrTween("transform", rotTween)
                .each("end", function(){
                    //mark question as seen
                    d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                        .attr("fill", "#111");
                    //populate question
                    d3.select("#question h2")
                        .text(data[picked].question);
                    oldrotation = rotation;
              
                    /* Get the result value from object "data" */
                    console.log(data[picked].value)
              
                    /* Comment the below line for restrict spin to sngle time */
                    container.on("click", spin);
                });
        }
        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
            .style({"fill":"black"});
        //draw spin circle
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style({"fill":"white","cursor":"pointer"});
        //spin text
        container.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text("SPIN")
            .style({"font-weight":"bold", "font-size":"30px"});
        
        
        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }
        
        
        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                console.log("works");
            } else {
                //no support for crypto, get crappy random numbers
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }
            return array;
        }

