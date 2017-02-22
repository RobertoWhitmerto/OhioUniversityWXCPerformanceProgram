// Database interface for interacting with the OUWXC database
// TODO: restructure to ask for specific values rather than an entire input value.
// TODO: reformat queries to be more general and used for different things


var db = require("./db");

var authQuery = "SELECT * FROM OUWXC.user";
var insertData = "INSERT INTO OUWXC.athlete_data (athlete, date, sleep, Illness, Injury, percent_health, cycle_start, RPE, rpeinfo,time,distance,hungry,notes)";
var removeData = "DELETE FROM OUWXC.athlete_data";
var insertUser = "INSERT IGNORE INTO OUWXC.user(username, email, password, first, last, create_time, role)";
var deleteUser = "DELETE FROM OUWXC.user";
var getUser = "SELECT * FROM OUWXC.user";
var selectWorkouts = "SELECT * FROM OUWXC.athlete_data";
var updateData = "UPDATE OUWXC.user";

//fill out the query with the input data
function get_query(query, input, queryString) {
	var string = "";

	if(query == "authenticate")
	{
		string = authQuery;
		string += ` WHERE username="${input.user}"`;
	}
	else if(query == "insertD")
	{
		string = insertData;
		var date = input.currentyear+"-"+month_lookup(input.month)+"-"+input.day+" 00:00:01";
		string += ` VALUES ( "${input.user}", "${date}", "${input.sleephours}", "${input.illness}", "${input.injury}", "${input.percent_health}", "${input.cycle}", "${input.rpeval}", "${input.rpeinfo}", "${input.time}", "${input.distance}", "${input.hungry}", "${input.mynotes}")`;
	}
	else if(query == "insertU")
	{
		string = insertUser;
		string += ` VALUES ( "${input.newusername}", "${input.newuseremail}", "${input.newuserpw}", "${input.newuserfirst}", "${input.newuserlast}", NOW(), "${input.userrole}" )`;
	}
	else if(query == "remove")
	{
		string = deleteUser;
		string += ` WHERE username="${input.removeusername}" AND last="${input.removelastname}"`;
	}
	else if(query == "getU")
	{
		string = getUser;
		string += ` WHERE username="${input.user}"`;
	}
	else if(query == "getW")
	{
		if(input.team == null)
		{
			string = selectWorkouts;
			string += ` WHERE athlete="${input.user}" ORDER BY date DESC`;
		}
		else if(input.team != null)
		{
			string = selectWorkouts;
			string += ` JOIN OUWXC.user on user.username=athlete_data.athlete AND user.team="${input.team}" ORDER BY athlete_data.date DESC`;
		}
	}
	else if(query == "addteam")
	{
		string = updateData;
		string += ` SET team = "${input.team}" WHERE username="${input.username}"`;
	}
	else if(query == "remWork")
	{
		string = removeData;
		string += ` WHERE workout_id="${input.wID}"`;
	}
	else if(query == "listUsers")
	{
		string = `SELECT * FROM teams_view WHERE (team_name="`;
		var teams = input.team.join('" OR team_name="');
		string += teams + '")';
		console.log(string);
	}
	else if(query == "changepass")
	{
		string = `UPDATE user`;
		string += ` SET password="${input.pass}" WHERE username="${input.user}"`;
	}
	else if(query == "newTeam")
	{
		string = `INSERT INTO teams (team_name, sport, gender) VALUES ("${input.team_name}", "${input.sport}", "${input.gender}")`;
	}
	else if(query == "userTeam")
	{
		string = `INSERT INTO user_teams (username, team_name) VALUES ("${input.username}", "${input.team_name}")`;
	}
	else if(query == "getTeam")
	{
		string = `SELECT * FROM teams_view`;
		var conditions = [];
		if(input.team_name) conditions.push(`team_name="${input.team_name}"`);
		if(input.username) conditions.push(`username="${input.username}"`);
		if(conditions.length > 0) string += " WHERE " + conditions.join(' AND ');
	}
	else
	{
		console.log("error, could not find query");
	}

	queryString(string);
}

//execute any query
function exec_query(query, input, result) {

	var queryString = "";

	get_query(query, input, function(output){
		queryString = output;
	});

	db.query(queryString, function(err, rows, fields) {
        if (err) throw err;
		else {
			result(err, rows, fields);
		}
	});
}

//authenticate a user
function authenticate(input, done){

	var teams = [];
	
      exec_query("authenticate", input, function(err, rows, fields) {

      	exec_query("getTeam", {username: input.user}, function(teamerr, teamrows, teamfields){
      		for(var i=0; i<teamrows.length; i++){
      			teams.push(teamrows[i].team_name);
      		}


      	if (err) { return done(err); }
      	if (rows.length <= 0) {return done(null, false, {message: 'Username or password is incorrect'})}; 
      	done(null, rows, teams);
      });
     });

}

