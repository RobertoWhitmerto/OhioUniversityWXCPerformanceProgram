var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var queries = require('./queries');
var db = require('./db');
var child = require('child_process');
var filesystem = require('fs');


// Get Login Page
router.get('/', function(req, res){
	res.render('site.pug');
});

// Home Page
router.get('/home', function(req, res){
	if(req.isAuthenticated()){
		res.render('signin.pug');
	} else {
		res.redirect('/');
	}
});

// Logout
router.get('/logout', function(req, res){
	if(req.isAuthenticated()){
		req.logout();
		res.redirect('/');
	} else {
		res.redirect('/');
	}
});

// Workout Entry
router.get('/workoutentry', function(req, res){
	if(req.isAuthenticated()){
		res.render('workoutentry.pug');
	} else {
		res.redirect('/');
	}
});

// View my workouts
router.get('/myworkouts', function(req, res){
	if(req.isAuthenticated()){

		//access workout info through [] index operator, rows of query returned
		var workouts;

		queries.get_workouts({user: req.user.id}, function(err, result){
			workouts = result;
			//console.log(workouts);
			res.render('myworkouts.pug', {  data_w: JSON.stringify(workouts), data: workouts });
		});
	} else {
	 	res.redirect('/');
	}
});

// View Athletes
router.get('/admin_athlete_vis', function(req, res){

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
			if(req.isAuthenticated()){
				res.render('about.pug');
			} else {
				res.redirect('/');
			}
});

// Data Dump Individual
router.get('/datadumpindividual', function(req, res){
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

router.post('/getdatadumpind', function(req, res) {
	console.log(req.body);
	
	//access workout info through [] index operator, rows of query returned
	var workouts;

	if(req.user.role != "admin" && req.user.id != req.body.datadumpusr)
	{
		queries.get_workouts({user: req.body.datadumpusr}, function(err, result){
		console.log(result);
			workouts = result;
			dump(workouts, res);
		});
	}
	else
	{
		res.redirect('/getdatadumpind', {message: "You do not have access to this user's data"});
	}
});


router.post('/getdatadumpteam', function(req, res) {
	var team = req.body;
	console.log(req.body);

	var workouts;

	queries.get_workouts({team: req.body.datadumpteam}, function(err, result){
		workouts = result;
		dump(workouts, res);
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
		done(null,result);
	})
}));

router.post('/workoutentry', function(req, res){
	req.body.user = req.user.id;

	console.log(req.body);
	queries.add_workout(req.body, function(err, result){
		console.log("Affected Rows: " + result.affectedRows);
		if(result.affectedRows > 0)
		{
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

router.post('/', passport.authenticate('local'), function(req, res){
		console.log(req.user);
		if(req.user.role == 'Athlete'){
			res.redirect('/workoutentry');
		} else {
			res.redirect('/home');
		}
		// If this function is called, the authentication was succesful.
		// 'req.user' contains the authenticated user.
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
		}
	})

  res.redirect('/admin_add_user');
});


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

function dump(objArray, res)
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
			res.render('admin_data_dump_a.pug');
		}
}

module.exports = router;
