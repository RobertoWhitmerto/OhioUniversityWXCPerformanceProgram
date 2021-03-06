var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var queries = require('./newq');
var db = require('./db');
var child = require('child_process');
var filesystem = require('fs');
var ua = require('universal-analytics');
var bcrypt = require('bcryptjs');

router.use(ua.middleware("UA-91318722-1", {cookieName: '_ga'}));

/* Variable needed? */
var athlete = false;

// Get Login Page
router.get('/', function(req, res){
	req.visitor.pageview("/", "http://ouwxcpp.ik3pvw7c5h.us-west-2.elasticbeanstalk.com/", "Login").send();
	res.render('site.pug');
});


// Logout
router.get('/logout', function(req, res){
	req.visitor.pageview("/logout").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
		req.visitor.event("Sign in event", "User Logging out").send();
		req.logout();
		res.redirect('/');
	} else {
		res.redirect('/');
	}
});

// Workout Entry
router.get('/workoutentry', function(req, res){
	req.visitor.pageview("/workoutentry").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
    	var role = req.user.role;    
		res.render('workoutentry.pug',{role});
	} else {
		res.redirect('/');
	}
});

// View my workouts
router.get('/myworkouts', function(req, res){
	req.visitor.pageview("/myworkouts").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
		//access workout info through [] index operator, rows of query returned
		var workouts;
		queries.get_workout({username: req.user.id}, function(err, result){
			workouts = result;
    		var role = req.user.role; 
			/* Debug/Dev Code - remove later
    		console.log("WORKOUTS QUERIED: ");
			console.log(workouts);*/
			res.render('myworkouts.pug', {  data_w: JSON.stringify(workouts), data: workouts, role });
		});
	} else {
	 	res.redirect('/');
	}
});


// View Athletes
router.get('/admin_athlete_vis', function(req, res){
	req.visitor.pageview("/admin_athlete_vis").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
		if(req.user.role == 'Admin' || admin.user.role == 'Coach'){
			queries.get_workout({username: req.user.id}, function(err, result){
				var users = result;
				res.render('admin_athlete_vis.pug', {  data: users, role: req.user.role});
			});
		} else {
			res.redirect(req.get('referer'));
		}
	} else {
		res.redirect('/');
	}
});


// Add User
router.get('/admin_add_user', function(req, res){
	req.visitor.pageview("/admin_add_user").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
		/* Debug/Dev Code - remove later
		console.log(req.user.role);*/
		if(req.user.role == 'Admin'){
      queries.get_team({},function(err, result){
		  var allteams = result;
			res.render('admin_add_user.pug',{ homeboize: JSON.stringify(allteams), role: req.user.role });
    });
		} 
    else {
			res.redirect(req.get('referer'));
		}
	} else {
		res.redirect('/');
	}
});

// Remove User
router.get('/admin_remove_user', function(req, res){
	req.visitor.pageview("/admin_remove_user").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
		if(req.user.role == 'Admin'){
      queries.get_user({},function(err, result){
      var allusr = result;
      //console.log(req.user.first);
			res.render('admin_remove_user.pug', { homegang:JSON.stringify(allusr), role: req.user.role});
    }); 
		}
    else {
			res.redirect(req.get('referer'));
		}
	} else {
		res.redirect('/');
	}
});

// About Page
router.get('/about', function(req, res){
	req.visitor.pageview("/about").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
		var role = req.user.role;
		res.render('about.pug',{role});
	} else {
		res.redirect('/');
	}
});

// Change Pass
router.get('/changepassword', function(req, res){
	req.visitor.pageview("/changepassword").send();
	if(req.isAuthenticated()){
        var role = req.user.role;    
		res.render('changepassword.pug', {role});
	} else {
		res.redirect('/');
	}
});

// Submit a Bug
router.get('/buggy', function(req, res){
	req.visitor.pageview("/buggy").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
		var role = req.user.role;    
		res.render('buggy.pug', {role});
	} else {
		res.redirect('/');
	}
});

// Admin Remove Team 
router.get('/admin_remove_team', function(req, res){
	req.visitor.pageview("/admin_remove_team").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
		var role = req.user.role;
		if(role == 'Admin'){
			queries.get_team({}, function(err, result){
				var allteams = result;
	
				res.render('admin_remove_team.pug', {homeboize: JSON.stringify(allteams), role: req.user.role});
			});
		}
		else{
			res.redirect('/');
		}
	} else {
		res.redirect('/');
	}
});

