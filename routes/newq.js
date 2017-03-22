var util = require('util');
var db = require('./db')

var insert = 'INSERT INTO %s %s VALUES %s'; //insert into table columns VALUES (values)
var select = 'SELECT %s FROM %s'; //select columns from table
var del = 'DELETE FROM %s WHERE %s'; //Delete from table where condition
var update = 'UPDATE %s SET %s WHERE %s'; //update table set column(s)=value(s) WHERE condition
var condition = ' WHERE %s'; //condition
var join = ' JOIN %s ON %s'; //join clause



//return a selection string from the desired table
//precondition: columns is a string in the form "*" or "column1, column2, column3,...etc"
function selectquery(table, columns, cond, result){
	if(table == null) console.log(err.code);
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
		console.log(err.code);

	var string = util.format(insert, table, columns, values);
	return result(string);
}


//return a string that is a delete query for a given table
function deletequery(table, condition, result){
	//don't allow delete without condition
	if(table == null || condition == null) console.log(err.code);

	var string = util.format(del, table, condition);
	return result(string);
}

//return a string that is an update query for a given table;
function updatequery(table, updates, conditions, result){

	if(table == null || updates == null || condition == null) console.log(err.code);

	var string = util.format(update, table, updates, conditions);

	return result(string);
}

//execute a query
function exec_query(querystring, result){
	db.query(querystring, function(err, rows, fields) {
		if(err) return result(err.code, rows);
		else if(rows.length<=0) result("query failed", rows);
		else {
			result(null, rows);
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
	if(input.username) conditions.push(`username="${input.username}"`);
	if(input.password) conditions.push(`password="${input.password}"`);
	if(input.email) conditions.push(`email="${input.email}"`);
	if(input.first) conditions.push(`first="${input.first}"`);
	if(input.last) conditions.push(`last="${input.last}"`);
	if(input.role) conditions.push(`role_name="${input.role}"`);
	
	//join array with seperator
	var condition = conditions.join(' AND ');

	//build and execute the query
	selectquery(table, columns, condition, function(query){
		console.log(query);
		exec_query(query, done);
	});
}

//find any workouts in db that match data passed in
//returns false if none found
function get_workout(input, done){
	var table = "workout_view";
	var columns = "*";
	var conditions = [];

	//check for all possible conditions passed in
	if(input.username) conditions.push(`username="${input.username}"`);
	if(input.teams) conditions.push(joinor(input.teams, "team_name"));
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
		console.log(query);
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
	var table = "Teams";
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

function get_userteam(input, done){
	var table = "team_view";
	var columns = "*";
	var conditions = [];
	var users = "";
	var teams = "";

	if(input.users){
		users = joinor(input.users, "username");
		conditions.push(users);
	}
	if(input.teams){
		teams = joinor(input.teams, "team_name");
		conditions.push(teams);
	}

	var condition = conditions.join(' AND ');

	selectquery(table, columns, condition, function(query){
		exec_query(query, done);
	});
}

function joinor(list, column){
	var temp = [];
	for(var i=0; i<list.length; i++){
		temp.push(`"` + list[i] + `"`);
	}
	var joins = `(${column}=` + temp.join(` OR ${column}=`) + ")";
	return joins;
}

function get_all(table, done){
	//build and execute the query
	selectquery(table, null, null, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not find any matches", false, false);}
			return done(null, rows);
		});
	});
}

function get_surfaces(done){
	var table = "Surface";
	get_all(table, done);
}

function get_health(done){
	var table = "Health";
	get_all(table, done);
}

function get_hunger(done){
	var table = "Hunger";
	get_all(table, done);
}

function get_injury(done){
	var table = "Injury";
	get_all(table, done);
}

function get_RPE(done){
	var table = "RPE";
	get_all(table, done);
}

function get_RPEInfo(done){
	var table = "RPEinfo";
	get_all(table, done);
}

function insert_user(input, done){
	var table = "User";
	var columns = "(username, password, email, first, last, rid, create_time, passflag)";
	var values = `("${input.username}", "password", "${input.email}", "${input.first}", "${input.last}", "${input.role}", NOW(), "T")`;
	console.log(input);

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
	var values = `("${input.username}", "${input.team_name}")`;

	console.log(input);

	var uid;
	get_user(input, function(err, rows, fields){
		if(err) console.log(err.code);
		uid = rows[0].uid;

	var tid;
	get_team(input, function(err, rows, fields){
		if(err) console.log(err.code);
		tid = rows[0].tid;

	console.log(tid);

	values = `("${uid}", "${tid}")`;


	insertquery(table, columns, values, function(query){
		exec_query(query, function(err, rows, fields){
			if(err) {return done(err);}
			if(rows.length <= 0) {return done("could not insert user", false, false);}
			return done(null, rows);
		});
	});
});
});
}

function insert_workout(input, done){
	var table = "Workouts";
	var columns = "(uid, date, sleep, health, Injury, percent_health, cycle_start, RPE, RPEInfo, time, distance, hunger, notes)";
	var date = input.currentyear+"-"+month_lookup(input.month)+"-"+input.day;
	var query = `INSERT INTO ${table} ${columns} SELECT User.uid, "${date}", "${input.sleephours}", "${input.illness}", "${input.injury}", "${input.percent_health}", "${input.cycle}", "${input.rpeval}", "${input.rpeinfo}", "${input.time}", "${input.distance}", "${input.hungry}", "${input.mynotes}" FROM User WHERE username="${input.user}"`; 

	console.log(query);

	exec_query(query, done);
}


//remove a workout from the database given a workout id
function remove_workout(input, done){
	var table = "Workouts";
	var cond = `wid="${input.wid}"`;


	deletequery(table, cond, function(query){
		exec_query(query, done);
	});
}

function remove_user(input, done){
	var table = "User";
	var cond = `username="${input.username}"`;

	deletequery(table, cond, function(query){
		exec_query(query, done);
	});
}

function remove_team(input, done){
	var table = "Teams";
	var cond = `team_name="${input.team_name}"`;

	deletequery(table, cond, function(query){
		exec_query(query, done);
	});
}

function remove_userteam(input, done){
	var table = "User_Teams";

	get_userteam({users: [input.username], teams: [input.team_name]}, function(err, result){
		console.log(result);
		if(result.length <= 0) {return done(null, false);}

		var cond = `uid=${result[0].uid} AND tid=${result[0].tid}`;

		deletequery(table, cond, function(query){
			console.log(query);
			exec_query(query, done);
		});
	});

}

function update_workout(input, done){
	var table = "Workouts";
	var updates = [];

	//check for all possible conditions passed in
	if(input.date) updates.push(`date="${input.date}"`);
	if(input.sleep) updates.push(`sleep="${input.sleep}"`);
	if(input.Illness) updates.push(`health="${input.Illness}"`);
	if(input.Injury) updates.push(`injury="${input.Injury}"`);
	if(input.percent_health) updates.push(`percent_health="${input.percent_health}"`);
	if(input.cycle_start) updates.push(`cycle_start="${input.cycle_start}"`);
	if(input.RPE) updates.push(`RPE="${input.RPE}"`);
	if(input.time) updates.push(`time="${input.time}"`);
	if(input.distance) updates.push(`distance="${input.distance}"`);
	if(input.workout_id) updates.push(`workout_id="${input.workout_id}"`);
	if(input.rpeinfo) updates.push(`RPEinfo="${input.rpeinfo}"`);
	if(input.hungry) updates.push(`score="${input.hungry}"`);

	var updstring = updates.join(', ');
	var condition = `wid="${input.workoutid}"`;

	updatequery(table, updstring, condition, function(query){
		exec_query(query, done);
	});
}

function update_user(input, done){
	var table = "User";
	var updates = [];

		//add the conditions that were passed in
	if(input.username) updates.push(`username="${input.username}"`);
	if(input.password) updates.push(`password="${input.password}"`);
	if(input.email) updates.push(`email="${input.email}"`);
	if(input.first) updates.push(`first="${input.first}"`);
	if(input.last) updates.push(`last="${input.last}"`);
	if(input.role) updates.push(`role_name="${input.role}"`);
	if(input.passflag) updates.push(`passflag="${input.passflag}"`);

	var updstring = updates.join(', ');
	var condition = `username="${input.username}"`;

	updatequery(table, updstring, condition, function(query){
		console.log(query);
		exec_query(query, done);
	});
}

function update_team(input, done){
	var table = "Teams";
	var updates = [];

	//check for all possible conditions
	if(input.team_name) updates.push(`team_name="${input.team_name}"`);
	if(input.sport) updates.push(`sport="${input.sport}"`);
	if(input.gender) updates.push(`gender="${input.gender}"`);

	var updstring = updates.join(', ');
	var condition = `team_name="${input.team_name}"`;

	updatequery(table, updstring, condition, function(query){
		exec_query(query, done);
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


module.exports.get_user = get_user;
module.exports.get_team = get_team;
module.exports.get_workout = get_workout;
module.exports.get_userteam = get_userteam;
module.exports.get_surfaces = get_surfaces;
module.exports.get_health = get_health;
module.exports.get_RPEInfo = get_RPEInfo;
module.exports.get_RPE = get_RPE;
module.exports.get_hunger = get_injury;
module.exports.insert_user = insert_user;
module.exports.insert_team = insert_team;
module.exports.insert_userteam = insert_userteam;
module.exports.insert_workout = insert_workout;
module.exports.remove_user = remove_user;
module.exports.remove_userteam = remove_userteam;
module.exports.remove_team = remove_team;
module.exports.remove_workout = remove_workout;
module.exports.update_user = update_user;
module.exports.update_team = update_team;
module.exports.update_workout = update_workout;