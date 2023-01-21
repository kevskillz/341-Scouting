function process_num(num) {
    $.ajax({
        type: 'GET',
        url: `${ROOT_URL}match_fields`,
        success: function (fields) {

            $.ajax({
                type: 'GET',
                url: `${ROOT_URL}from_comp/${localStorage.getItem('COMP')}/team/${num}`,
                success: function (response) {
                   
                    console.log(response)

                    // let spec = new Array(fields.length).fill(TableSpec.NORMAL)
                    // spec[0] = TableSpec.EXCLUDE;
                    // spec[1] = TableSpec.NUMSORT;
                    // let last = response.pop()
                    
                    
                    // createTable(response, fields, spec, "match_table", [{ column: "MatchNumber", dir: "asc" }],150)
                    
                    /**
                     * REVERSE ORDER OF DIV INIT
                     */
                    document.getElementById('tele_charge_point_graph').innerHTML = '';
                    document.getElementById('auto_graph').innerHTML = '';
                    document.getElementById('cube_piece_graph').innerHTML = '';
                    document.getElementById('cone_piece_graph').innerHTML = '';
                    document.getElementById('game_piece_graph').innerHTML = '';
                    document.getElementById('point_graph').innerHTML = '';
                    // document.getElementById('spider').innerHTML = '';

                    // createSpider([last],['CHARGING STATION PPG','AUTO PPG','GAME PIECE PPG','TOTAL PPG'],'spider');

                    createLineGraph(response, 'MatchNumber', 'TOTAL_POINTS', 'point_graph');
                    
                    createLineGraph(response, 'MatchNumber', 'GAME_PIECE_POINTS', 'game_piece_graph');

                    createLineGraph(response, 'MatchNumber', 'CONE_PIECE_POINTS', 'cone_piece_graph');

                    createLineGraph(response, 'MatchNumber', 'CUBE_PIECE_POINTS', 'cube_piece_graph');

                    createLineGraph(response, 'MatchNumber', 'AUTO_POINTS', 'auto_graph');

                    createLineGraph(response, 'MatchNumber', 'TELE_CHARGING_STATION_POINTS', 'tele_charge_point_graph');

                    

                   


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
                    
                    
                    createTable(response, fields, spec, "pit_table", null, null, false)
                    
                    
                   


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