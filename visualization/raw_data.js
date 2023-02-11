$.ajax({
    type: 'GET',
    url: `${ROOT_URL}match_fields`,
    success: function (fields) {

        $.ajax({
            type: 'GET',
            url: `${ROOT_URL}from_comp/${localStorage.getItem('COMP')}`,
            success: function (response) {
                
                spec = new Array(response.length).fill(TableSpec.NORMAL)
               
                spec[0] = TableSpec.EXCLUDE;
                spec[1] = TableSpec.NUMSORT;

                spec[4] = TableSpec.COLOR;
                for(let i = 0; i < spec.length; i++){
                    console.log(spec[i]);
                }
                
                createTable(response, fields, spec, "table", [{ column: "TeamColor", dir: "desc" },{ column: "MatchNumber", dir: "asc" }], //sort by this first
                null, true, 100)
        
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

