$.ajax({
    type: 'GET',
    url: `${ROOT_URL}/match_fields`,
    success: function (fields) {

        $.ajax({
            type: 'GET',
            url: `${ROOT_URL}/from_comp/${localStorage.getItem('COMP')}`,
            success: function (response) {

                spec = new Array(response.length).fill(TableSpec.NORMAL)
                spec[0] = TableSpec.EXCLUDE;
                spec[1] = TableSpec.NUMSORT;

                spec[4] = TableSpec.COLOR;

                createTable(response, fields, spec, "table", [{ column: "TEAM_COLOR", dir: "desc" },{ column: "MATCH_NUMBER", dir: "asc" }], //sort by this first
                null)
        
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