// Admin Team Creation
router.get('/admin_create_team', function(req, res){
	req.visitor.pageview("/admin_create_team").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
		var role = req.user.role;
		if(role == 'Admin'){
			res.render('admin_create_team.pug', { role: req.user.role });
		}
		else{
			res.redirect('/');
		}
	} else {
		res.redirect('/');
	}
});

// Admin Remove User From Team
router.get('/admin_remove_user_team', function(req, res){
	req.visitor.pageview("/admin_remove_user_team").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
    	var allusr;
    	var role = req.user.role;
    	if(role == 'Admin'){
	    	queries.get_userteam({},function(err, result){
	    		allusrteam = result;
				queries.get_team({},function(err, result){
					allteams = result;
	
					res.render('admin_remove_user_team.pug',{ userteam:JSON.stringify(allusrteam), homeboize: JSON.stringify(allteams)});
				});
	  		});
    	}
    	else{
    		res.redirect('/');
    	}
	} else {
		res.redirect('/');
	}
});

// Link a Team
router.get('/admin_add_team', function(req, res){
	req.visitor.pageview("/admin_add_team").send();
	/* Debug/Dev Code - Remove later
	console.log(req.user);*/
	if(req.isAuthenticated() && req.user.pass != 'T'){
		var allteams;
    	var allusr;
    	var role = req.user.role;
    	if(role == 'Admin'){
	    	queries.get_user({},function(err, result){
	      		allusr = result;
				queries.get_team({},function(err, result){
					allteams = result;
					res.render('admin_add_team.pug', { homegang:JSON.stringify(allusr), homeboize: JSON.stringify(allteams), data: allteams, role });
				});
	  		});
    	}
    	else{
    		res.redirect('/');	
    	}
	} else {
		res.redirect('/');
	}
});

// Coach/Trainer Page
router.get('/coaches', function(req, res){
	req.visitor.pageview("/coaches").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
		if(req.user.role == 'Athlete'){
			res.redirect('/');
		} else {
			/* Debug/Dev Code - Remove later
			console.log(req.user);*/
			queries.get_userteam({teams: req.user.teams}, function(err, result){
					var users = result;
					//res.render('coaches.pug', {  data_w: JSON.stringify(users), data_u: users, team: req.user.team });
					queries.get_workout({teams: req.user.teams}, function(err, result){
						var workouts = result;
						//console.log(workouts);
        				var role = req.user.role;  
						res.render('coaches.pug', {  data_w: JSON.stringify(users), data_u: users, team: JSON.stringify(req.user.teams), data_x: JSON.stringify(workouts), data: workouts, role });
					});
			});
		}
	} else {
		res.redirect('/');
	}
});

// Data Dump Individual
router.get('/datadumpindividual', function(req, res){
	req.visitor.pageview("/datadumpindividual").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
		if(req.user.role == 'Admin'){
			queries.get_workout({username: req.user.id, teams: req.user.team}, function(err, result){
				var users = result;
				/* Debug/Dev Code - Remove later
				console.log(result);*/
        queries.get_user({},function(err, result){
        var allusr = result;
				res.render('admin_data_dump_a.pug',{ homegang:JSON.stringify(allusr) });
			});
    });
		} else {
			res.redirect(req.get('referer'));
		}
	} else {
		res.redirect('/');
	}
});

// Get Team Data
router.get('/datadumpTeam',function(req, res){
	req.visitor.pageview("/datadumpTeam").send();
	if(req.isAuthenticated() && req.user.pass != 'T'){
		if(req.user.role == "Admin"){
      queries.get_team({},function(err, result){
		  var allteams = result;
			res.render('admin_data_dump_b.pug',{ homeboize: JSON.stringify(allteams) });
    });
		} else {
			res.redirect(req.get('referer'));
		}
	} else {
		res.redirect('/');
	}
});


router.get('*', function(req, res) {
    res.redirect('/');
});


router.post('/changepass', function(req, res) {

	bcrypt.genSalt(10, function(err, salt) {
		if(err) {
			console.log(err);
		}
		bcrypt.hash(req.body.pass, salt, function(err, hash) {
			if(err) {
				console.log(err);
			}
			console.log(hash);
			
			queries.update_user({username: req.user.id, password: hash, passflag: 'F'}, function(err, result){
				console.log(result);

				if(err)
				{
					req.visitor.event("FAILURE", "User failed to change Password").send();
				}
				else
				{
					req.visitor.event("SUCCESS", "User changed password").send();
				}
				if(result.changedRows >= 1){
var role = req.user.role; 
					res.render('changepassword.pug', {message: "Change Successful!", role});
				} else {
var role = req.user.role; 
					res.render('changepassword.pug', {message: "Change Failed!", role});
				}

			});
		});
	});
});

