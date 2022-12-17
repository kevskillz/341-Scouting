const lib = require("./source.js");
const express = require('express');
const app = express();
const cors = require('cors');


const POINTS = {
    LOW_SCORED_AUTON: 2,
    HIGH_SCORED_AUTON: 4,
    LOW_SCORED_TELEOP: 1,
    HIGH_SCORED_TELEOP: 2,
    TAXI: 2,
    LOW: 4,
    MID: 6,
    HIGH: 10,
    TRAVERSAL: 15
}



function per_team_helper(data, fields, just_last = false) {
    for (let entry of data) {
        entry['BALL_POINTS'] = 0
        entry['CLIMB_POINTS'] = 0
        entry['TOTAL_POINTS'] = 0
        entry['AUTO_POINTS'] = 0

    }
    data.push({})
    let pts = 0
    let auto = 0.
    for (let val of fields) {
        val = val.name
        if (val in POINTS) {
            let tmp = 0.
            for (let entry in data) {
                if (entry == data.length - 1) break
                entry = data[entry]
                tmp += entry[val] * POINTS[val]
                entry['TOTAL_POINTS'] += entry[val] * POINTS[val]
                if (val == 'TAXI') continue
                entry['BALL_POINTS'] += entry[val] * POINTS[val]
                if (val.includes('AUTON')) {
                    entry['AUTO_POINTS'] += entry[val] * POINTS[val]
                    auto += entry[val] * POINTS[val]
                }

            }
            data[data.length - 1][val + " PPG"] = tmp / Math.max(1, data.length - 1)
            pts += tmp
        }
    }
    let tmp2 = 0
    for (const entry in data) {
        if (entry == data.length - 1) break
        let key = data[entry]['CLIMB_LEVEL'].toUpperCase()
        if (key in POINTS) {
            tmp2 += POINTS[key]
            data[entry]['CLIMB_POINTS'] += POINTS[key]
            data[entry]['TOTAL_POINTS'] += POINTS[key]

        }
    }
    data[data.length - 1]["CLIMB PPG"] = tmp2 / Math.max(1, data.length - 1)
    pts += tmp2;
    pts /= Math.max(1, data.length - 1)
    auto /= Math.max(1, data.length - 1)
    data[data.length - 1]["BALL PPG"] = pts - data[data.length - 1]["CLIMB PPG"] - data[data.length - 1]["TAXI PPG"]
    data[data.length - 1]["AUTO PPG"] = auto
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

        conn.query(`SELECT * FROM MATCH_DATA WHERE COMP_NAME='${req.params.comp}' AND TEAM=${req.params.team}`, function (err, result, fields) {
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
            const teams = [...new Set(result.map(item => item.TEAM))];
            const resp = {}
            for (let team of teams) {
                const data = result.filter(el => el.TEAM == team);
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

        conn.query(`SELECT * FROM PIT_DATA WHERE COMP_NAME='${req.params.comp}' AND TEAM=${req.params.team}`, function (err, result, fields) {
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
            const teams = [...new Set(result.map(item => item.TEAM))];
            const resp = []
            for (let team of teams) {
                const data = result.filter(el => el.TEAM == team);
                let temp = per_team_helper(data, fields, true)
                temp.TEAM = team
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
        { Field: 'HIGH_SCORED_AUTON PPG' },
        { Field: 'LOW_SCORED_AUTON PPG' },
        { Field: 'TAXI PPG' },
        { Field: 'HIGH_SCORED_TELEOP PPG' },
        { Field: 'LOW_SCORED_TELEOP PPG' },
        { Field: 'CLIMB PPG' },
        { Field: 'BALL PPG' },
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
                const filt = result.filter(el => el.TEAM == tm.TEAM);
                vis[tm.TEAM] = per_team_helper(filt, fields, true)

                if (!(tm.TEAM_COLOR in vis)) {

                    vis[tm.TEAM_COLOR] = {}
                    Object.assign(vis[tm.TEAM_COLOR], vis[tm.TEAM]);
                    console.log(tm.TEAM_COLOR, vis[tm.TEAM_COLOR])
                    counts[tm.TEAM_COLOR] = 1;
                }
                else {
                    counts[tm.TEAM_COLOR]++;
                    for (let key in vis[tm.TEAM_COLOR]) {
                        console.log(key, vis[tm.TEAM_COLOR][key])
                        vis[tm.TEAM_COLOR][key] += vis[tm.TEAM][key]
                    }

                }

                vis[tm.TEAM].TEAM_COLOR = tm.TEAM_COLOR

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
                    TEAM: blue,
                    TEAM_COLOR: 'B'
                })
            }
            for (let red of types[1].split(',')) {
                team_filt.push({
                    TEAM: red,
                    TEAM_COLOR: 'R'
                })
            }
            for (const tm of team_filt) {
                const filt = result.filter(el => el.TEAM == tm.TEAM);
                vis[tm.TEAM] = per_team_helper(filt, fields, true)

                if (!(tm.TEAM_COLOR in vis)) {

                    vis[tm.TEAM_COLOR] = {}
                    Object.assign(vis[tm.TEAM_COLOR], vis[tm.TEAM]);
                    console.log(tm.TEAM_COLOR, vis[tm.TEAM_COLOR])
                }
                else {
                    for (let key in vis[tm.TEAM_COLOR]) {
                        console.log(key, vis[tm.TEAM_COLOR][key])
                        vis[tm.TEAM_COLOR][key] += vis[tm.TEAM][key]
                    }

                }

                vis[tm.TEAM].TEAM_COLOR = tm.TEAM_COLOR

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