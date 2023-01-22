function process_num(num) {
    $.ajax({
        type: 'GET',
        url: `${ROOT_URL}match_fields`,
        success: function (fields) {

            $.ajax({
                type: 'GET',
                url: `${ROOT_URL}from_comp/${localStorage.getItem('COMP')}/team/${num}`,
                success: function (response) {

                    let name = response[0]['TeamName'];
                    document.getElementById('dataTitle').innerHTML = name + ' Graphs';
                   
                    console.log(response)
                    // let spec = new Array(fields.length).fill(TableSpec.NORMAL)
                    // spec[0] = TableSpec.EXCLUDE;
                    // spec[1] = TableSpec.NUMSORT;
                    let last = response.pop()
                    
                    
                    // createTable(response, fields, spec, "match_table", [{ column: "MatchNumber", dir: "asc" }],150)
                    

                    /**
                     * REVERSE ORDER OF DIV INIT
                     */
                    
                    document.getElementById('game_piece_graph').innerHTML = '';
                    document.getElementById('point_graph').innerHTML = '';
                    document.getElementById('cone_piece_graph').innerHTML = '';
                    document.getElementById('cube_piece_graph').innerHTML = '';
                    document.getElementById('tele_charge_point_graph').innerHTML = '';
                    document.getElementById('auto_graph').innerHTML = '';
                    document.getElementById('spider').innerHTML = '';
                    
                   
                    
                    createLineGraph(response, 'MatchNumber', 'GAME_PIECE_POINTS', 'game_piece_graph');
                    
                    createLineGraph(response, 'MatchNumber', 'TOTAL_POINTS', 'point_graph');

                    createLineGraph(response, 'MatchNumber', 'CONE_PIECE_POINTS', 'cone_piece_graph');

                    createLineGraph(response, 'MatchNumber', 'CUBE_PIECE_POINTS', 'cube_piece_graph');

                    createLineGraph(response, 'MatchNumber', 'TELE_CHARGING_STATION_POINTS', 'tele_charge_point_graph');

                    createLineGraph(response, 'MatchNumber', 'AUTO_POINTS', 'auto_graph');                    

                    createSpider([last],['TELE CHARGING STATION PPG','AUTO PPG','GAME PIECE PPG'],'spider');


                   


                    console.log(response)


                },
                error: function (xhr, status, err) {
                    console.log(xhr.responseText);
                }
            });

        },
        error: function (xhr, status, err) {
            console.log(xhr.responseText);
        }
    });
    $.ajax({
        type: 'GET',
        url: `${ROOT_URL}pit_fields`,
        success: function (fields) {

            $.ajax({
                type: 'GET',
                url: `${ROOT_URL}from_comp/${localStorage.getItem('COMP')}/pit/${num}`,
                success: function (response) {
                   
                    

                    let spec = new Array(response.length).fill(TableSpec.NORMAL)
                    spec[0] = TableSpec.EXCLUDE;
                    
                    
                    // createTable(response, fields, spec, "pit_table", null, null, false)
                    
                    
                   

                    
                    console.log(response)
                    let name = response[0]['TeamName'];
                    document.getElementById('pitTitle').innerHTML = name + ' Pit Data';
                    let newPit = response;
                    if(response[0]['AutoMobility'] == 1)
                        newPit[0]['AutoMobility'] = '✔️'
                    else
                        newPit[0]['AutoMobility'] = '❌'   
                    
                    if(response[0]['ConeGround'] == 1)
                        newPit[0]['ConeGround'] = '✔️'
                    else
                        newPit[0]['ConeGround'] = '❌'  
                    
                    if(response[0]['ConeShelf'] == 1)
                        newPit[0]['ConeShelf'] = '✔️'
                    else
                        newPit[0]['ConeShelf'] = '❌'
                    
                    if(response[0]['ConePortal'] == 1)
                        newPit[0]['ConePortal'] = '✔️'
                    else
                        newPit[0]['ConePortal'] = '❌'
                    
                    if(response[0]['CubePortal'] == 1)
                        newPit[0]['CubePortal'] = '✔️'
                    else
                        newPit[0]['CubePortal'] = '❌'
                    if(response[0]['CubeShelf'] == 1)
                        newPit[0]['CubeShelf'] = '✔️'
                    else
                        newPit[0]['CubeShelf'] = '❌'
                    if(response[0]['CubeGround'] == 1)
                        newPit[0]['CubeGround'] = '✔️'
                    else
                        newPit[0]['CubeGround'] = '❌'
                    if(response[0]['SideConeGround'] == 1)
                        newPit[0]['SideConeGround'] = '✔️'
                    else
                        newPit[0]['SideConeGround'] = '❌'
                    if(response[0]['SideConeShelf'] == 1)
                        newPit[0]['SideConeShelf'] = '✔️'
                    else
                        newPit[0]['SideConeShelf'] = '❌'
                    if(response[0]['SideConePortal'] == 1)
                        newPit[0]['SideConePortal'] = '✔️'
                    else
                        newPit[0]['SideConePortal'] = '❌'
                    newPit[0]['AutoPiecesScored'] = 'Can score ' + response[0]['AutoPiecesScored'];
                    newPit[0]['RobotWidth'] = response[0]['RobotWidth'] + ' inches';
                    newPit[0]['RobotLength'] = response[0]['RobotLength'] + ' inches';
                    newPit[0]['StationRobotWidth'] = response[0]['StationRobotWidth'] + ' inches';

                    createTable(newPit, fields, spec, "pit_table", null, null, false)
                    
                //    let r1 = newPit.splice(0, 8);
                //    let r2 = newPit.splice(0, 8);
                //    let r3 = newPit.splice(0, 8);

                //    console.log(r1)
                //    console.log(r2)
                //    console.log(r3)
                    
                //     createTable(r1, fields, spec, "pit_table", null, null, false);
                //     createTable(r2, fields, spec, "pit_table1", null, null, false);
                //     createTable(r3, fields, spec, "pit_table2", null, null, false);


                },
                error: function (xhr, status, err) {
                    console.log(xhr.responseText);
                }
            });

        },
        error: function (xhr, status, err) {
            console.log(xhr.responseText);
        }
    });
}
function _search() {
    if (isNaN(parseInt(document.getElementById("inp").value))) return
    process_num(parseInt(document.getElementById("inp").value))
}
function search(e) {
    if (e.keyCode == 13) {
        if (isNaN(parseInt($(this).val()))) return

        process_num(parseInt($(this).val()))
    }
}
$("input").on("keydown", search);