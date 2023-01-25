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
                        if(response[0]['Auto1'] == 1 || response[0]['Auto1'] == 2|| response[0]['tele1'] == 1 || response[0]['tele1'] == 2){
                            s1++;
                        }
                        else if(response[0]['Auto2'] == 1 || response[0]['Auto2'] == 2|| response[0]['tele2'] == 1 || response[0]['tele2'] == 2){
                            s2++;
                        }
                        else if(response[0]['Auto3'] == 1 || response[0]['Auto3'] == 2|| response[0]['tele3'] == 1 || response[0]['tele3'] == 2){
                            s3++;
                        }
                        else if(response[0]['Auto4'] == 1 || response[0]['Auto4'] == 2|| response[0]['tele4'] == 1 || response[0]['tele4'] == 2){
                            s4++;
                        }
                        else if(response[0]['Auto5'] == 1 || response[0]['Auto5'] == 2|| response[0]['tele5'] == 1 || response[0]['tele5'] == 2){
                            s5++;
                        }
                        else if(response[0]['Auto6'] == 1 || response[0]['Auto6'] == 2|| response[0]['tele6'] == 1 || response[0]['tele6'] == 2){
                            s6++;
                        }
                        else if(response[0]['Auto7'] == 1 || response[0]['Auto7'] == 2|| response[0]['tele7'] == 1 || response[0]['tele7'] == 2){
                            s7++;
                        }
                        else if(response[0]['Auto8'] == 1 || response[0]['Auto8'] == 2|| response[0]['tele8'] == 1 || response[0]['tele8'] == 2){
                            s8++;
                        }
                        else if(response[0]['Auto9'] == 1 || response[0]['Auto9'] == 2|| response[0]['tele9'] == 1 || response[0]['tele9'] == 2){
                            s9++;
                        }
                        else if(response[0]['Auto10'] == 1 || response[0]['Auto10'] == 2|| response[0]['tele10'] == 1 || response[0]['tele10'] == 2){
                            s10++;
                        }
                        else if(response[0]['Auto11'] == 1 || response[0]['Auto11'] == 2|| response[0]['tele11'] == 1 || response[0]['tele11'] == 2){
                            s11++;
                        }
                        else if(response[0]['Auto12'] == 1 || response[0]['Auto12'] == 2|| response[0]['tele12'] == 1 || response[0]['tele12'] == 2){
                            s12++;
                        }
                        else if(response[0]['Auto13'] == 1 || response[0]['Auto13'] == 2|| response[0]['tele13'] == 1 || response[0]['tele13'] == 2){
                            s13++;
                        }
                        else if(response[0]['Auto14'] == 1 || response[0]['Auto14'] == 2|| response[0]['tele14'] == 1 || response[0]['tele14'] == 2){
                            s14++;
                        }
                        else if(response[0]['Auto15'] == 1 || response[0]['Auto15'] == 2|| response[0]['tele15'] == 1 || response[0]['tele15'] == 2){
                            s15++;
                        }
                        else if(response[0]['Auto16'] == 1 || response[0]['Auto16'] == 2|| response[0]['tele16'] == 1 || response[0]['tele16'] == 2){
                            s16++;
                        }
                        else if(response[0]['Auto17'] == 1 || response[0]['Auto17'] == 2|| response[0]['tele17'] == 1 || response[0]['tele17'] == 2){
                            s17++;
                        }
                        else if(response[0]['Auto18'] == 1 || response[0]['Auto18'] == 2|| response[0]['tele18'] == 1 || response[0]['tele18'] == 2){
                            s18++;
                        }
                        else if(response[0]['Auto19'] == 1 || response[0]['Auto19'] == 2|| response[0]['tele19'] == 1 || response[0]['tele19'] == 2){
                            s19++;
                        }
                        else if(response[0]['Auto20'] == 1 || response[0]['Auto20'] == 2|| response[0]['tele20'] == 1 || response[0]['tele20'] == 2){
                            s20++;
                        }
                        else if(response[0]['Auto21'] == 1 || response[0]['Auto21'] == 2|| response[0]['tele21'] == 1 || response[0]['tele21'] == 2){
                            s21++;
                        }
                        else if(response[0]['Auto22'] == 1 || response[0]['Auto22'] == 2|| response[0]['tele22'] == 1 || response[0]['tele22'] == 2){
                            s22++;
                        }
                        else if(response[0]['Auto23'] == 1 || response[0]['Auto23'] == 2|| response[0]['tele23'] == 1 || response[0]['tele23'] == 2){
                            s23++;
                        }
                        else if(response[0]['Auto24'] == 1 || response[0]['Auto24'] == 2|| response[0]['tele24'] == 1 || response[0]['tele24'] == 2){
                            s24++;
                        }
                        else if(response[0]['Auto25'] == 1 || response[0]['Auto25'] == 2|| response[0]['tele25'] == 1 || response[0]['tele25'] == 2){
                            s25++;
                        }
                        else if(response[0]['Auto26'] == 1 || response[0]['Auto26'] == 2|| response[0]['tele26'] == 1 || response[0]['tele26'] == 2){
                            s26++;
                        }
                        else if(response[0]['Auto27'] == 1 || response[0]['Auto27'] == 2|| response[0]['tele27'] == 1 || response[0]['tele27'] == 2){
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
                    

                    //     var row = document.getElementById('txtrow').value;
                    //     var col = document.getElementById('txtcolumn').value;
                    //     var divTable = document.getElementById('divTable');
                    //     var str;
                    //     var i, j;
                    //     str = '<table border="1" width="100%">';
                    
                    //     for(i = 0; i < row; i++)
                    //     {
                    //         str += '<tr>';
                            
                    //         str += '<td style="background-color:'+ rgb(255 * s1, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s2, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s3, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s4, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s5, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s6, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s7, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s8, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s9, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s10, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s11, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s12, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s13, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s14, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s15, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s16, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s17, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s18, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s19, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s20, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s21, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s22, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s23, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s24, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s25, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s26, 0, 0) +';");>&nbsp;</td>';
                    //         str += '<td style="background-color:'+ rgb(255 * s27, 0, 0) +';");>&nbsp;</td>';

                            
                    //         str += '</tr>';
                    //     }
                    //     str += '</table>';
                    //     divTable.innerHTML = str;
                    
                    
                    
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
                    document.getElementById('heatMap').innerHTML = '';
                    
                   
                    
                    createLineGraph(response, 'MatchNumber', 'GAME_PIECE_POINTS', 'game_piece_graph');
                    
                    createLineGraph(response, 'MatchNumber', 'TOTAL_POINTS', 'point_graph');

                    createLineGraph(response, 'MatchNumber', 'CONE_PIECE_POINTS', 'cone_piece_graph');

                    createLineGraph(response, 'MatchNumber', 'CUBE_PIECE_POINTS', 'cube_piece_graph');

                    createLineGraph(response, 'MatchNumber', 'TELE_CHARGING_STATION_POINTS', 'tele_charge_point_graph');

                    createLineGraph(response, 'MatchNumber', 'AUTO_POINTS', 'auto_graph');                    

                    createSpider([last],['TELE CHARGING STATION PPG','AUTO PPG','GAME PIECE PPG'],'spider');

                    // createHeatMap(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22, s23, s24, s25, s26, s27);
                   
                    createHeatMap(heatMap, 0.001, 0.02, 0.03, 0.04, 0.05, 0.06, 0.000007, 0.08, 0.09, 0.1, 0.1, 0.2, 0.3, 0.5, 0.6, 0.7, 0.7, 0.8, 0.8, 0.10, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.23,)


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