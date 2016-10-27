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

var insertUser = `INSERT INTO OUWXC.user (
			username,
			password)`;


function get_query(query, input, queryString) {
	var string = "";

	console.log(query);

	console.log(input.user);

	if(query == "authenticate")
	{
		string = authQuery;
		string += ` WHERE username="${input.user}" AND 	password="${input.pass}"`;
	}
	else if(query == "insertD")
	{
		string = insertData;
		string +=
	}
	else if(query == "insertU")
	{
		console.log("In condition");
		string = insertUser;
		string += ` VALUES ( "${input.user}", "${input.pass}" )`;
		console.log(string);
	}
	else
	{
		console.log("error, could not find query");
	}

	queryString(string);
}


function exec_query(query, input, result) {

	console.log(input.user);
	var queryString = "";

	get_query(query, input, function(output){
		queryString = output;
		console.log(queryString);
	});

	db.query(queryString, function(err, rows, fields) {
        	if (err) throw err;
		else {
			console.log("Result of query is ");
			console.log(rows);
			result(err, rows, fields);
		}
	});
}


function get_user(input, done){
	
      exec_dbquery("authenticate", input.body, function(err, rows, fields) {
    	
      	if (err) { return done(err); }
      	if (rows.length == 0) {return done(null, false, {message: 'Username or password is incorrect' });
      	return done(null, rows[0].username);
      }

}

module.exports.exec_query = exec_query;
module.exports.get_user = get_user;
