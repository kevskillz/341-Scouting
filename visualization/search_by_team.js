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


                    let matches = response.length;
                    let s1 = 0.0
                    let s2 = 0.0
                    let s3 = 0.0
                    let s4 = 0.0
                    let s5 = 0.0
                    let s6 = 0.0
                    let s7 = 0.0
                    let s8 = 0.0
                    let s9 = 0.0
                    let s10 = 0.0
                    let s11 = 0.0
                    let s12 = 0.0
                    let s13 = 0.0
                    let s14 = 0.0
                    let s15 = 0.0
                    let s16 = 0.0
                    let s17 = 0.0
                    let s18 = 0.0
                    let s19 = 0.0
                    let s20 = 0.0
                    let s21 = 0.0
                    let s22 = 0.0
                    let s23 = 0.0
                    let s24 = 0.0
                    let s25 = 0.0
                    let s26 = 0.0
                    let s27 = 0.0   
                    for(let i = 0; i < matches; i++){
                        if(response[i]['Auto1'] == 1 || response[i]['Auto1'] == 2|| response[i]['Tele1'] == 1 || response[i]['Tele1'] == 2){
                            s1++;
                        }
                        if(response[i]['Auto2'] == 1 || response[i]['Auto2'] == 2|| response[i]['Tele2'] == 1 || response[i]['Tele2'] == 2){
                            s2++;
                        }
                        if(response[i]['Auto3'] == 1 || response[i]['Auto3'] == 2|| response[i]['Tele3'] == 1 || response[i]['Tele3'] == 2){
                            s3++;
                        }
                        if(response[i]['Auto4'] == 1 || response[i]['Auto4'] == 2|| response[i]['Tele4'] == 1 || response[i]['Tele4'] == 2){
                            s4++;
                        }
                        if(response[i]['Auto5'] == 1 || response[i]['Auto5'] == 2|| response[i]['Tele5'] == 1 || response[i]['Tele5'] == 2){
                            s5++;
                        }
                        if(response[i]['Auto6'] == 1 || response[i]['Auto6'] == 2|| response[i]['Tele6'] == 1 || response[i]['Tele6'] == 2){
                            s6++;
                        }
                        if(response[i]['Auto7'] == 1 || response[i]['Auto7'] == 2|| response[i]['Tele7'] == 1 || response[i]['Tele7'] == 2){
                            s7++;
                        }
                        if(response[i]['Auto8'] == 1 || response[i]['Auto8'] == 2|| response[i]['Tele8'] == 1 || response[i]['Tele8'] == 2){
                            s8++;
                        }
                         if(response[i]['Auto9'] == 1 || response[i]['Auto9'] == 2|| response[i]['Tele9'] == 1 || response[i]['Tele9'] == 2){
                            s9++;
                        }
                         if(response[i]['Auto1i'] == 1 || response[i]['Auto1i'] == 2|| response[i]['Tele1i'] == 1 || response[i]['Tele1i'] == 2){
                            s1i++;
                        }
                         if(response[i]['Auto11'] == 1 || response[i]['Auto11'] == 2|| response[i]['Tele11'] == 1 || response[i]['Tele11'] == 2){
                            s11++;
                        }
                         if(response[i]['Auto12'] == 1 || response[i]['Auto12'] == 2|| response[i]['Tele12'] == 1 || response[i]['Tele12'] == 2){
                            s12++;
                        }
                         if(response[i]['Auto13'] == 1 || response[i]['Auto13'] == 2|| response[i]['Tele13'] == 1 || response[i]['Tele13'] == 2){
                            s13++;
                        }
                         if(response[i]['Auto14'] == 1 || response[i]['Auto14'] == 2|| response[i]['Tele14'] == 1 || response[i]['Tele14'] == 2){
                            s14++;
                        }
                         if(response[i]['Auto15'] == 1 || response[i]['Auto15'] == 2|| response[i]['Tele15'] == 1 || response[i]['Tele15'] == 2){
                            s15++;
                        }
                         if(response[i]['Auto16'] == 1 || response[i]['Auto16'] == 2|| response[i]['Tele16'] == 1 || response[i]['Tele16'] == 2){
                            s16++;
                        }
                         if(response[i]['Auto17'] == 1 || response[i]['Auto17'] == 2|| response[i]['Tele17'] == 1 || response[i]['Tele17'] == 2){
                            s17++;
                        }
                         if(response[i]['Auto18'] == 1 || response[i]['Auto18'] == 2|| response[i]['Tele18'] == 1 || response[i]['Tele18'] == 2){
                            s18++;
                        }
                         if(response[i]['Auto19'] == 1 || response[i]['Auto19'] == 2|| response[i]['Tele19'] == 1 || response[i]['Tele19'] == 2){
                            s19++;
                        }
                         if(response[i]['Auto2i'] == 1 || response[i]['Auto2i'] == 2|| response[i]['Tele2i'] == 1 || response[i]['Tele2i'] == 2){
                            s2i++;
                        }
                         if(response[i]['Auto21'] == 1 || response[i]['Auto21'] == 2|| response[i]['Tele21'] == 1 || response[i]['Tele21'] == 2){
                            s21++;
                        }
                         if(response[i]['Auto22'] == 1 || response[i]['Auto22'] == 2|| response[i]['Tele22'] == 1 || response[i]['Tele22'] == 2){
                            s22++;
                        }
                         if(response[i]['Auto23'] == 1 || response[i]['Auto23'] == 2|| response[i]['Tele23'] == 1 || response[i]['Tele23'] == 2){
                            s23++;
                        }
                         if(response[i]['Auto24'] == 1 || response[i]['Auto24'] == 2|| response[i]['Tele24'] == 1 || response[i]['Tele24'] == 2){
                            s24++;
                        }
                         if(response[i]['Auto25'] == 1 || response[i]['Auto25'] == 2|| response[i]['Tele25'] == 1 || response[i]['Tele25'] == 2){
                            s25++;
                        }
                         if(response[i]['Auto26'] == 1 || response[i]['Auto26'] == 2|| response[i]['Tele26'] == 1 || response[i]['Tele26'] == 2){
                            s26++;
                        }
                         if(response[i]['Auto27'] == 1 || response[i]['Auto27'] == 2|| response[i]['Tele27'] == 1 || response[i]['Tele27'] == 2){
                            s27++;
                        }
                    }
                    s1 /= matches;
                    s2 /= matches;
                    s3 /= matches;
                    s4 /= matches;
                    s5 /= matches;
                    s6 /= matches;
                    s7 /= matches;
                    s8 /= matches;
                    s9 /= matches;
                    s10 /= matches;
                    s11 /= matches;
                    s12 /= matches;
                    s13 /= matches;
                    s14 /= matches;
                    s15 /= matches;
                    s16 /= matches;
                    s17 /= matches;
                    s18 /= matches;
                    s19 /= matches;
                    s20 /= matches;
                    s21 /= matches;
                    s22 /= matches;
                    s23 /= matches;
                    s24 /= matches;
                    s25 /= matches;
                    s26 /= matches;
                    s27 /= matches;
                    
                            
                    //         str += '</tr>';
                    //     }
                    //     str += '</table>';
                    //     divTable.innerHTML = str;
                    
                    
                    
                    // createTable(response, fields, spec, "match_table", [{ column: "MatchNumber", dir: "asc" }],150)
                    
                    // var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/17wJLCLz0G-vl5esqIfKTuwK8kNjDsMTxZEZ1IOZ06IA';

                    // $('#statistics').sheetrock({
                    //     url: mySpreadsheet
                    //   });

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
                    document.getElementById('heatMap').innerHTML = '';
                    // document.getElementById('statistics').innerHTML = '';
                    
                   
                    
                    createLineGraph(response, 'MatchNumber', 'GAME_PIECE_POINTS', 'game_piece_graph');
                    
                    createLineGraph(response, 'MatchNumber', 'TOTAL_POINTS', 'point_graph');

                    createLineGraph(response, 'MatchNumber', 'CONE_PIECE_POINTS', 'cone_piece_graph');

                    createLineGraph(response, 'MatchNumber', 'CUBE_PIECE_POINTS', 'cube_piece_graph');

                    createLineGraph(response, 'MatchNumber', 'TELE_CHARGING_STATION_POINTS', 'tele_charge_point_graph');

                    createLineGraph(response, 'MatchNumber', 'AUTO_POINTS', 'auto_graph');                    

                    createSpider([last],['TELE CHARGING STATION PPG','AUTO PPG','GAME PIECE PPG'],'spider');

                    createHeatMap(heatMap, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22, s23, s24, s25, s26, s27);
                   
                    // createHeatMap(heatMap, 0.001, 0.02, 0.03, 0.04, 0.05, 0.06, 0.000007, 0.08, 0.09, 0.1, 0.1, 0.2, 0.3, 0.5, 0.6, 0.7, 0.7, 0.8, 0.8, 0.10, 0.11, 0.11, 0.11, 0.11, 0.1188, 0.11, 0.23);


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