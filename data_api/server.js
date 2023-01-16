const lib = require("./source.js");
const express = require('express');
const app = express();
const cors = require('cors');
const e = require("express");


const POINTS = {
    TELE_HIGH: 5.0 + (5.0/3.0),
    AUTO_HIGH: 6.0 + (5.0/3.0),
    TELE_MID: 3.0 + (5.0/3.0),
    AUTO_MID: 4.0 + (5.0/3.0),
    TELE_LOW: 2.0 + (5.0/3.0), 
    AUTO_LOW: 3.0 + (5.0/3.0),
    MOBILITY: 3,
    TELE_PARK: 2,
    TELE_DOCK: 6,
    AUTO_DOCK: 8,
    TELE_ENGAGE: 10,
    AUTO_ENGAGE: 12,
}



function per_team_helper(data, fields, just_last = false) {
    for (let entry of data) {
        entry['GAME_PIECE_POINTS'] = 0
        entry['HIGH_PIECE_POINTS'] = 0
        entry['LOW_PIECE_POINTS'] = 0
        entry['MID_PIECE_POINTS'] = 0
        entry['AUTO_HIGH_PIECE_POINTS'] = 0
        entry['AUTO_LOW_PIECE_POINTS'] = 0
        entry['AUTO_MID_PIECE_POINTS'] = 0
        entry['CONE_PIECE_POINTS'] = 0
        entry['CUBE_PIECE_POINTS'] = 0
        entry['TOTAL_CHARGING_STATION_POINTS'] = 0
        entry['AUTO_CHARGING_STATION_POINTS'] = 0
        entry['TELE_CHARGING_STATION_POINTS'] = 0
        entry['TOTAL_POINTS'] = 0
        entry['AUTO_POINTS'] = 0

    }
    data.push({})
    let pts = 0.0
    let auto = 0.0
    let tele = 0.0
    let telecharge = 0.0
    let autocharge = 0.0
    let charge = 0.0
    let cone = 0.0
    let cube = 0.0
    
    for (let val of fields) {
        val = val.name
        if (val in POINTS) {
            for (let entry in data) {
                if (entry == data.length - 1) break
                entry = data[entry]
                entry['TOTAL_POINTS'] += entry[val] * POINTS[val]
                if (val == 'MOBILITY') continue
                entry['AUTO_CHARGING_STATION_POINTS'] += entry[val] * POINTS[val]
                if (val.includes('AutoDockedState')) {
                    if(entry[val] == 'Docked'){
                        entry['AUTO_POINTS'] += POINTS.AUTO_DOCK
                        auto += POINTS.AUTO_DOCK
                        autocharge += POINTS.AUTO_DOCK
                        charge += POINTS.AUTO_DOCK
                    }
                    else if(entry[val] == 'Engaged'){
                        entry['AUTO_POINTS'] += POINTS.AUTO_ENGAGE
                        auto += POINTS.AUTO_ENGAGE
                        autocharge += POINTS.AUTO_ENGAGE
                        charge += POINTS.AUTO_ENGAGE
                    }
                    // entry['AUTO_POINTS'] += entry[val] * POINTS[val]
                    // auto += entry[val] * POINTS[val]
                }
                if (val.includes('Auto') && (val.charAt(val.length-1)-'0')<=9) {
                    entry['AUTO_POINTS'] += (entry[val]!=0) * POINTS.AUTO_HIGH
                    entry['AUTO_HIGH_PIECE_POINTS'] += (entry[val]!=0) * POINTS[val]
                    auto += (entry[val]!=0) * POINTS.AUTO_HIGH
                    if(entry[val] == 1){
                        cone += POINTS.AUTO_HIGH
                        entry['CONE_PIECE_POINTS'] += POINTS.AUTO_HIGH
                    }
                    else if(entry[val] == 2){
                        cube += POINTS.AUTO_HIGH
                        entry['CUBE_PIECE_POINTS'] += POINTS.AUTO_HIGH
                    }
                }
                else if (val.includes('Auto') && (val.charAt(val.length-1)-'0')<=18) {
                    entry['AUTO_POINTS'] += (entry[val]!=0) * POINTS.AUTO_MID
                    entry['AUTO_MID_PIECE_POINTS'] += (entry[val]!=0) * POINTS[val]
                    auto += (entry[val]!=0) * POINTS.AUTO_MID
                    if(entry[val] == 1){
                        cone += POINTS.AUTO_MID
                        entry['CONE_PIECE_POINTS'] += POINTS.AUTO_MID
                    }
                    else if(entry[val] == 2){
                        cube += POINTS.AUTO_MID
                        entry['CUBE_PIECE_POINTS'] += POINTS.AUTO_MID
                    }
                }
                else if (val.includes('Auto') && (val.charAt(val.length-1)-'0')<=27) {
                    entry['AUTO_POINTS'] += (entry[val]!=0) * POINTS.AUTO_LOW
                    entry['AUTO_LOW_PIECE_POINTS'] += (entry[val]!=0) * POINTS[val]
                    auto += (entry[val]!=0) * POINTS.AUTO_LOW
                    if(entry[val] == 1){
                        cone += POINTS.AUTO_LOW
                        entry['CONE_PIECE_POINTS'] += POINTS.AUTO_LOW
                    }
                    else if(entry[val] == 2){
                        cube += POINTS.AUTO_LOW
                        entry['CUBE_PIECE_POINTS'] += POINTS.AUTO_LOW
                    }
                }
                else if (val.includes('Tele') && (val.charAt(val.length-1)-'0')<= 9) {
                    entry['TELE_POINTS'] += (entry[val]!=0) * POINTS.TELE_HIGH
                    entry['TELE_HIGH_PIECE_POINTS'] += (entry[val]!=0) * POINTS[val]
                    tele += (entry[val]!=0) * POINTS.TELE_LOW
                    if(entry[val] == 1){
                        cone += POINTS.TELE_HIGH
                        entry['CONE_PIECE_POINTS'] += POINTS.TELE_HIGH
                    }
                    else if(entry[val] == 2){
                        cube += POINTS.TELE_HIGH
                        entry['CUBE_PIECE_POINTS'] += POINTS.TELE_HIGH
                    }
                }
                else if (val.includes('Tele') && (val.charAt(val.length-1)-'0')<= 18) {
                    entry['TELE_POINTS'] += (entry[val]!=0) * POINTS.TELE_MID
                    entry['TELE_MID_PIECE_POINTS'] += (entry[val]!=0) * POINTS[val]
                    tele += (entry[val]!=0) * POINTS.TELE_MID
                    if(entry[val] == 1){
                        cone += POINTS.TELE_MID
                        entry['CONE_PIECE_POINTS'] += POINTS.TELE_MID
                    }
                    else if(entry[val] == 2){
                        cube += POINTS.TELE_MID
                        entry['CUBE_PIECE_POINTS'] += POINTS.TELE_MID
                    }
                }
                else if (val.includes('Tele') && (val.charAt(val.length-1)-'0')<= 27) {
                    entry['TELE_POINTS'] += (entry[val]!=0) * POINTS.TELE_LOW
                    entry['TELE_LOW_PIECE_POINTS'] += (entry[val]!=0) * POINTS[val]
                    tele += (entry[val]!=0) * POINTS.TELE_LOW
                    if(entry[val] == 1){
                        cone += POINTS.TELE_LOW
                        entry['CONE_PIECE_POINTS'] += POINTS.TELE_LOW
                    }
                    else if(entry[val] == 2){
                        cube += POINTS.TELE_LOW
                        entry['CUBE_PIECE_POINTS'] += POINTS.TELE_LOW
                    }
                }
                entry['TELE_CHARGING_STATION_POINTS'] += entry[val] * POINTS[val]
                if (val.includes('TeleDockedState')) {
                    if(entry[val] == 'Docked'){
                        entry['TELE_POINTS'] += POINTS.TELE_DOCK
                        tele += POINTS.TELE_DOCK
                        telecharge += POINTS.TELE_DOCK
                        charge += POINTS.TELE_DOCK
                    }
                    else if(entry[val] == 'Engaged'){
                        entry['TELE_POINTS'] += POINTS.TELE_ENGAGE
                        tele += POINTS.TELE_ENGAGE
                        telecharge += POINTS.TELE_ENGAGE
                        charge += POINTS.TELE_ENGAGE
                    }
                    else if(entry[val] == 'Parked'){
                        entry['TELE_POINTS'] += POINTS.TELE_PARK
                        tele += POINTS.TELE_PARK
                        telecharge += POINTS.TELE_PARK
                        charge += POINTS.TELE_PARK
                    }
                    // entry['AUTO_POINTS'] += entry[val] * POINTS[val]
                    // auto += entry[val] * POINTS[val]
                }

            }
            // data[data.length - 1][val + " PPG"] = tmp / Math.max(1, data.length - 1)
        }
    }
    // let tmp2 = 0
    // for (const entry in data) {
    //     if (entry == data.length - 1) break
    //     let key = data[entry]['TELE_DOCKED_STATE'].toUpperCase()
    //     if (key in POINTS) {
    //         tmp2 += POINTS[key]
    //         data[entry]['TELE_CHARGING_STATION_POINTS'] += POINTS[key]
    //         data[entry]['TOTAL_POINTS'] += POINTS[key]
    //     }
    // }
    pts = auto + tele
    data[data.length - 1]["CHARGING STATION PPG"] = charge / Math.max(1, data.length - 1)
    // pts += tmp2;
    pts /= Math.max(1, data.length - 1)
    auto /= Math.max(1, data.length - 1)
    data[data.length - 1]["GAME PIECE PPG"] = pts - data[data.length - 1]["CHARGING STATION PPG"] - data[data.length - 1]["MOBILITY PPG"]
    data[data.length - 1]["AUTO PPG"] = auto
    data[data.length - 1]["TELE PPG"] = tele
    data[data.length - 1]["TOTAL PPG"] = pts


    if (just_last) return data[data.length - 1]
    return data
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});




