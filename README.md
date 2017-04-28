# Ohio University Womens Cross Country Performance Program

## CS 4560 Senior Capstone Software Design/Development project

This repository is for Team on a Cob's senior design project for CS 4560/4561 at Ohio University. The project is a web application to allow student athletes, specifically the Women's Cross Country team, to enter data in regarding their training, health, diet, among other things. Trainers, coaches, and staff will be able to more easily access this data to give personalized care regarding their personalized functions and equations gathered from phsyiological testing.

## Branch Descriptions:
Master - Main code base for the project.  This branch houses live versions of code that is running on our AWS server.

Bcrypt(DEAD BRANCH) - This branch is used to implement hashing to our login and user creation features of the application.

Bcrypt2 - Newest attempt to implement password hashing for the application

Testing - This branch was used to implement unit testing features into the application.

## Project Instalation:
Prerequisites - Have EBCLI installed and configured.  The database settings in the db.js file must be configured to an AWS account.

## Steps to push to LIVE:
Commit any changes you wish to have included in the live version.  
Use "eb debloy" command upload the most recent commit to the live server.

## Project Code Locations:
All code for the project is stored in the github repository that houses this README file.

## Project Directory Description:  
__Main Directory__ - houses configuration files for the database and application.  It also contains ignore files for git and ebcli.  
__Demos__ contains demo documents from first semester. Likely to be removed/trimmed prior to end of project.  
__ExtraDocuments__ directory that contains testing information, presentations to fulfill course assignments.  Also contains documents to track individual goals for sprints.  
__node_modules__ directory containing the nodejs modules the application needs to function.  
__public__ contains css and javascript code relating to materialize which is used in our html/pug code.  
__routes__ directory that holds code that determines how we handle user requests from the web application. It also contains code for queries needed for the application to function.  
__test__ contains unit test code utilized by Mocha/Chai modules to test our code base.  
__views__ directory that houses our applications front end jade/pug code   

## Deployment URL

![alt text](http://i.imgur.com/JX5SOqy.png "Deployment URL")

Developer AWS account: http://ouwxcpp.ik3pvw7c5h.us-west-2.elasticbeanstalk.com (will be deleted soon)

Client AWS account: http://ohioperformanceprogram.us-west-2.elasticbeanstalk.com

[![Video Walkthrough](https://puu.sh/vx7mu/0017e8c84d.png)](https://m.youtube.com/watch?v=fYns7_QJ8Ic "Video Walkthrough")

## Team on a Cob members:

Andrew Leach

Brent Gruber

Lucas Nation

Pete Essman

Robert Whitmer :surfer:
