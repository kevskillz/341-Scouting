# 341-Scouting



Check out my blog post! [https://www.kevinlobo.us/blog/posts/scouting-app](https://www.kevinlobo.us/blog/posts/scouting-app)

Check out the website here: https://scouting.team341.com/

![home](/images/scouting_app/web_home.png)

***Note:** the API/Database is not up yet for this year since it is modified every year to match the game, so no data will be loaded* 

## The Problem
In the past, our robotics team relied on paper scouting to keep track of robot metrics for every single match. This data was then manually transferred to an Excel spreadsheet to analyze, which was very time-consuming and often inaccurate. We required one person to always miss out because they were in charge of data entry, sitting in a corner looking at pieces of paper and typing them into Excel. Also this data could only be accessed on one computer and it was not very accessible for our team to use. Ultimately, using paper scouting was not only inefficient but also prone to errors. The manual data entry process took up a significant amount of time and often led to inaccuracies that affected our match predictions and team selections. I knew that we could digitize this process, and did just that!

## The Solution: Scouting App
To address these issues, I led the creation of a scouting app using the following tech stack:
- **Flutter Android App to Collect Data**: Developed an Android app so scouts could easily log robot data and create QR codes with the data. Since competitions did not have Wi-Fi, QR codes were used to sync data later.
- **Flutter Web App to Scan Data**: Used to scan QR codes from multiple tablet scouts.
- **MySQL Database**: Stores pit scouting app 
- **Express.js REST API to Query Data**: Synced and queried data from a MySQL database and provided many endpoints to get query, process, and analyze data.
- **Website to Visualize Data**: Visualized data using D3.js and Tabulator.js to be used in upcoming matches, alliance selection, and deciding future strategies.

## Android App
We developed the Android app using Flutter. This allowed scouts to easily log robot data and create QR codes with the data. The use of QR codes was essential as competitions did not have Wi-Fi, so data had to be synced later. We used this to collect data about robots live during matches as well as information about them at their pits.

![First Android](/images/scouting_app/first_android.png)
*Autofills team number by querying blue alliance API, which is preloaded and saved whenever WIFI is available*

![Second Android](/images/scouting_app/second_android.png)
*Tracks necessary data during autonomous period, noteably the locations of where notes are picked up. This data was very useful in ensuring compatible autos during alliance selection.*

![Third Android](/images/scouting_app/third_android.png)
*Tracks necessary data during teleoperated period. After this, the data is submitted and a QR code is generated to be scanned.*

## Scanning App
The Flutter web app was used to scan QR codes from multiple tablet scouts using a Surface Pro which has a webcam. This ensured that all the data collected by different scouts could be consolidated efficiently. This also allowed us to locally store and push data to our MySQL database once we were connected to WIFI.

![Scanning App](/images/scouting_app/scanning_app.png)


## REST API
We used an Express.js API to sync, process, and query data from a MySQL database. This backend infrastructure was crucial for handling the data flow and ensuring that all information was up-to-date and accurate. We also hosted our match prediction and score calculation algorithms based on collected scouting data here, making it super easy to query info from the frontend website.

## Website with Data Visualization
The website was build with HTML/CSS/JS and visualized the data using the D3.js and Tabulator.js JavaScript libraries. This allowed us to create detailed and interactive visualizations of the collected data, which was essential for making informed decisions. We were also able to make match predictions and generate a pick list during alliance selection all on this website, making it super useful and accessible.

![More Graphs](/images/scouting_app/more_graphs.png)
*These are examples of a few different graphs the website displays.*
![Custom Graph](/images/scouting_app/custom_graph.png)
*This allows the user to create a custom 2D graph to analyze various trends.*

![Spider Graph](/images/scouting_app/spider_graph.png)
*This shows specific information and strengths/weaknesses of one specific robot.*

![Raw Data](/images/scouting_app/raw_data.png)
*This queries and displays all the match data stored in the database.*



## Impact
The scouting app resulted in:
- 7+ FRC teams using our app and data, with over 400 users.
- Saving us 20+ hours every competition on data entry, getting rid of the data entry role (the worst job).
- More accurate match predictions than before.
- Saved many trees by not using hundreds of pieces of paper every competition.

## Conclusion
Creating this scouting app was a game-changer for our team. It not only saved us time but also improved the accuracy of our data, which was crucial for making informed decisions during competitions.