app.get('/from_comp/:comp/team/:team', function (req, res) {

    lib.query().then((conn) => {

        conn.query(`SELECT * FROM MATCH_DATA WHERE COMP_NAME='${req.params.comp}' AND TeamName=${req.params.team}`, function (err, result, fields) {
            if (err) { console.log(err); return; }
            res.send(per_team_helper(result, fields))
        });
    }).catch((msg) => {
        console.log(msg)
        res.send(msg)

    })
})

app.get('/from_comp/:comp/all_teams', function (req, res) {

    lib.query().then((conn) => {

        conn.query(`SELECT * FROM MATCH_DATA WHERE COMP_NAME='${req.params.comp}'`, function (err, result, fields) {
            if (err) { console.log(err); return; }
            const teams = [...new Set(result.map(item => item.TeamName))];
            const resp = {}
            for (let team of teams) {
                const data = result.filter(el => el.TeamName == team);
                resp[team] = per_team_helper(data, fields, true)
            }
            res.send(resp)
        });
    }).catch((msg) => {
        console.log(msg)
        res.send(msg)

    })
})

app.get('/from_comp/:comp/pit/:team', function (req, res) {

    lib.query().then((conn) => {

        conn.query(`SELECT * FROM PIT_DATA WHERE COMP_NAME='${req.params.comp}' AND TeamName=${req.params.team}`, function (err, result, fields) {
            if (err) { console.log(err); return; }
            res.send(result)
        });
    }).catch((msg) => {
        console.log(msg)
        res.send(msg)

    })
})

