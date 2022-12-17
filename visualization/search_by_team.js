function process_num(num) {
    $.ajax({
        type: 'GET',
        url: `${ROOT_URL}/match_fields`,
        success: function (fields) {

            $.ajax({
                type: 'GET',
                url: `${ROOT_URL}/from_comp/${localStorage.getItem('COMP')}/team/${num}`,
                success: function (response) {
                   
                    

                    let spec = new Array(fields.length).fill(TableSpec.NORMAL)
                    spec[0] = TableSpec.EXCLUDE;
                    spec[1] = TableSpec.NUMSORT;
                    let last = response.pop()
                    
                    
                    createTable(response, fields, spec, "match_table", [{ column: "MATCH_NUMBER", dir: "asc" }],150)
                    
                    /**
                     * REVERSE ORDER OF DIV INIT
                     */
                    document.getElementById('climb_point_graph').innerHTML = ''
                    document.getElementById('auto_graph').innerHTML = ''
                    document.getElementById('ball_point_graph').innerHTML = ''
                    document.getElementById('point_graph').innerHTML = ''
                    document.getElementById('spider').innerHTML = ''

                    createLineGraph(response, 'MATCH_NUMBER', 'CLIMB_POINTS', 'climb_point_graph')
                    
                    createLineGraph(response, 'MATCH_NUMBER', 'AUTO_POINTS', 'auto_graph')

                    createLineGraph(response, 'MATCH_NUMBER', 'BALL_POINTS', 'ball_point_graph')

                    createLineGraph(response, 'MATCH_NUMBER', 'TOTAL_POINTS', 'point_graph')
                    createSpider([last],['CLIMB PPG','AUTO PPG','BALL PPG','TOTAL PPG'],'spider')

                   


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
        url: `${ROOT_URL}/pit_fields`,
        success: function (fields) {

            $.ajax({
                type: 'GET',
                url: `${ROOT_URL}/from_comp/${localStorage.getItem('COMP')}/pit/${num}`,
                success: function (response) {
                   
                    

                    let spec = new Array(response.length).fill(TableSpec.NORMAL)
                    spec[0] = TableSpec.EXCLUDE;
                    
                    
                    createTable(response, fields, spec, "pit_table", null, null)
                    
                    
                   


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