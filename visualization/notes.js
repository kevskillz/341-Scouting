jQuery(document).ready(function ($) {
    var myData;
    $("#statistics").sheetrock({
        url: "https://docs.google.com/spreadsheets/d/17wJLCLz0G-vl5esqIfKTuwK8kNjDsMTxZEZ1IOZ06IA/edit?#gid=0",
        callback: function (error, options, resp) {
            googleResponse = resp;
            console.log(googleResponse)
        }
    });

    // var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/17wJLCLz0G-vl5esqIfKTuwK8kNjDsMTxZEZ1IOZ06IA/edit#gid=0';
    // $('#statistics').sheetrock({
    //     url: mySpreadsheet
    // });
});
