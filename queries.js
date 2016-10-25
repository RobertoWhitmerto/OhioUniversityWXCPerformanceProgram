var db = require("./db");

var authQuery = `SELECT * FROM OUWXC.user WHERE username="test"`;
var insertData = `INSERT INTO OUWXC.athlete_data (
			athlete, 
			date, 
			sleep, 
			Illness, 
			Injury, 
			percent_health, 
			cycle_start, 
			notes) VALUES (
			"test",
			"test",
			"test",
			"test",
			"test",
			"test",
			"test",
			"test")`;

var insertUser = `INSERT INTO OUWXC.user (
			username,
			email,
			password) VALUES (
			"test",
			"test@gmail.com",
			"testing")`;



function get_query(query, queryString) {
	var string = "";

	console.log(query);

	if(query == "authenticate")
	{
		string = authQuery;
	}
	else if(query == "insertD")
	{
		string = insertData;
	}
	else if(query == "insertU")
	{
		console.log("In condition");
		string = insertUser;
	}
	else
	{
		console.log("error, could not find query");
	}

	queryString(string);
};


function exec_query(query, input, result) {

	var queryString = "";

	get_query(query, input, function(output){
		queryString = output;
	});

	db.query(queryString, function(err, rows, fields) {
        	if (err) throw err;
		else {
			console.log("executed query" + queryString);
			result(err, rows, fields);
		}
	});
}

module.exports.exec_query = exec_query;