app.get('/from_comp/:comp/all_teams_arr', function (req, res) {

    lib.query().then((conn) => {

        conn.query(`SELECT * FROM MATCH_DATA WHERE COMP_NAME='${req.params.comp}'`, function (err, result, fields) {
            if (err) { console.log(err); return; }
            const teams = [...new Set(result.map(item => item.TeamName))];
            const resp = []
            for (let team of teams) {
                const data = result.filter(el => el.TeamName == team);
                let temp = per_team_helper(data, fields, true)
                temp.TeamName = team
                resp.push(temp)
            }
            res.send(resp)
        });
    }).catch((msg) => {
        console.log(msg)
        res.send(msg)

    })
})

app.get('/team_fields', function (req, res) {
    const ret = [
        { Field: 'HIGH AUTON PPG' },
        { Field: 'MID AUTON PPG' },
        { Field: 'LOW AUTON PPG' },
        { Field: 'MOBILITY PPG' },
        { Field: 'HIGH TELE PPG' },
        { Field: 'MID TELE PPG' },
        { Field: 'LOW TELEOP PPG' },
        { Field: 'CONE PPG' },
        { Field: 'CUBE PPG' },
        { Field: 'CHARGING STATION PPG' },
        { Field: 'GAME PIECE PPG' },
        { Field: 'AUTO PPG' },
        { Field: 'TOTAL PPG' }
    ]
    res.send(ret)

})



app.get('/from_comp/:comp/match_predict/:match', function (req, res) {
    lib.query().then((conn) => {
        conn.query(`SELECT * FROM MATCH_DATA WHERE COMP_NAME='${req.params.comp}'`, function (err, result, fields) {
            if (err) { console.log(err); return; }
            let vis = {}
            const match = req.params.match
            const team_filt = result.filter(el => el.MATCH_NUMBER == match); // keep double equals, not triple!
            let counts = {}
            for (const tm of team_filt) {
                const filt = result.filter(el => el.TeamName == tm.TeamName);
                vis[tm.TeamName] = per_team_helper(filt, fields, true)

                if (!(tm.TeamColor in vis)) {

                    vis[tm.TeamColor] = {}
                    Object.assign(vis[tm.TeamColor], vis[tm.TeamName]);
                    console.log(tm.TeamColor, vis[tm.TeamColor])
                    counts[tm.TeamColor] = 1;
                }
                else {
                    counts[tm.TeamColor]++;
                    for (let key in vis[tm.TeamColor]) {
                        console.log(key, vis[tm.TeamColor][key])
                        vis[tm.TeamColor][key] += vis[tm.TeamName][key]
                    }

                }

                vis[tm.TeamName].TeamColor = tm.TeamColor

            }
            for (let type of ['R', 'B']) {
                if (type in vis) {
                    for (let key in vis[type]) {
                        vis[type][key] /= counts[type]
                    }
                }
            }
            res.send(vis)

        });
    }).catch((msg) => {
        console.log(msg)
        res.send(msg)

    })
})

