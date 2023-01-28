var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/17wJLCLz0G-vl5esqIfKTuwK8kNjDsMTxZEZ1IOZ06IA/edit#gid=0';

;
jQuery(document).ready(function ($) {

    // jQuery code is in here

    // Load an entire worksheet.
    $('#statistics').sheetrock({
        url: mySpreadsheet
    })
});