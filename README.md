# 341-Scouting

Check out my blog post! [https://www.kevinlobo.us/blog/posts/scouting-app](https://www.kevinlobo.us/blog/posts/scouting-app)

Most up-to-date code on team's private repo.

Check out the website here: https://scouting.team341.com/

***Note:** the API/Database is not up yet for this year since it is modified every year to match the game, so no data will be loaded* 

## The Problem
In the past, our robotics team relied on paper scouting to keep track of robot metrics for every single match. This data was then manually transferred to an Excel spreadsheet to analyze, which was very time-consuming and often inaccurate. We required one person to always miss out because they were in charge of data entry, sitting in a corner looking at pieces of paper and typing them into Excel. Also this data could only be accessed on one computer and it was not very accessible for our team to use. Ultimately, using paper scouting was not only inefficient but also prone to errors. The manual data entry process took up a significant amount of time and often led to inaccuracies that affected our match predictions and team selections. I knew that we could digitize this process, and did just that!

## The Solution: This Scouting App!
To address these issues, I led the creation of a scouting app using the following tech stack:
- **Flutter Android App to Collect Data**: Developed an Android app so scouts could easily log robot data and create QR codes with the data. Since competitions did not have Wi-Fi, QR codes were used to sync data later.
- **Flutter Web App to Scan Data**: Used to scan QR codes from multiple tablet scouts.
- **MySQL Database**: Stores pit scouting app 
- **Express.js REST API to Query Data**: Synced and queried data from a MySQL database and provided many endpoints to get query, process, and analyze data.
- **Website to Visualize Data**: Visualized data using D3.js and Tabulator.js to be used in upcoming matches, alliance selection, and deciding future strategies.