app.get('/from_comp/:comp/match_predict_custom/:teams', function (req, res) {
    lib.query().then((conn) => {
        conn.query(`SELECT * FROM MATCH_DATA WHERE COMP_NAME='${req.params.comp}'`, function (err, result, fields) {
            if (err) { console.log(err); return; }
            let vis = {}
            const types = req.params.teams.split('|')
            const team_filt = []
            for (let blue of types[0].split(',')) {
                team_filt.push({
                    TeamName: blue,
                    TeamColor: 'B'
                })
            }
            for (let red of types[1].split(',')) {
                team_filt.push({
                    TeamName: red,
                    TeamColor: 'R'
                })
            }
            for (const tm of team_filt) {
                const filt = result.filter(el => el.TeamName == tm.TeamName);
                vis[tm.TeamName] = per_team_helper(filt, fields, true)

                if (!(tm.TeamColor in vis)) {

                    vis[tm.TeamColor] = {}
                    Object.assign(vis[tm.TeamColor], vis[tm.TeamName]);
                    console.log(tm.TeamColor, vis[tm.TeamColor])
                }
                else {
                    for (let key in vis[tm.TeamColor]) {
                        console.log(key, vis[tm.TeamColor][key])
                        vis[tm.TeamColor][key] += vis[tm.TeamName][key]
                    }

                }

                vis[tm.TeamName].TeamColor = tm.TeamColor

            }

            res.send(vis)

        });
    }).catch((msg) => {
        console.log(msg)
        res.send(msg)

    })
})


app.get('/from_comp/:comp', function (req, res) {
    lib.query().then((conn) => {
        conn.query(`SELECT * FROM MATCH_DATA WHERE COMP_NAME='${req.params.comp}'`, function (err, result, fields) {
            if (err) { console.log(err); return; }
            res.send(result)
        });
    }).catch((msg) => {
        console.log(msg)
        res.send(msg)

    })
})


app.get('/match_fields', function (req, res) {
    lib.query().then((conn) => {
        conn.query(`DESCRIBE MATCH_DATA`, function (err, result, fields) {
            if (err) { console.log(err); return; }
            res.send(result)
        });
    }).catch((msg) => {
        console.log(msg)
        res.send(msg)
    })
})

app.get('/pit_fields', function (req, res) {
    lib.query().then((conn) => {
        conn.query(`DESCRIBE PIT_DATA`, function (err, result, fields) {
            console.log(fields);
            if (err) { console.log(err); return; }
            res.send(result)
        });
    }).catch((msg) => {
        console.log(msg)
        res.send(msg)
    })
})

function processData(sepBig, sepSmall, fieldsArr, data) {
    let final = [];
    for (let el of data.split(sepBig)) {
        let arr = el.split(sepSmall);

        if (arr.length != fieldsArr.length) {
            return;
        }
        let temp = []
        for (let i = 0; i < arr.length; i++) {
            if (fieldsArr[i]['Type'].includes('text') || fieldsArr[i]['Type'].includes('char')) {
                temp.push(`'${arr[i]}'`);
            }
            else temp.push(arr[i]);
        }
        final.push(`(${temp.join(',')})`);
    }
    return final.join(',');
}

app.get('/add_pit/:sepBig/:sepSmall/:data', function (req, res) {
    lib.query().then((conn) => {
        conn.query(`DESCRIBE PIT_DATA`, function (err, result, _) {
            if (err) { console.log(err); return; }


            conn.query(`INSERT IGNORE INTO PIT_DATA VALUES ${processData(req.params.sepBig, req.params.sepSmall, result, req.params.data)}`, function (err, result, fields) {
                if (err) { console.log(err); return; }
                res.send(result)
            });
        });

    }).catch((msg) => {
        console.log(msg)
        res.send(msg)
    })
})

app.get('/add_match/:sepBig/:sepSmall/:data', function (req, res) {
    lib.query().then((conn) => {
        conn.query(`DESCRIBE MATCH_DATA`, function (err, result, fields) {
            if (err) { console.log(err); return; }
            console.log(getProcessedData(req.params.sepBig, req.params.sepSmall, result, req.params.data))
            conn.query(`INSERT IGNORE INTO MATCH_DATA VALUES ${processData(req.params.sepBig, req.params.sepSmall, result, req.params.data)}`, function (err, result, fields) {
                if (err) { console.log(err); return; }
                res.send(result)
            });
        });

    }).catch((msg) => {
        console.log(msg)
        res.send(msg)
    })
})




const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3030;
app.listen(PORT)