function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}




$.ajax({
    type: 'GET',
    url: `${ROOT_URL}team_fields`,
    success: function (fields) {

        $.ajax({
            type: 'GET',
            url: `${ROOT_URL}from_comp/${localStorage.getItem('COMP')}/all_teams_arr`,
            success: function (response) {
                createBetterScatterPlot(response, 'CHARGING STATION PPG', 'GAME PIECE PPG', 'dataviz_cust_axisZoom')
                
                createDragDrop(['x-axis-drop', 'y-axis-drop'], fields, 'encasing-1', function (zones) {
                    console.log('creating...', zones)
                    let parent = document.getElementById('dataviz_cust_axisZoom')
                    parent.innerHTML = ''
                    // createScatterplot(response, zones[0], zones[1], 'TeamName', 'dataviz_cust_axisZoom')
                    createBetterScatterPlot(response, zones[0], zones[1], 'dataviz_cust_axisZoom')
                    console.log('done?')
                    console.log(response)
                });

                fields.unshift({
                    Field: 'TeamName'
                });

                spec = new Array(response.length).fill(TableSpec.NORMAL)
                spec[0] = TableSpec.NUMSORT;
                createTable(response, fields, spec, 'table', null, null, false, 100)
                // createBarChart(response, 'TeamName', 'TOTAL PPG', 'bar_chart')
                createTotalPPGStackedBarChart(response, 'bar_chart');

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


