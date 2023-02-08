var arr = [null, null, null, null, null, null]
function search(e) {
    if (e===undefined||e.code == 'Enter') {
        for (let i = 1; i <= 6; i++) {
            let num = parseInt(document.getElementById(`${i}`).value)
            if (isNaN(num)) arr[i - 1] = null;
            else arr[i - 1] = num
        }

        console.log(arr)
        let str = ''
        for (let i = 0; i<=2;i++) {
            if (arr[i] != null) {
                str += arr[i] + ','
            }
        }
        console.log(str)
        if (str.length>0) {
            str=str.slice(0,-1)
        }

        let str2 = ''
        for (let i = 3; i<=5;i++) {
            if (arr[i] != null) {
                str2 += arr[i] + ','
            }
        }
        if (str2.length>0) {
            str2=str2.slice(0,-1)
        }
        if ((str.length+str2.length)==0) return
        let str3 = str + '|' + str2
        console.log(str3)
        $.ajax({
            type: 'GET',
            url: `${ROOT_URL}from_comp/${localStorage.getItem('COMP')}/match_predict_custom/${str3}`,
            success: function (response) {
                console.log(response)

                let teamData = []
                for (let key in response) {
                    if (key!='B'&&key!='R') {
                        response[key]['TEAM'] = key;
                        teamData.push(response[key])
                    }
                }

                let blueScore = 0;
                let redScore = 0;
                for(let i = 0; i < teamData.length; i++){
                    if(teamData[i]["TeamColor"] == 'B'){
                        blueScore += teamData[i]["TOTAL PPG"]
                    }
                    if(teamData[i]["TeamColor"] == 'R'){
                        redScore += teamData[i]["TOTAL PPG"]
                    }
                }
                redScore /= (teamData.length / 2);
                blueScore /= (teamData.length / 2);
                blueScore.toFixed(2);
                redScore.toFixed(2);

                if(blueScore > redScore){
                document.getElementById('prediction').innerHTML = "Blue is predicted to win " + blueScore.toFixed(2) + " to " + redScore.toFixed(2);
                }
                else if(redScore > blueScore){
                    document.getElementById('prediction').innerHTML = "Red is predicted to win " + redScore.toFixed(2) + " to " + blueScore.toFixed(2);
                }
                else{
                    document.getElementById('prediction').innerHTML = "The teams will tie " + redScore.toFixed(2) + " to " + blueScore.toFixed(2);
                }

                document.getElementById('spider').innerHTML = ''
                document.getElementById('linear').innerHTML = ''


                createSpider([response.B, response.R],['TELE CHARGING STATION PPG','AUTO PPG', 'CUBE PPG', 'CONE PPG'],'spider',900)

              
                console.log(teamData)
                createLinearChart(teamData,Object.keys(teamData[0]).slice(0,-2),'linear','TEAM',900)
            },
            error: function (xhr, status, err) {
                console.log(xhr.responseText);
            }
        });
    }
}