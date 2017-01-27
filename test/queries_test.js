var expect = require("chai").expect;
var queries = require('../routes/queries.js');


describe("Get Query", function() {
	//authentication
	it("builds a MySQL authentication query", function() {

	var testval1 = "authenticate";
	var testval2 = {user: "user", pass: "password"};
	var result;

	queries.get_query(testval1, testval2, function(output){
		result = output;
	});

	expect(result).to.equal(`SELECT * FROM OUWXC.user WHERE username="user" AND password="password"`);

	})


	//insert workout
	it("builds a MySQL query for inserting data", function() {

	var testval1 = "insertD";
	var testval2 = {user: "user", currentyear: 2017, month: "January", day: 1, sleephours: 3, illness: 3, injury: 3, percent_health: 30, cycle: 0, rpeval: 13, rpeinfo: 4, time: 30, distance: 4, hungry: 3, mynotes: ""};
	var result;

	queries.get_query(testval1, testval2, function(output){
		result = output;
	});

	expect(result).to.equal(`INSERT INTO OUWXC.athlete_data (
			athlete, 
			date, 
			sleep, 
			Illness, 
			Injury, 
			percent_health, 
			cycle_start, 
			RPE,
			rpeinfo,
			time,
			distance,
			hungry,
			notes) VALUES ( "user", "2017-01-1 00:00:01", "3", "3", "3", "30", "0", "13", "4", "30", "4", "3", "")`);

	})

	//insert user
	it("builds a MySQL insert user query", function() {

	var testval1 = "insertU";
	var testval2 = {newusername: "user", newuseremail: "test@test.com", newuserpw: "password", newuserfirst: "first", newuserlast: "last", newuserteam: "team", userrole: "role"};
	var result;

	queries.get_query(testval1, testval2, function(output){
		result = output;
	});

	expect(result).to.equal(`INSERT IGNORE INTO OUWXC.user(username, email, password, first, last, create_time, team, role) VALUES ( "user", "test@test.com", "password", "first", "last", NOW(), "team", "role" )`);

	})

	//remove a user
	it("builds a MySQL remove user query", function() {

	var testval1 = "remove";
	var testval2 = {removeusername: "user", removelastname: "last"};
	var result;

	queries.get_query(testval1, testval2, function(output){
		result = output;
	});

	expect(result).to.equal(`DELETE FROM OUWXC.user WHERE username="user" AND last="last"`);

	})


	//get user
	it("builds a MySQL get user query", function() {

	var testval1 = "getU";
	var testval2 = {user: "user"};
	var result;

	queries.get_query(testval1, testval2, function(output){
		result = output;
	});

	expect(result).to.equal(`SELECT * FROM OUWXC.user WHERE username="user"`);

	})


	//get workouts without team
	it("builds a MySQL get workouts query", function() {

	var testval1 = "getW";
	var testval2 = {user: "user"};
	var result;

	queries.get_query(testval1, testval2, function(output){
		result = output;
	});

	expect(result).to.equal(`SELECT * FROM OUWXC.athlete_data WHERE athlete="user" ORDER BY date DESC`);

	})


	//get workouts with team
	it("builds a MySQL get workouts query", function() {

	var testval1 = "getW";
	var testval2 = {team: "team"};
	var result;

	queries.get_query(testval1, testval2, function(output){
		result = output;
	});

	expect(result).to.equal(`SELECT * FROM OUWXC.athlete_data JOIN OUWXC.user on user.username=athlete_data.athlete AND user.team="team" ORDER BY athlete_data.date DESC`);

	})


	//add team
	it("builds a MySQL get workouts query", function() {

	var testval1 = "addteam";
	var testval2 = {team: "team", username: "user"};
	var result;

	queries.get_query(testval1, testval2, function(output){
		result = output;
	});

	expect(result).to.equal(`UPDATE OUWXC.user SET team = "team" WHERE username="user"`);

	})


	//remove a workout
	it("builds a MySQL remove workout query", function() {

	var testval1 = "remWork";
	var testval2 = {wID: 1};
	var result;

	queries.get_query(testval1, testval2, function(output){
		result = output;
	});

	expect(result).to.equal(`DELETE FROM OUWXC.athlete_data WHERE workout_id="1"`);

	})


	//list all users on a team
	it("builds a MySQL select users query", function() {

	var testval1 = "listUsers";
	var testval2 = {team: "team"};
	var result;

	queries.get_query(testval1, testval2, function(output){
		result = output;
	});

	expect(result).to.equal(`SELECT * FROM user WHERE team="team"`);

	})

	//change password
	it("builds a MySQL change password query", function() {

	var testval1 = "changepass";
	var testval2 = {pass: "password", user: "user"};
	var result;

	queries.get_query(testval1, testval2, function(output){
		result = output;
	});

	expect(result).to.equal(`UPDATE user SET password="password" WHERE username="user"`);
	})

	//error result
	it("failed attempt to build query", function() {

	var testval1 = "fail";
	var testval2 = {pass: "password", user: "user"};
	var result;

	queries.get_query(testval1, testval2, function(output){
		result = output;
	});

	expect(result).to.equal(``);
	})
});