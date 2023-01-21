var arr = [1,3,5]; //testing values
var names = ["A", "B", "C"]; //names3 of example scouts >> example output 5,3,1  C,B,A
leaderboard(arr,names);

function calculateScore(arr,names,result,winnername,bet){
    if(result){ //once we figure out if bet worked

        for(let i = 0; i < names.length; i++){

            if(names[i] = winnername){
                
                arr[i] = arr[i] + bet;
            }

        }

    }

    return leaderboard(arr,names);
}



function leaderboard(arr,names){

    var position = [];
  
    arr.sort(function(a, b){return b - a});
    

    console.log(arr);
    console.log(names);
    
return 0;
}


