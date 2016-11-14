var db = require("./db");

var authQuery = `SELECT * FROM OUWXC.user`;
var insertData = `INSERT INTO OUWXC.athlete_data (
			athlete, 
			date, 
			sleep, 
			Illness, 
			Injury, 
			percent_health, 
			cycle_start, 
			notes)`;

var insertUser = `INSERT IGNORE INTO OUWXC.user(username, email, password, first, last, create_time)`;
var deleteUser = `DELETE FROM OUWXC.user`;
var getUser = `SELECT * FROM OUWXC.user`;
var selectWorkouts = `SELECT * FROM OUWXC.athlete_data`;


function get_query(query, input, queryString) {
	var string = "";

	if(query == "authenticate")
	{
		string = authQuery;
		string += ` WHERE username="${input.user}" AND 	password="${input.pass}"`;
	}
	else if(query == "insertD")
	{
		string = insertData;
		string += ` VALUES ( "${input.user}", NOW(), "${input.sleephours}", "${input.illness}", "${input.injury}", "${input.myhealth}", "${input.cycle}", "${input.mynotes}")`;
	}
	else if(query == "insertU")
	{
		string = insertUser;
		string += ` VALUES ( "${input.newusername}", "${input.newuseremail}", "${input.newuserpw}", "${input.newuserfirst}", "${input.newuserlast}", NOW() )`;
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
		string = selectWorkouts;
		string += ` WHERE athlete="${input.user}" ORDER BY date DESC LIMIT 10`;
	}
	else
	{
		console.log("error, could not find query");
	}

	queryString(string);
}


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
	
      exec_query("authenticate", input, function(err, rows, fields) {

      	if (err) { return done(err); }
      	if (rows.length <= 0) {return done(null, false, {message: 'Username or password is incorrect'})}; 
      	done(null, {id: rows[0].username, name: rows[0].first + ' ' + rows[0].last, role: rows[0].role});
      });

}

//get a list of matching users
function get_user(input, done){

	exec_query("getU", input, function(err, rows, fields){
		if(err) { return done(err); }
		if(rows.length > 0) {return done(null, {id: rows[0].username, name: rows[0].first + ' ' + rows[0].last, role: rows[0].role});
	}
	})
}

//Remove a user from DB
function remove_user(input, done){
	
	exec_query("remove", input, function(err, rows, fields) {

	  if (err) { return done(err); }
	  if (rows.length == 0) {return done(null, false, {message: 'could not delete user'}); }
	  return done(null, rows);
	});
}

//Add a user to DB
function add_user(input, done){

	exec_query("insertU", input, function(err, rows, fields) {

		console.log(rows);
		if(err){ return done(err);}
		if(rows.length == 0){return done(null, false, {message: 'could not insert user'}); }
		return done(null, rows)
	})
}

//Add a workout to DB
function add_workout(input, done){

	console.log(input);

	exec_query("insertD", input, function(err, rows, fields) {

		if(err){ return done(err);}
		if(rows.length == 0){return done({message: "could not insert data"})}
		done(null, rows);	
	})
}

function get_workouts(input, done){

	exec_query("getW", input, function(err, rows, fields) {

		if(err) { return done(err);}
		if(rows.length == 0){return done({message: "No Data found"})}
		done(null, rows);
	});
}

module.exports.exec_query = exec_query;
module.exports.authenticate = authenticate;
module.exports.get_user = get_user;
module.exports.remove_user = remove_user;
module.exports.add_user = add_user;
module.exports.add_workout = add_workout
module.exports.get_workouts = get_workouts