//get a list of matching users
function get_user(input, done){

	var teams = [];

	exec_query("getU", input, function(err, rows, fields){

      	exec_query("getTeam", {username: input.user}, function(teamerr, teamrows, teamfields){
      			for(var i=0; i<teamrows.length; i++){
      				teams.push(teamrows[i].team_name);
      			}

			if(err) { return done(err); }
			if(rows.length > 0) {
				return done(null, {id: rows[0].username, name: rows[0].first + ' ' + rows[0].last, role: rows[0].role, team: teams});
			}
		});
	});
}

//Remove a user from DB
function remove_user(input, done){
	
	exec_query("remove", input, function(err, rows, fields) {

	  if (err) { return done(err); }
	  if (rows.length === 0) {return done(null, false, {message: 'could not delete user'}); }
	  return done(null, rows);
	});
}

//Add a user to DB
function add_user(input, done){

	exec_query("insertU", input, function(err, rows, fields) {

		if(err){ return done(err);}
		if(rows.length === 0){return done(null, false, {message: 'could not insert user'}); }
		return done(null, rows);
	})
}

//Add a workout to DB
function add_workout(input, done){

	exec_query("insertD", input, function(err, rows, fields) {

		if(err){ return done(err);}
		if(rows.length === 0){return done({message: "could not insert data"})}
		done(null, rows);	
	});
}

//get a list of workouts from db
function get_workouts(input, done){

	exec_query("getW", input, function(err, rows, fields) {

		if(err) { return done(err);}
		if(rows.length === 0){return done({message: "No Data found"})}
		done(null, rows);
	});
}

//add a team association to a user
function add_team(input, done){

	exec_query("addteam", input, function(err, rows, fields) {

		if(err) { return done(err);}
		if(rows.length === 0){return done({message: "Could not add team"});}
		done(null, rows);
	});
}

function remove_workout(input, done){

	exec_query("remWork", input, function(err, rows, fields) {

		if(err) { return done(err);}
		if(rows.length === 0){return done({message: "Could not remove workout"});}
        done(null, rows);
	});
}

 function list_users(input, done){

		exec_query("listUsers", input, function(err, rows, fields) {

        	if (err){return done(err);}
        	if(rows.length === 0){return done({message: "no user's found"});}
			done(null, rows);
		});
 }

 function edit_workout(input, done){

	exec_query("editWork", input, function(err, rows, fields) {

		if(err) { return done(err);}
		if(rows.length === 0){return done({message: "Could not edit workout"})}
        done(null, rows);
	});


 }


 function change_password(input, done){
	
	exec_query("changepass", input, function(err, rows, fields) {

		if(err) { return done(err);}
		if(rows.length == 0){return done({message: "Could not change password"})}
	done(null, rows);
	});

}

//Adding some quick and dirty changes to provide multi team support, working on complete overhaul in seperate branch

function add_team(input, done){

	exec_query("newTeam", input, function(err, rows, fields){
		if(err) {return done(err);}
		if(rows.length <= 0){return done({message: "Could not add team"});}
		done(null, rows);
	})
}

function add_userteam(input, done){

	exec_query("userTeam", input, function(err, rows, fields){
		if(err) {return done(err);}
		if(row.length <= 0){return done({message: "could not add user to team"});}
		done(null, rows);
	})
}

function get_teams(input, done){

	exec_query("getTeam", input, function(err, rows, fields){
		if(err) {return done(err);}
		if(row.length <= 0){return done({message: "could not find any teams"});}
		done(null, rows);
	})
}


 function month_lookup(month){

 	if(month == "January")
 	{
 		return "01";
 	}
 	else if(month == "February")
 	{
 		return "02";
 	}
  	else if(month == "March")
 	{
 		return "03";
 	}
 	else if(month == "April")
 	{
 		return "04";
 	}
  	else if(month == "May")
 	{
 		return "05";
 	}
 	else if(month == "June")
 	{
 		return "06";
 	}
 	else if(month == "July")
 	{
 		return "07";
 	}
 	else if(month == "August")
 	{
 		return "08";
 	}
  	else if(month == "September")
 	{
 		return "09";
 	}
  	else if(month == "October")
 	{
 		return "10";
 	}
  	else if(month == "November")
 	{
 		return "11";
 	}
  	else if(month == "December")
 	{
 		return "12";
 	}
 }

module.exports.get_query = get_query;
module.exports.exec_query = exec_query;
module.exports.authenticate = authenticate;
module.exports.get_user = get_user;
module.exports.remove_user = remove_user;
module.exports.add_user = add_user;
module.exports.add_workout = add_workout;
module.exports.get_workouts = get_workouts;
module.exports.add_team = add_team;
module.exports.remove_workout = remove_workout;
module.exports.edit_workout = edit_workout;
module.exports.list_users = list_users;
module.exports.change_password = change_password;
module.exports.add_team = add_team;
module.exports.add_userteam = add_userteam;
module.exports.get_teams = get_teams;
