var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var queries = require('./queries');
var db = require('./db');
var child = require('child_process');
var filesystem = require('fs');
var ua = require('universal-analytics');


router.use(ua.middleware("UA-91318722-1", {cookieName: '_ga'}));


var athlete = false;


// Get Login Page
router.get('/', function(req, res){
	console.log(process.platform);
	req.visitor.pageview("/", "http://ouwxcpp.ik3pvw7c5h.us-west-2.elasticbeanstalk.com/", "Login").send();
	res.render('site.pug');
});
/*
router.get('/home', function(req, res){
	if(req.isAuthenticated()){
		if(req.user.role == 'Athlete'){
			res.redirect('/workoutentry');
		} else {
			res.redirect('/coaches');
		}
	} else {
		res.redirect('/');
	}
});
*/

// Logout
router.get('/logout', function(req, res){
	req.visitor.pageview("/logout").send();
	if(req.isAuthenticated()){
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
	if(req.isAuthenticated()){
		res.render('workoutentry.pug');
	} else {
		res.redirect('/');
	}
});

// View my workouts
router.get('/myworkouts', function(req, res){
	req.visitor.pageview("/myworkouts").send();
	if(req.isAuthenticated()){
		//access workout info through [] index operator, rows of query returned
		var workouts;

		queries.get_workouts({user: req.user.id}, function(err, result){
			workouts = result;
			console.log(workouts);
			res.render('myworkouts.pug', {  data_w: JSON.stringify(workouts), data: workouts });
		});
	} else {
	 	res.redirect('/');
	}
});

// View Athletes
router.get('/admin_athlete_vis', function(req, res){
	req.visitor.pageview("/admin_athlete_vis").send();

	if(req.isAuthenticated()){
		if(req.user.role == 'admin' || admin.user.role == 'coach'){
			queries.get_workouts({user: req.user.id}, function(err, result){
			var users = result;
			console.log(users);
			res.render('admin_athlete_vis.pug', {  data: users });
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
	if(req.isAuthenticated()){
		if(req.user.role == 'admin'){
			res.render('admin_add_user.pug');
		} else {
			res.redirect(req.get('referer'));
		}
	} else {
		res.redirect('/');
	}
});

// Remove User
router.get('/admin_remove_user', function(req, res){
	req.visitor.pageview("/admin_remove_user").send();
	if(req.isAuthenticated()){
		if(req.user.role == 'admin'){
			res.render('admin_remove_user.pug');
		} else {
			res.redirect(req.get('referer'));
		}
	} else {
		res.redirect('/');
	}
});

// About Page
router.get('/about',
        function(req, res){
        	req.visitor.pageview("/about").send();
			if(req.isAuthenticated()){
				res.render('about.pug');
			} else {
				res.redirect('/');
			}
});

// Change Pass
router.get('/changepassword',
        function(req, res){
        	req.visitor.pageview("/changepassword").send();
			if(req.isAuthenticated()){
				res.render('changepassword.pug');
			} else {
				res.redirect('/');
			}
});

// Submit a Bug
router.get('/buggy',
        function(req, res){
        	req.visitor.pageview("/buggy").send();
			if(req.isAuthenticated()){
				res.render('buggy.pug');
			} else {
				res.redirect('/');
			}
});

// Coach/Trainer Page
router.get('/coaches', function(req, res){
	req.visitor.pageview("/coaches").send();
	
	if(req.isAuthenticated()){
		console.log("memes2\nmemes2");
		if(req.user.role == 'athlete'){
			res.redirect(req.get('referer'));
		} else {
			console.log("this is the req.user " + req.user.team);
			console.log(req.user);
			queries.list_users({user: req.user.id, team: req.user.team}, function(err, result){
					var users = result;
					console.log(result);
					res.render('coaches.pug', {  data_w: JSON.stringify(users), data_u: users, team: req.user.team });
			});

			
		}
	} else {
		res.redirect('/');
	}
});

// Data Dump Individual
router.get('/datadumpindividual', function(req, res){
			req.visitor.pageview("/datadumpindividual").send();
			if(req.isAuthenticated()){
				if(req.user.role == 'admin'){
					res.render('admin_data_dump_a.pug');
				} else {
					res.redirect(req.get('referer'));
				}
			} else {
				res.redirect('/');
			}
});

router.get('/datadumpTeam',function(req, res){
	req.visitor.pageview("/datadumpTeam").send();
	if(req.isAuthenticated()){
		if(req.user.role == "admin"){
			res.render('admin_data_dump_b.pug');
		} else {
			res.redirect(req.get('referer'));
		}
	} else {
		res.redirect('/');
	}
});

router.post('/changepass', function(req, res) {

	console.log(req.body);

	queries.change_password({user: req.user.id, pass: req.body.pass}, function(err, result){
		console.log(result);

		if(err)
		{
			req.visitor.event("FAILURE", "User failed to change Password").send();
		}
		else
		{
			req.visitor.event("SUCCESS", "User changed password").send();
		}

	});

});


router.post('/getdatadumpind', function(req, res) {
	console.log(req.body);
	
	//access workout info through [] index operator, rows of query returned
	var workouts;


	queries.get_workouts({user: req.body.datadumpusr}, function(err, result){
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
	var team = req.body;
	console.log(req.body);

	var workouts;

	queries.get_workouts({team: req.body.datadumpteam}, function(err, result){
		workouts = result;
		dump(true, workouts, res);

		if(err)
		{
			req.visitor.event("FAILURE", "Failed to dump data team");
		}
	});

});





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

	if(errors){
		req.visitor.event("FAILURE", "Failed to create user").send();

		res.render('admin_add_user.pug', {
			message: 'Error! User not added.',
			errors: errors
		});
		console.log(errors);
	} else {
		queries.add_user(req.body, function(err, result){
			console.log(result);
		})

		res.render('admin_add_user.pug', {
			message: 'User successfully added!'
		});
	}

	console.log(req.body);
});

passport.use(new LocalStrategy( function(username, password, done){
	queries.authenticate({user: username, pass: password}, function(err, result){
		console.log(result);
		done(null,result);

		if(result.role == "Athlete")
		{
			athlete = true;
		}
	})
}));

router.post('/workoutentry', function(req, res){
	req.body.user = req.user.id;

	console.log(req.body);
	queries.add_workout(req.body, function(err, result){
		console.log("Affected Rows: " + result.affectedRows);
		if(result.affectedRows > 0)
		{
			req.visitor.event("Athlete", "Posting workout").send();

			res.render('workoutentry.pug', {
				message: 'Workout successfully added'
			});

		}
	})
});

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	queries.get_user({user: id}, function(err, result){
		done(null, result);
	})
});


router.post('/', passport.authenticate('local', {failureRedirect: '/'}), function(req, res){


		if(req.user.role == 'Athlete'){
			req.visitor.event("Sign in", "Athlete Logging in").send();
			res.redirect('/workoutentry');
		} else {
			req.visitor.event("Sign in", "Coach Logging in").send();
			res.redirect('/coaches');
		}
		req.visitor.set("Operating System", process.platform);

		// If this function is called, the authentication was succesful.
		// 'req.user' contains the authenticated user.
		console.log(req.user);

});

router.post("/admin_add_user_form", function(req, res){
  console.log(req.body)

  queries.add_user(req.body, function(err, result){
		console.log(result);
		if(result.affectedRows > 0)
		{
			console.log("successfully added user");
		}
	})

  res.redirect('/admin_add_user');
});

//ADMIN REMOVE USER FORM PARSER
router.post("/admin_remove_user_form", function(req, res){
  console.log(req.body.removeusername)
  console.log(req.body.removelastname)

  	queries.remove_user(req.body, function(err, result){
		console.log("Affected Rows: " + result.affectedRows);
		if(result.affectedRows > 0)
		{
			console.log("successfully removed user");
			req.visitor.event("Admin", "User was removed").send();
		}
	})

  res.redirect('/admin_add_user');
});
/*
router.post("/changepass", function(req, res){
	if(req.isAuthenticated()){
		// Add db query here to store new password
	} else {
		res.redirect('/');
	}
});
*/

/*
router.post("/bugreport", function(req, res){
	if(req.isAuthenticated()){
		// Add database query or js email
	} else {
		res.redirect('/');
	}
});
*/

router.post("/myworkouts", function(req, res){
		if(req.isAuthenticated()){

		queries.remove_workout(req.body, function(err, result){
			console.log(result);
		})

		//access workout info through [] index operator, rows of query returned
		var workouts;

		queries.get_workouts({user: req.user.id}, function(err, result){
			workouts = result;
			console.log(req.body);
			res.render('myworkouts.pug', {  data_w: JSON.stringify(workouts), data: workouts });
		});
	} else {
	 	res.redirect('/');
	}
});

router.post("/coaches", function(req, res){
		if(req.isAuthenticated()){
		console.log("memes\nmemes");
		if(req.user.role == 'athlete'){
			res.redirect(req.get('referer'));
		} else {
			console.log("this is the req.user " + req.user.team);
			console.log(req.user);
			var users;
			queries.list_users({user: req.user.id, team: req.user.team}, function(err, result){
					users = result;
					console.log(result);
					res.render('coaches.pug', {  data_w: JSON.stringify(users), data_u: users, team: JSON.stringify(req.user.team) });
			});
		}
	} else {
		res.redirect('/');
	}
});

function dump(team,objArray, res)
{
			if(typeof objArray == 'object'){
			var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';
            for (var i = 0; i < array.length; i++) {
            	if(i == 0){
            		str += 'athlete,date,sleep,health_status,Illness,Injury,percent_health,cycle_start,RPE,time,distance,notes,workoutID\r\n';
            	}
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','
 
                    line += array[i][index];
                }
                str += line + '\r\n';
            }
            console.log(str);
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
