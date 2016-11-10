var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');



// Get Homepage
router.get('/', function(req, res){
	res.render('site.pug');
});

// Register
router.get('/register', function(req, res){
	if(req.isAuthenticated()){
		res.render('admin_add_user.pug');
	} else {
		res.redirect('/');
	}
});
    
// Login
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
		res.render('myworkouts.pug');
	} else {
	 	res.redirect('/');
	}
});

// View Athletes
router.get('/admin_athlete_vis', function(req, res){
	if(req.isAuthenticated()){
		res.render('admin_athlete_vis.pug');
	} else {
		res.redirect('/');
	}
});

// Remove User
router.get('/admin_remove_user', function(req, res){
	if(req.isAuthenticated()){
		res.render('admin_remove_user.pug');
	} else {
		res.redirect('/');
	}
});

// About Page
router.get('/about', function(req, res){
	if(req.isAuthenticated()){
		res.render('about.pug');
	} else {
		res.redirect('/');
	}
});

// Remove User
router.get('/admin_add_user', function(req, res){
	if(req.isAuthenticated()){
		res.render('admin_add_user.pug');
	} else {
		res.redirect('/');
	}
});
  

// Register a User
router.post('/register', function(req, res){
	var username = req.body.newusername;
	var password = req.body.newuserpw;
	var password2 = req.body.newuserpw2;
	var email = req.body.newuseremail;
	var firstname = req.body.newuserfirst;
	var lastname = req.body.newuserlast;
	var role = req.body.cycle;

	// Validation
	req.checkBody('newusername', 'Username is required').notEmpty();
	req.checkBody('newuseremail', 'Email is required').notEmpty();
	req.checkBody('newuseremail', 'Email is not valid').isEmail();
	req.checkBody('newuserfirst', 'First name is required').notEmpty();
	req.checkBody('newuserlast', 'Last name is required').notEmpty();
	req.checkBody('newuserpw', 'Password is required').notEmpty();
	req.checkBody('newuserpw2', 'Passwords do not match').equals(req.body.newuserpw);

	var errors = req.validationErrors();

	if(errors){
		res.render('admin_add_user.pug', {
			errors: errors
		});
		console.log(errors);
	} else {
		var queryString3 = `INSERT INTO OUWXC.user(username, email, password, first, last, create_time) VALUES ("${username}", "${email}", "${password}", "${firstname}", "${lastname}", "role", NOW())`;
  		db.query(queryString3, function(err, result) {
    		console.log(err)
    		console.log(result)
			// render add user page again with successful message if success...
		});

		/*res.render('admin_add_user.pug', {
			message: 'User successfully added!'
		});*/
	}

	console.log(req.body);
});

passport.use(new LocalStrategy( function(username, password, done){
	if((typeof username !== 'undefined')){
		var queryString = `SELECT * FROM OUWXC.user WHERE username="${username}"`;
		db.query(queryString, function(err, rows, fields) {
			if (err) throw err;
			if (rows.length > 0){
				if(password === rows[0].password){
					console.log('Correct password!');
					/*res.redirect('/home');*/
					done(null, {id: username, name: rows[0].first + ' ' + rows[0].last, role: rows[0].role});
					console.log('Did we make it here?');
        		} else {
					console.log('Incorrect Password');
					done(null, false, {message: 'Incorrect Password'});
					/*res.redirect('/');*/
				}
			} else {
				console.log('Not a user');
				done(null, false, {message: 'Not a user!'});
				/*res.redirect('/');*/
			}
		});
	}
}));

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	var queryString = `SELECT * FROM OUWXC.user WHERE username="${id}"`;
	db.query(queryString, function(err, rows, fields) {
		if (err) throw err;
		if (rows.length > 0){
			done(null, {id: id, name: rows[0].first + ' ' + rows[0].last, role: rows[0].role});
		}
	})
});


router.post('/',
	passport.authenticate('local', {successRedirect: '/home', failureRedirect: '/login', failureFlash: true}),
	function(req, res){
		// If this function is called, the authentication was succesful.
		// 'req.user' contains the authenticated user.
		res.redirect('/home');
});

router.post("/admin_add_user_form", function(req, res){
  console.log(req.body)
  var newusername = req.body.newusername;
  var newuserpw = req.body.newuserpw;
  var newuserfirst = req.body.newuserfirst;
  var newuserlast = req.body.newuserlast;
  var newuseremail = req.body.newuseremail;

  var queryString3 = `INSERT INTO OUWXC.user(username, email, password, first, last, create_time) VALUES ("${newusername}", "${newuseremail}", "${newuserpw}", "${newuserfirst}", "${newuserlast}", NOW())`;
  db.query(queryString3, function(err, result) {
    console.log(err)
    console.log(result)
  });

  res.redirect('/admin_add_user');
});

//ADMIN REMOVE USER FORM PARSER
router.post("/admin_remove_user_form", function(req, res){
  console.log(req.body.newuserfirstname)
  console.log(req.body.newuserlastname)
  var newuserfirstname = req.body.newuserfirstname;
  var newuserlastname = req.body.newuserlastname;

  var queryString4 = `DELETE FROM OUWXC.user WHERE username="${newuserfirstname}" AND password="${newuserlastname}"`;
  db.query(queryString4, function(err, result) {
    console.log(err)
    console.log(result)
  });

  res.redirect('/admin_add_user');
});

module.exports = router;
