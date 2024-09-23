#  Api endpoint programming test

## Technologies used:
- Express.js

## Dependecnies used:
- mongo-sanitize
- xss-clean

## Hours worked: 
3 hours

## How to test file:

1.) Git clone the repository into a specific folder of your choice.

2.) Run npm i to install express and other dependencies required for this project.

3.) In your terminal, cd into the folder you are using and run node app.js. Congrats! You now are running the express.js endpoint!

## Challenges, issues, and bugs:
Overall this was an easy assignment, I cannot say I had too much difficulty. That being said I did have a few pain points.

 1.) Sanitizing the data. Was a little unsure to what extent we wanted to sanitize the data, so I went with the assumption that
 we would be using MongoDB using Nosql. In that sense, the user cannot send malicious Mongodb commands to mess up or steal info from users.
 That being said, if the user decides to choose an SQL database, then the code can be prone to SQL injections, which would be a grave security risk. 

 2.) Was tested using Postman, and while there were no issues on that, there might be if another method is used. 

 3.) Sanitized to the extent that users cannot interfere with NoSQL dbs, cross-site scripting (XSS), and validating by ensuring the user cannot input any
  info other than what was required, while also trimming strings to not waste excess space in DB. That being said there may other forms of sanitization 
  I did not account for what could be an issue.
 
