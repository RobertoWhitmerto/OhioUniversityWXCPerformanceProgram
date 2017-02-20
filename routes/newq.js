var util = require('util');
var db = require('./localdb')

var insert = 'INSERT INTO %s %s VALUES %s'; //insert into table columns VALUES (values)
var select = 'SELECT %s FROM %s'; //select columns from table
var del = 'DELETE FROM %s WHERE %s'; //Delete from table where condition
var update = 'UPDATE %s SET %s WHERE %s'; //update table set column(s)=value(s) WHERE condition
var condition = ' WHERE %s'; //condition
var join = ' JOIN %s ON %s'; //join clause



//return a selection string from the desired table
//precondition: columns is a string in the form "*" or "column1, column2, column3,...etc"
function selectquery(table, columns, cond, result){
	if(table == null) throw err;
	if(columns == null) columns = "*";

	var string = util.format(select, columns, table);
	if(cond != null && cond != ""){
		string += util.format(condition, cond);
	}

	return result(string);
}

//return a string that is an insert query to the given table with the given values
function insertquery(table, columns, values, result){
	if(table == null || columns == null || values == null)
		throw err;

	var string = util.format(insert, table, columns, values);
	return result(string);
}


//return a string that is a delete query for a given table
function deletequery(table, condition, result){
	//don't allow delete without condition
	if(table == null || condition == null) throw err;

	var string = util.format(del, table, condition);
	return result(string);
}

//return a string that is an update query for a given table;
function updatequery(table, updates, condition, result){

	if(table == null || updates == null || condition == null) throw err;

	var string = util.format(update, table, updates, condition);
	return result(string);
}

//execute a query
function exec_query(querystring, result){
	console.log(querystring);
	db.query(querystring, function(err, rows, fields) {
		if(err) throw err;
		else {
			result(err, rows, fields);
		}
	});
}

//find any users that match data passed in or default to all users
//returns false if none found
function get_user(input, done){
	var table = "user_view";
	var columns = "*";
	var conditions = [];

	//add the conditions that were passed in
	if(input.user) conditions.push(`username="${input.user}"`);
	if(input.pass) conditions.push(`password="${input.pass}"`);
	if(input.email) conditions.push(`email="${input.email}"`);
	if(input.first) conditions.push(`first="${input.first}"`);
	if(input.last) conditions.push(`last="${input.last}"`);
	if(input.role) conditions.push(`role_name="${input.role}"`);
	
	//join array with seperator
	var condition = conditions.join(' AND ');

	//build and execute the query
	selectquery(table, columns, condition, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not find any matching users", false, false);}
			return done(null, rows);
		});
	});
}

//find any workouts in db that match data passed in
//returns false if none found
function get_workout(input, done){
	var table = "workout_view";
	var columns = "*";
	var conditions = [];

	//check for all possible conditions passed in
	if(input.athlete) conditions.push(`username="${input.username}"`);
	if(input.date) conditions.push(`date="${input.date}"`);
	if(input.sleep) conditions.push(`sleep="${input.sleep}"`);
	if(input.Illness) conditions.push(`health="${input.Illness}"`);
	if(input.Injury) conditions.push(`injury="${input.Injury}"`);
	if(input.percent_health) conditions.push(`percent_health="${input.percent_health}"`);
	if(input.cycle_start) conditions.push(`cycle_start="${input.cycle_start}"`);
	if(input.RPE) conditions.push(`RPE="${input.RPE}"`);
	if(input.time) conditions.push(`time="${input.time}"`);
	if(input.distance) conditions.push(`distance="${input.distance}"`);
	if(input.workout_id) conditions.push(`workout_id="${input.workout_id}"`);
	if(input.rpeinfo) conditions.push(`RPEinfo="${input.rpeinfo}"`);
	if(input.hungry) conditions.push(`score="${input.hungry}"`);

	//join array
	var condition = conditions.join(' AND ');

	//build and execute the query
	selectquery(table, columns, condition, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not find any matching workouts", false, false);}
			return done(null, rows);
		});
	});
}