router.post('/admin_add_team_form', function(req, res) {

	console.log(req.body);
	queries.insert_userteam(req.body, function(err, result){

		if(err) {
			req.visitor.event("FAILURE", "there was a problem, the user failed to link team").send();
			res.render('admin_add_team.pug', { message: "Failed to link user and team" });
		} else {



		var allteams;
    	var allusr;
    	var role = req.user.role;
    	queries.get_user({},function(err, result){
      		allusr = result;
			queries.get_team({},function(err, result){
				allteams = result;
      var firstn = req.user.first;
				res.render('admin_add_team.pug', { firstn, message: "you have successfully linked the user and team", homegang:JSON.stringify(allusr), homeboize: JSON.stringify(allteams), data: allteams, role });
			});
  		});

		}
	});
})

router.post('/admin_create_team_form', function(req, res) {
	console.log(req.body);

	queries.insert_team(req.body, function(err, result){
		console.log(result);

		if(result.affectedRows > 0){
    var firstn = req.user.first;
 {res.render('admin_create_team.pug', { firstn, message: "you have successfully added a new team!" });}
}
	});
});

router.post('/admin_remove_team', function(req, res) {
	var message;
	console.log(req.body);
	queries.remove_team(req.body, function(err, result){
		if(err || result.affectedRows <= 0) {message = "Could not remove team";}
		else{ message = "Successfully Removed team"; }

		res.render('admin_remove_team.pug', {message: message});
	});
});

router.post('/admin_remove_user_team_form', function(req, res){

	console.log(req.body);
	queries.remove_userteam(req.body, function(err, result){

		if(err)
		{
			req.visitor.event("FAILURE", "there was a problem, the selected user wasn't removed from the team").send();
		}
		if(result.affectedRows > 0){
    	var allusr;
    	var role = req.user.role;
    	queries.get_userteam({},function(err, result){
    		allusrteam = result;
			queries.get_team({},function(err, result){
			allteams = result;
    		var firstn = req.user.first;    
			res.render('admin_remove_user_team.pug',{ firstn, message: "you have successfully removed the selected user from the team", userteam:JSON.stringify(allusrteam), homeboize: JSON.stringify(allteams)});
			});
  		});
}
	});
})


router.post('/getdatadumpind', function(req, res) {
	console.log("meme town");
	
	//access workout info through [] index operator, rows of query returned
	var workouts;

	queries.get_workout({username: req.body.datadumpusr}, function(err, result){
		console.log(result);
		workouts = result;
		dump(false, workouts, res);

		if(err)
		{
			req.visitor.event("FAILURE", "Failed to dump data ind").send();
		}

	});
	/*else
	{
		res.redirect('/getdatadumpind', {message: "You do not have access to this user's data"});
	}
	*/
});


router.post('/getdatadumpteam', function(req, res) {
	var team = [];
	team.push(req.body.datadumpteam);

	console.log(req.body);

	var workouts;

	queries.get_workout({teams: team}, function(err, result){
		workouts = result;
		dump(true, workouts, res);

		if(err)
		{
			req.visitor.event("FAILURE", "Failed to dump data team");
		}
	});

});




/*
// Register a User
router.post('/register', function(req, res){

	// Validation
	req.checkBody('newusername', 'Username is required').notEmpty();
	req.checkBody('newuseremail', 'Email is required').notEmpty();
	req.checkBody('newuseremail', 'Email is not valid').isEmail();
	req.checkBody('newuserfirst', 'First name is required').notEmpty();
	req.checkBody('newuserlast', 'Last name is required').notEmpty();
	req.checkBody('newuserpw', 'Password is required').notEmpty();

	var errors = req.validationErrors();

	console.log(req.body.newusername);

	if(errors){
		req.visitor.event("FAILURE", "Failed to create user").send();

		res.render('admin_add_user.pug', {
			message: 'Error! User not added.',
			errors: errors
		});
		console.log(errors);
	} else {
		queries.insert_user({username: req.body.newusername, email: req.body.newuseremail, first: req.body.newuserfirst, last: req.body.newuserlast, password: req.body.newuserpass}, function(err, result){
			console.log(result);
		});

		res.render('admin_add_user.pug', {
			message: 'User successfully added!'
		});
	}
});*/