//find any teams in db that match data passed in, or default to all teams
//returns false if none found
function get_team(input, done){
	var table = "team_view";
	var columns = "*";
	var conditions = [];

	//check for all possible conditions
	if(input.team_name) conditions.push(`team_name="${input.team_name}"`);
	if(input.sport) conditions.push(`sport="${input.sport}"`);
	if(input.gender) conditions.push(`gender="${input.gender}"`);

	//join array
	var condition = conditions.join(' AND ');

	//build and execute the query
	selectquery(table, columns, condition, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not find any matching teams", false, false);}
			return done(null, rows);
		});
	});
}

function get_surfaces(done){
	var table = "Surface";

	//build and execute the query
	selectquery(table, null, null, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not find any matching surfaces", false, false);}
			return done(null, rows);
		});
	});
}

function get_health(done){
	var table = "Health";

	//build and execute the query
	selectquery(table, null, null, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not find any matching health entries", false, false);}
			return done(null, rows);
		});
	});
}

function get_hunger(done){
	var table = "Hunger";

	//build and execute the query
	selectquery(table, null, null, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not find any matching hunger entries", false, false);}
			return done(null, rows);
		});
	});
}

function get_injury(done){
	var table = "Injury";

	//build and execute the query
	selectquery(table, null, null, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not find any matching injury entries", false, false);}
			return done(null, rows);
		});
	});
}

function get_RPE(done){
	var table = "RPE";

	//build and execute the query
	selectquery(table, null, null, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not find any matching RPE entries", false, false);}
			return done(null, rows);
		});
	});
}

function get_RPEInfo(done){
	var table = "RPEinfo";

	//build and execute the query
	selectquery(table, null, null, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not find any matching RPEinfo entries", false, false);}
			return done(null, rows);
		});
	});
}

function insert_user(input, done){
	var table = "User";
	var columns = "(username, password, email, first, last, rid, create_time, passflag)";
	var values = `("${input.username}", "password", "${input.email}", "${input.first}", "${input.last}", "${input.userrole}", NOW(), "T")`;

	insertquery(table, columns, values, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not insert user", false, false);}
			return done(null, rows);
		});
	});
}

function insert_team(input, done){
	var table = "Teams";
	var columns = "(team_name, sport, gender)";
	var values = `("${input.team_name}", "${input.sport}", "${input.gender}")`;

	insertquery(table, columns, values, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not insert user", false, false);}
			return done(null, rows);
		});
	});
}

function insert_userteam(input, done){
	var table = "User_Teams";
	var columns = "(uid, tid)";
	var values = `("${input.user}", "${input.team}")`;

	insertquery(table, columns, values, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not insert user", false, false);}
			return done(null, rows);
		});
	});
}

function insert_workout(input, done){
	var table = "Workouts";
	var columns = "(uid, date, sleep, health, Injury, percent_health, cycle_start, RPE, RPEInfo, time, distance, hunger, notes)";
	var date = input.currentyear+"-"+month_lookup(input.month)+"-"+input.day;
	var query = `INSERT INTO ${table} ${columns} SELECT User.uid, "${date}", "${input.sleep}", "${input.health}", "${input.injury}", "${input.percent_health}", "${input.cycle_start}", "${input.RPE}", "${input.RPEInfo}", "${input.time}", "${input.distance}", "${input.hunger}", "${input.notes}" FROM User WHERE username="${input.username}"`; 

	exec_query(query, function(err, rows, fields){
		if(err) {return done(err);}
		if(rows.length <= 0) {return done("could not insert user", false, false);}
		return done(null, rows);
	});
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

insert_workout({username: "username", date: "testd", sleep: "3", health: "healthy", injury: "injured", percent_health: "75%", cycle_start: "yes", RPE: "6", RPEInfo: "zone 1", time: "30", distance: "2", hunger: "3", notes: "This is a note"});