passport.use(new LocalStrategy( function(username, password, done){

	queries.get_user({username: username}, function(err, users){
		if(!users) return done(null, false, {message: "Username not found"});
		if(users.length <= 0) return done(null, false, {message: 'Username is invalid'});

		//get the user's teams
		queries.get_userteam({users: [users[0].username]}, function(err, teams){

			var userteams = [];
			for(var i=0; i<teams.length; i++){
				userteams.push(teams[i].team_name);
			}

			bcrypt.compare(password, users[0].password, function(err, res) {
				if(res == true) {
					console.log("we get here?");
					return done(null, {uid: users[0].uid, id: users[0].username, first: users[0].first, last: users[0].last, role: users[0].role_name, teams: userteams, pass: users[0].passflag });
				} else {
					console.log("we fail?");
					return done(null, false, {message: "incorrect password"});
				}
			});
		});
	});
}));

//post for adding a workout on workout entry page
router.post('/workoutentry', function(req, res){
	req.body.user = req.user.id;

	req.body.mynotes = req.body.mynotes.replace(/,/g, '');

	queries.insert_workout(req.body, function(err, result){
		if(result.affectedRows > 0)
		{
			req.visitor.event("Athlete", "Posting workout").send();
			res.render('workoutentry.pug', {message: 'Workout successfully added', role: req.user.role});
		}
		else
		{
			req.visitor.event("Athlete", "Failed to post workout").send();
			res.render('workoutentry.pug', {message: 'Failed to add workout', role: req.user.role});
		}
	});
});

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	queries.get_user({username: id}, function(err, users){

		queries.get_userteam({users: [id]}, function(err, teams){
		var userteams = [];
		for(var i=0; i<teams.length; i++){
			userteams.push(teams[i].team_name);
		}
		done(null,{uid: users[0].uid, id: users[0].username, first: users[0].first, last: users[0].last, role: users[0].role_name, teams: userteams, pass: users[0].passflag});
	});
	});
});


router.post('/', passport.authenticate('local', {failureRedirect: '/'}), function(req, res){

		if(req.user.pass == 'T')
		{
			res.render('changepassword.pug', { message: "You Must Update Your Password!" });
		}

		if(req.user.role == 'Athlete'){
			req.visitor.event("Sign in", "Athlete Logging in").send();
			res.redirect('/workoutentry');
		} else {
			req.visitor.event("Sign in", "Coach Logging in").send();
			res.redirect('/coaches');
		}
		req.visitor.set("Operating System", process.platform);
		req.visitor.set("uid", req.user.id);


		// If this function is called, the authentication was succesful.
		// 'req.user' contains the authenticated user.
		console.log(req.user);

});

router.post("/admin_add_user_form", function(req, res){
  console.log(req.body);
	bcrypt.genSalt(10, function(err, salt) {
		if(err) {
			console.log(err);
		}
		console.log(req.body.newuserpw);
		bcrypt.hash(req.body.newuserpw, salt, function(err, hash) {
  			queries.insert_user({username: req.body.newusername, email: req.body.newuseremail, first: req.body.newuserfirst, last: req.body.newuserlast, password: hash, role: req.body.userrole}, function(err, result){
				console.log(result);
				if(!err && result.affectedRows > 0)
				{
					console.log("successfully added user");
          var firstn = req.user.first;
					res.render('admin_add_user.pug', { firstn, message: "you have successfully added a new user" } );
				}
				else
				{
          var firstn = req.user.first;
					console.log("Could Not add user " + err);
					res.render('admin_add_user.pug', { firstn, message: "there was a problem, unable to add the new user" } );
				}
			});
		});
	});
});

//ADMIN REMOVE USER FORM PARSER
router.post("/admin_remove_user_form", function(req, res){
  console.log(req.body.removeusername);
  console.log(req.body.removelastname);

  	queries.remove_user({username: req.body.removeusername, last: req.body.removelastname}, function(err, result){
		console.log("Affected Rows: " + result.affectedRows);
		if(result.affectedRows > 0)
		{
			console.log("successfully removed user");
			req.visitor.event("Admin", "User was removed").send();
      queries.get_user({},function(err, result){
      var allusr = result;
		  var role = req.user;
      var firstn = req.user.first;    
			res.render('admin_remove_user.pug', { firstn, message: "the selected user was successfully removed", homegang:JSON.stringify(allusr)});
    }); 
		}
	});
});
/*
router.post("/changepass", function(req, res){
	if(req.isAuthenticated() && req.user.pass != 'T'){
		// Add db query here to store new password
	} else {
		res.redirect('/');
	}
});
*/

/*
router.post("/bugreport", function(req, res){
	if(req.isAuthenticated() && req.user.pass != 'T'){
		// Add database query or js email
	} else {
		res.redirect('/');
	}
});
*/

//this route is the post for the modal form for the "forgot password" function
//This does not currently work, will need to figure out how to use a 3rd party service
//to serve the emails, but the post correctly gets the email off of the screen.
router.post("/emailpassword", function(req, res){
  console.log(req.body.forgot_email);
  
  smtpTransport.sendMail({
	   from: "OUWXCPP <ouwxcpp@gmail.com>", // sender address
	   to: req.body.forgot_email, // comma separated list of receivers
	   subject: "Reset Password", // Subject line
	   text: "Here is your reset password: " // plaintext body
	}, function(error, response){
	   if(error){
	       console.log(error);
	   }else{
	       console.log("Mail sent: " + response.message);
	   }
	
	});
    
  res.redirect('/');
});

//this is the post for the remove button on the training log page
router.post("/bugreport", function(req, res){
		if(req.isAuthenticated() && req.user.pass != 'T'){
		console.log("body is");
		console.log(req.body);
		db.query("insert into `bugs` (`platform`, `browser`, `role`, `description`) VALUE (?, ?, ?, ?)" , [req.body.platform, req.body.browser, req.body.role, req.body.mynotes] ,function(err, rows, fields) {
			var firstn = req.user.first
			if(!err){
				var message="Succesfully reported bug! Thank you!";
			}
			else{
				var message="Unsuccesfully reported bug, something is wrong!";
			}
			res.render('buggy.pug', {firstn, message});
		});
	
	} else {
	 	res.redirect('/');
	}
});

//this is the post for the remove button on the training log page
router.post("/myworkouts", function(req, res){
		if(req.isAuthenticated() && req.user.pass != 'T'){
		queries.remove_workout({wid: req.body.wID}, function(err, result){
			console.log(result);
		});

		//access workout info through [] index operator, rows of query returned
		var workouts;

		queries.get_workout({username: req.user.id}, function(err, result){
			workouts = result;
			console.log(req.body);
			res.render('myworkouts.pug', {  data_w: JSON.stringify(workouts), data: workouts, role: req.user.role });
		});
	} else {
	 	res.redirect('/');
	}
});

//this is the post for the edit button on the training log page
router.post("/myworkouts_update", function(req, res){
		if(req.isAuthenticated() && req.user.pass != 'T'){
		queries.update_workout(req.body, function(err, result){
			console.log(result);
		});

		//access workout info through [] index operator, rows of query returned
		var workouts;

		queries.get_workout({username: req.user.id}, function(err, result){
			workouts = result;
			console.log(req.body);
			res.redirect('/myworkouts');
		});
	} else {
	 	res.redirect('/');
	}
});

router.post("/coaches", function(req, res){
		if(req.isAuthenticated() && req.user.pass != 'T'){
		if(req.user.role == 'Athlete'){
			res.redirect(req.get('referer'));
		} else {
			var users;
			var teams = [];

			queries.get_userteam({users: [req.user.id]}, function(err, result){
					for(var i=0; i<result.length; i++){
						console.log(result[i].team_name);
						teams.push(result[i].team_name);
					}
					console.log("Teams = " + teams);
					queries.get_userteam({teams: [teams[0]]}, function(err, result){
						users = result;
						res.render('coaches.pug', {  data_w: JSON.stringify(users), data_u: users, team: JSON.stringify(teams) });
				});
			});
		}
	} else {
		res.redirect('/');
	}
});

//this function takes the workout data and converts it into a .csv file for the user to download
function dump(team,objArray, res)
{
			if(typeof objArray == 'object'){
			var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';
            for (var i = 0; i < array.length; i++) {
            	if(i == 0){
            		str += 'workout_id,user_id,user_id,username,team_name,date,sleep,health,injury,percent_health,cycle_start,RPE,RPEinfo,time,distance,hunger,notes\r\n';
            	}
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ',';
					if(index == "date"){
						var dt = new Date(Date.parse(array[i][index]));
						line += (dt.getMonth()+1).toString() + '/' + dt.getDate().toString() + '/' + (dt.getYear()-100);
						console.log((dt.getMonth()+1).toString() + '/' + dt.getDate().toString() + '/' + (dt.getYear()-100));
					}
					else
                    	line += array[i][index];
                }
                str += line + '\r\n';
            }
            filesystem.writeFile('datadump.csv', str, function (err) {
			  if (err) throw err;
			  console.log('It\'s saved!');
			  res.download('datadump.csv', 'datadump.csv');
			});
		}
		else{
			if(team==true) res.render('admin_data_dump_b.pug');
			else res.render('admin_data_dump_a.pug');
		}
}




module.exports = router;
